


// pull 20-30 pokemons
// pull 20 energy cards
// pull 8 supports cards
// pull 12 trainer cards







var deckList= [];
pullPokemon("Water",20);  
pullEnergy("Water",20);
pullTrainers(20);

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
            var randomCard = data[Math.floor(Math.random() * data.length)].name
            deckList.push(randomCard);
        }

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
                    var randomCard = data[Math.floor(Math.random() * data.length)].name
                    if(randomCard.includes(type)){
                        deckList.push(randomCard);
                        check = false;
                    }
                }
            }
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
                var randomCard = data[Math.floor(Math.random() * data.length)].name
                deckList.push(randomCard);
            }
        });
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