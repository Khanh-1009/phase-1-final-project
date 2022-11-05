document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form')
    form.addEventListener('submit', e => {
        alert('Thanks for your subscription! You will soon receive an invitation email from us.')
        e.preventDefault()
        form.reset()
    })

    const attractionList = document.querySelector('#attraction-list')
    function attractions(place){
        let card = document.createElement('ul')
        card.className = "card"
        card.innerHTML = `
            <div class="image-container">
                <img src="${place.imageURL}">
                <div class="expandMoreContent" id="showMoreContent1">
                    <h2>${place.title}</h2>
                    <p>${place.description}</p>
                </div>
            </div>
        `
        attractionList.appendChild(card)
    
    }
    
    function getAttractions(){
        return fetch("http://localhost:3000/Attractions")
        .then(res => res.json())
        .then(data => data.forEach(place => attractions(place)))
        
    }
    
    getAttractions()
    
    

})