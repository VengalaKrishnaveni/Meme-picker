import { catsData } from "./data.js"

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

emotionList.addEventListener('click', function(e){
    console.log(e.target.id)
})
