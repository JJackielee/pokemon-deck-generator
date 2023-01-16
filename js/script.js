
var deckList= [];
var pokeType = "";
getType();

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
            while(data[randomNum].image == undefined){
                randomNum = Math.floor(Math.random() * data.length);
            }
            var randomCard = {
                name: data[randomNum].name,
                id: data[randomNum].id,
                image: data[randomNum].image + "/high.png"
            } 
            
            deckList.push(randomCard);
        }
        pullEnergy(type,20);
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
                    while(data[randomNum].image == undefined){
                        randomNum = Math.floor(Math.random() * data.length);
                    }
                    if(data[randomNum].name.includes(type)){
                        var randomCard = {
                            name: data[randomNum].name,
                            id: data[randomNum].id,
                            image: data[randomNum].image + "/high.png"
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
                while(data[randomNum].image == undefined){
                    randomNum = Math.floor(Math.random() * data.length);
                }
                var randomCard = {
                name: data[randomNum].name,
                id: data[randomNum].id,
                image: data[randomNum].image + "/high.png"
                }
                console.log(data[randomNum].image == undefined);
                deckList.push(randomCard);
            }
            loadCards();
            localStorage.setItem("deck","");
            console.log(deckList);
        });
    
}



//-------------------------------------------------------------------------------

function loadCards(){

    for(var i = 0; i< deckList.length; i++ ){
        var deckContainer = $("#deck-list");
        var deckCell = $('<div>');
        deckCell.attr("class","cell");
        var deckCard = $('<div>');
        deckCard.attr("class","card");
        var cardImg = $('<img>');
        cardImg.attr("src",deckList[i].image);

        var cardSection = $('<div>');
        cardSection.attr("class","card-section");

        var cardName = $('<p>')
        cardName.text(deckList[i].name);

        var cardPrice = $('<h3>');
        // cardPrice.text(data.data.cardmarket.prices.averageSellPrice);
        // cardPrice.text("10");

        var deleteButton = $('<button>');
        deleteButton.attr("class","hollow button");
        deleteButton.text("Delete This");
        deleteButton.on("click", function(){
            console.log($(this).parent().parent().parent().index())
            deckList.splice($(this).parent().parent().parent().index(), 1);
            $(this).parent().parent().parent().remove();
            console.log(deckList);

        });


        var infoButton = $('<button>');
        infoButton.attr("class","hollow button");
        infoButton.text("More Info");
        infoButton.attr("data-open","exampleModal1");
        infoButton.attr("data-id",deckList[i].id);
        infoButton.on("click", function(){
            console.log($(this).parent().parent().children().attr("src"));
            getInfo($(this).attr("data-id"));

        });

        cardSection.append(cardName);
        // cardSection.append(cardPrice);
        cardSection.append(deleteButton);
        cardSection.append(infoButton);

        deckCard.append(cardImg);
        deckCard.append(cardSection);
        deckCell.append(deckCard);
        deckContainer.append(deckCell);
    }
  
    
}

function getType(){
    pokeType = localStorage.getItem("deck");
    pokeName= localStorage.getItem("deckName");
    $("#deckName").text(pokeName);
    if(localStorage.getItem("deck") == ""){
        console.log("there's nothing here");
    } else {
        pullPokemon(pokeType,20);
    }
    var colorDiv = localStorage.getItem("color");
    document.body.id = colorDiv;

}

function getInfo(cardId){
    fetch('https://api.pokemontcg.io/v2/cards/' + cardId , {
        method: 'GET'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);



        });
}
















//https://api.tcgdex.net/v2/en/cards/swsh3-136
// https://api.pokemontcg.io/v2/cards/

// function getImageandPhoto(cardId,cardTitle){
//     fetch('https://api.tcgdex.net/v2/en/cards/' + cardId , {
//         method: 'GET'
//         })
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             // console.log(data.data.images.small);
//             // console.log(data.data.cardmarket.prices.averageSellPrice);


//             var deckContainer = $("#deck-list");
//             var deckCell = $('<div>');
//             deckCell.attr("class","cell");
//             var deckCard = $('<div>');
//             deckCard.attr("class","card");
//             var cardImg = $('<img>');
//             cardImg.attr("src",data.image + "/high.png");

//             var cardSection = $('<div>');
//             cardSection.attr("class","card-section");

//             var cardName = $('<p>')
//             cardName.text(cardTitle);

//             var cardPrice = $('<h3>');
//            // cardPrice.text(data.data.cardmarket.prices.averageSellPrice);
//             cardPrice.text("10");

//             var deleteButton = $('<button>');
//             deleteButton.attr("class","hollow button");
//             deleteButton.text("Delete This");

//             cardSection.append(cardName);
//             cardSection.append(cardPrice);
//             cardSection.append(deleteButton);

//             deckCard.append(cardImg);
//             deckCard.append(cardSection);
//             deckCell.append(deckCard);
//             deckContainer.append(deckCell);
  

//         });

// }

// function saveDeck(name){
//     console.log(JSON.stringify(deckList));
//     localStorage.setItem(name,JSON.stringify(deckList));
//     var testThis = JSON.parse(localStorage.getItem(name));
//     console.log(testThis);
//     for(var i = 0; i<deckList.length;i++){
//         getImageandPhoto(deckList[i].id,deckList[i].name);
//     }
//     localStorage.setItem("deck","");

// }










// function grabData(){
//     var pokemonList = JSON.parse(localStorage.getItem("pokemon"));
//     var energyList = JSON.parse(localStorage.getItem("energy"));
//     var trainerList = JSON.parse(localStorage.getItem("trainer"));

//     deckList = pokemonList.concat(energyList,trainerList);
//     console.log(pokemonList);
//     console.log(trainerList);
//     console.log(energyList);
//     console.log(deckList);
//     loadCards();
    
// }

// function loadCards(){

//     for(var i = 0; i< deckList.length; i++ ){
//         var deckContainer = $("#deck-list");
//         var deckCell = $('<div>');
//         deckCell.attr("class","cell");
//         var deckCard = $('<div>');
//         deckCard.attr("class","card");
//         var cardImg = $('<img>');
//         cardImg.attr("src",deckList[i].imageLink);

//         var cardSection = $('<div>');
//         cardSection.attr("class","card-section");

//         var cardName = $('<p>')
//         cardName.text(deckList[i].name);

//         var cardPrice = $('<h3>');
//     // cardPrice.text(data.data.cardmarket.prices.averageSellPrice);
//         cardPrice.text("10");

//         var deleteButton = $('<button>');
//         deleteButton.attr("class","hollow button");
//         deleteButton.text("Delete This");

//         cardSection.append(cardName);
//         cardSection.append(cardPrice);
//         cardSection.append(deleteButton);

//         deckCard.append(cardImg);
//         deckCard.append(cardSection);
//         deckCell.append(deckCard);
//         deckContainer.append(deckCell);
//     }
  
    
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