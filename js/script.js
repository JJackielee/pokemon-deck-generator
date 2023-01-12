


// pull 20-30 pokemons
// pull 20 energy cards
// pull 20 trainer







var deckList= [];

pullPokemon("Fire",20);


console.log(deckList);


function pullPokemon(type,num){
    fetch('https://api.tcgdex.net/v2/en/cards/?stage=basic&types='+ type, {
    method: 'GET'
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var totalCards = data.length;
        for(var i = 0; i < num; i++){
            var randomNum = Math.floor(Math.random() * data.length)
            var randomCard = {
                name: data[randomNum].name,
                id: data[randomNum].id
            } 
            
            deckList.push(randomCard);
        }
        pullEnergy("Fire",20);
    });
}

function pullEnergy(type,num){
    fetch('https://api.tcgdex.net/v2/en/cards/?category=energy', {
        method: 'GET'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var totalCards = data.length;
            for(var i = 0; i < num; i++){
                var check = true;
                while(check){
                    var randomNum = Math.floor(Math.random() * data.length)
                    
                    if(data[randomNum].name.includes(type)){
                        var randomCard = {
                            name: data[randomNum].name,
                            id: data[randomNum].id
                        } 
                        deckList.push(randomCard);
                        check = false;
                    }
                }
            }
            pullTrainers(20);
        });
    
}

function pullTrainers(num){
    fetch('https://api.tcgdex.net/v2/en/cards/?category=trainer', {
        method: 'GET'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var totalCards = data.length;
            for(var i = 0; i < num; i++){
                var randomNum = Math.floor(Math.random() * data.length)
                var randomCard = {
                name: data[randomNum].name,
                id: data[randomNum].id
                }    
                deckList.push(randomCard);
            }
            saveDeck("jackies");
        });
}

function getImageandPhoto(cardId){
    fetch('https://api.pokemontcg.io/v2/cards/' + cardId , {
        method: 'GET'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.data.images.small);
            console.log(data.data.cardmarket.prices.averageSellPrice);
        });
<<<<<<< HEAD

}

function saveDeck(name){
    console.log(JSON.stringify(deckList));
    localStorage.setItem(name,JSON.stringify(deckList));
    var testThis = JSON.parse(localStorage.getItem(name));
    console.log(testThis);
    getImageandPhoto(deckList[0].id);

}

  
=======
>>>>>>> 1d4d6f452c43fb0d0b6d7a85af490135360cd2ec

}

function saveDeck(name){
    console.log(JSON.stringify(deckList));
    localStorage.setItem(name,JSON.stringify(deckList));
    var testThis = JSON.parse(localStorage.getItem(name));
    console.log(testThis);
    getImageandPhoto(deckList[0].id);

}












// var allCards = [];
// function getAllCards(){
    
//     for(var i = 1; i<63; i++){
//         fetch('https://api.pokemontcg.io/v2/cards/?page=' + i, {
//             method: 'GET'
          
//           })
//             .then(function (response) {
//               return response.json();
//             })
//             .then(function (data) {
//                 console.log(data.data[0]);
//                 console.log("does this work?")
        
          
//             });
//     }
// console.log(allCards);




// }

// getAllCards();