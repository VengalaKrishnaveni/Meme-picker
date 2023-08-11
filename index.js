import { catsData } from "./data.js"

//get the list of emotions of available images
function getEmotionsArray(cats){
    const emotionsArray = []
    for(let cat of cats){
        for(let tag of cat.emotionTags){
            if(!emotionsArray.includes(tag)){
                emotionsArray.push(tag)
            }
        }
    }
    return emotionsArray
}

const emotionList = document.getElementById('emotion-list')


//render the emotions list to the html
function renderEmotionsList(cats){
    const emotions = getEmotionsArray(cats)
    for(let emotion of emotions){
        emotionList.innerHTML += `
        <div class="radio">
        <label for=${emotion}>${emotion}</label>
        <input type="radio" id="${emotion}" value="${emotion}" name="choice">    
        </div>`
    }
}
renderEmotionsList(catsData)

emotionList.addEventListener('change', highlightSelectedOption)

function unhighlightSelectedOption(e){
    const radios = document.getElementsByClassName('radio')
    for(let radio of radios){
        radio.classList.remove('highlight')
    }
}

function highlightSelectedOption(e){
    unhighlightSelectedOption()
    const radioSelected = document.getElementById(e.target.id).parentElement
    radioSelected.classList.add('highlight')
}




//listen for click event of get image button
const getImageBtn = document.getElementById('get-image-btn')

getImageBtn.addEventListener('click',renderCatImage)

function getMatchingCatsArray(){
    if(document.querySelector('input[type="radio"]:checked').value){
        const radioSelected = document.querySelector('input[type="radio"]:checked').value
        const matchingEmotions = catsData.filter(function(cat){
            const isGif = document.getElementById('gifs-only-option').checked
            if(isGif){
                return cat.emotionTags.includes(radioSelected) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(radioSelected)
            }
        })
        return matchingEmotions
    }   
}

function getSingleCatObject(){
    const catsArray =  getMatchingCatsArray()
    if(catsArray.length === 1){
        console.log(catsArray)
        return catsArray[0]
    }
    else{
        const index = randomSelect(catsArray.length)
        return catsArray[index]
    }
}

const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')

function renderCatImage(){
    const catObject = getSingleCatObject()
    memeModal.style.display = 'flex'
    memeModalInner.innerHTML = `<img 
    class="cat-img" 
    src="./images/${catObject.image}"
    alt="${catObject.alt}"
    >
    `
}


//random image selector
function randomSelect(catsArrayLength){
    return Math.floor(Math.random()*catsArrayLength)
}

//modal close button
const modalCloseBtn = document.getElementById('meme-modal-close-btn')
modalCloseBtn.addEventListener('click',function(){
    memeModal.style.display = 'none'
})
