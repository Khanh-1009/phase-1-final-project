//Starting with DOMContentLoaded Event
//Creating variable 'form' and Submit Event
//Setting preventDefault, message, and reset it after email is submitted
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form')
    form.addEventListener('submit', e => {
        console.log(e.target.submit_email.value) // check what users have submitted
        alert('Thanks for your subscription! You will soon receive an invitation email from us.')
        e.preventDefault()
        form.reset()
    })

    //Adding 5 elements from db.json to html (4 attributes)
    const attractionList = document.querySelector('#attraction-list')
    function addAttractionCard(place){
        let card = document.createElement('ul')
        card.className = "card"
        card.innerHTML = `
            <div class="image-container">
                <img src="${place.imageURL}">
                <div>
                    <h2>${place.title}</h2>
                    <p>${place.description}</p>
                    <p>
                        <span class="favorite">${place.favorites}</span> Favorites ♥
                    </p>
                </div>
                
                <div class ="button">
                <button class='like'>Add To Favorites <span class="heartEmpty">♡</span></button>
                <button id='request'>More Information</button>
                </div>
            </div>
        `

        attractionList.appendChild(card)
        //After created 2 buttons for each card, I created heart that can change the colors using click Event
        const button = card.querySelector('.like')
        button.addEventListener('click', userFavorite)
        //The number of users will increase and decrease when they hit the heart icon
        const numberOfFavorites = card.querySelector('.favorite')
        
        //function that includes heart icon and the number of users who add or remove it out of their favorites
        function userFavorite(e){
            let heart = e.target;
            //debugger
            if (heart.textContent === '♡'){
                //console.log(e.target)
                heart.textContent = '♥';
                heart.classList.add('red-heart');
                place.favorites++
                numberOfFavorites.textContent = place.favorites
            } 
            else if (heart.textContent === '♥'){
                heart.textContent = '♡';
                heart.classList.remove('red-heart');
                place.favorites--
                numberOfFavorites.textContent = place.favorites
            }
        }
        //Another click event if user want to get more information => send them alert
        card.querySelector('#request').addEventListener('click', () =>{
            alert('Thanks for your interest! Please submit your email at the bottom of our website to receive more information about the topic that you love!')
        })

    }
    



    //Make a GET request to db.json
    function getAttractions(){
        return fetch("http://localhost:3000/Attractions")
        .then(res => res.json())
        .then(data => data.forEach(place => addAttractionCard(place)))
        
    }
    
    getAttractions()

    
})