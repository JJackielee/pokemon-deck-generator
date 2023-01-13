
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

https://api.tcgdex.net/v2/en/cards/swsh3-136
// https://api.pokemontcg.io/v2/cards/

function getImageandPhoto(cardId,cardTitle){
    fetch('https://api.tcgdex.net/v2/en/cards/' + cardId , {
        method: 'GET'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data.data.images.small);
            // console.log(data.data.cardmarket.prices.averageSellPrice);


            var deckContainer = $("#deck-list");
            var deckCell = $('<div>');
            deckCell.attr("class","cell");
            var deckCard = $('<div>');
            deckCard.attr("class","card");
            var cardImg = $('<img>');
            cardImg.attr("src",data.image + "/high.png");

            var cardSection = $('<div>');
            cardSection.attr("class","card-section");

            var cardName = $('<p>')
            cardName.text(cardTitle);

            var cardPrice = $('<h3>');
           // cardPrice.text(data.data.cardmarket.prices.averageSellPrice);
            cardPrice.text("10");

            var deleteButton = $('<button>');
            deleteButton.attr("class","hollow button");
            deleteButton.text("Delete This");

            cardSection.append(cardName);
            cardSection.append(cardPrice);
            cardSection.append(deleteButton);

            deckCard.append(cardImg);
            deckCard.append(cardSection);
            deckCell.append(deckCard);
            deckContainer.append(deckCell);
  

        });

}

function saveDeck(name){
    console.log(JSON.stringify(deckList));
    localStorage.setItem(name,JSON.stringify(deckList));
    var testThis = JSON.parse(localStorage.getItem(name));
    console.log(testThis);
    for(var i = 0; i<deckList.length;i++){
        getImageandPhoto(deckList[i].id,deckList[i].name);
    }

}

// function loadCards(){
//     var deckContainer = $("#deck-list");
//     var deckCell = $('<div>');
//     deckCell.attr("class","cell");
//     var deckCard = $('<div>');
//     deckCard.attr("class","card");
//     var cardImg = $('<img>');
//     cardImg.attr("src",data.data.images.small);

//     var cardSection = $('<div>');
//     cardSection.attr("class","card-section");

//     var cardName = $('<h2>')
//     cardName.text(cardTitle);

//     var cardPrice = $('<h3>');
//     cardPrice.text(pricehere)

//     var deleteButton = $('<button>');
//     deleteButton.attr("class","hollow button");

//     cardSection.append(cardName);
//     cardSection.append(cardPrice);
//     cardSection.append(deleteButton);

//     deckCard.append(cardImg);
//     deckCard.append(cardSection);
//     deckCell.append(deckCard);
//     deckContainer.append(deckCell);
  
    
// }










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