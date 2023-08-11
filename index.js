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

getImageBtn.addEventListener('click',getMatchingCatsArray)

function getMatchingCatsArray(){
    if(document.querySelector('input[type="radio"]:checked').value){
        const radioSelected = document.querySelector('input[type="radio"]:checked').value
        console.log(radioSelected)
        const emotions = catsData.emotionTags
        const matchingEmotions = emotions.filter(function(emotion){
            if(emotion === radioSelected){
                return true
            }
            else{
                return false
            }
        })
        console.log(matchingEmotions)
    }
    //gif's only option
    // if(document.getElementById('gifs-only-option').checked){
    //     console.log('yes')
    // }
    // else{
    //     console.log('no')
    // }
    
    unhighlightSelectedOption()
}
