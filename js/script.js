
//global variables that get used through the entire code
//gets information from localstorage that was stored in the preveious page.

var deckList= [];
var pokeType = "";
var colorDiv = "";
var pokeName = "";
var saveDeckList = JSON.parse(localStorage.getItem("savedDeck")) || [];
var saveDeckName = JSON.parse(localStorage.getItem("savedDeckName")) || [];

getType();
loadDeckButtons();



//event listener on the save button on the page.
//checks if the name of the deck thats being saved is already being used.
//if it is then it does nothing 
//stores an object for the list of cards into a localstorage as well as a string of array for the list of saved names
$("#saveBtn").on("click",function(){
    if(!saveDeckName.includes(pokeName)){
        var newDeck = {
            name: pokeName,
            cards: deckList,
            type: colorDiv
        }
        saveDeckList.push(newDeck);
        saveDeckName.push(pokeName);
        loadDeckButtons()
        localStorage.setItem("savedDeck",JSON.stringify(saveDeckList));
        localStorage.setItem("savedDeckName",JSON.stringify(saveDeckName));
    }   
});



//pullPokemon Function that takes in two arguments. the type of pokemon and the number of cards to pull
//uses a fetch request to an api that returns all the possible basic type pokemon in the type we selected
// randomly pulls 20 cards from that list of possible pokemon and adds it into our deckList Array
// there are cards that does not have an image in the api so we used a while look to make sure the card we pull has an image
// it saves the name, cardID and an URL link to the card we selected
// runs pullEnergy function after 
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


//pullEnergy function that takes in two arguments. The type of energy card and number of cards to pull
//uses a fetch request to an api that returns ALL energy cards that exist. 
//the api does not have a query that lets us search for a specific type of energy so we're using a while loop
// to check if the randomly selected card has the type selected in the name of the card. if it does then it will get added to deck
// some cards also do not have an img url so we use a while loop to also make sure that the card we randomyl selected has an img
// runs pullTrainers function after
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

//pullTrainer function that takes in one argument. the number of card to pull
//uses a fetch request that returns all possible trainer cards that exist
// randomly selects 20 cards. uses a while loop to make sure that the randomly selected card has an img url
// if it doesnt then it continues the loop until it finds one that has an url
// runs loadCards function after
// clears out the deckType localstorage
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
                deckList.push(randomCard);
            }
            loadCards();
            localStorage.setItem("deckType","");
        });
    
}

//loadCard function that clears out the deckList area first
// uses a forloop that runs for the length of the deckList array
// creates html elements to display each card into the html.
// added an event listener on the button we're appending. so when clicked we run getInfo function and display modal
// appends everything into the div with the ID deck-list
function loadCards(){
    var deckContainer = $("#deck-list");
    deckContainer.empty();
    for(var i = 0; i< deckList.length; i++ ){
       
        var deckCell = $('<div>');
        deckCell.attr("class","cell");
        var deckCard = $('<div>');
        deckCard.attr("class","card");
        var cardImg = $('<img>');
        cardImg.attr("src",deckList[i].image);

        var infoButton = $('<button>');
        infoButton.attr("class","button small medium-expanded");
        infoButton.text("More Info");
        infoButton.attr("data-open","exampleModal1");
        infoButton.attr("data-id",deckList[i].id);
        infoButton.attr("data-img",deckList[i].image);
        infoButton.attr("data-name",deckList[i].name);
        infoButton.on("click", function(){
            getInfo($(this).attr("data-id"),$(this).attr("data-img"),$(this).attr("data-name"));

        });
        deckCard.append(cardImg);
        deckCard.append(infoButton);
        deckCell.append(deckCard);
        deckContainer.append(deckCell);
    }
  
    
}

//getType function that gets data from local storage to display user input details
//pokeType gets the type the user selected as the type of deck they want to generate
//pokeName gets the name the user named their deck
//checks if there's a type in the localstorage. if there isnt it sends user back to main page
//this is so user cant refresh on the generator page. 
//colorDiv is to change the background color of the page corresponding to the type user selected

function getType(){
    pokeType = localStorage.getItem("deckType");
    pokeName= localStorage.getItem("deckName");
    $("#deckName").text(pokeName);
    if(localStorage.getItem("deckType") == ""){
        location.href="./index.html";
    } else {
        pullPokemon(pokeType,20);
    }
    colorDiv = localStorage.getItem("color");
    document.body.id = colorDiv;
}

//getInfo function that grabs information of a specific card
// uses a fetch request to a diferent api that gives us cards infromation like price
// used the fetch data to update the price of the card in the modal with jquery
function getInfo(cardId,imgUrl,cardName){
    fetch('https://api.pokemontcg.io/v2/cards/' + cardId , {
        method: 'GET'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            $("#modalName").text(cardName);
            $("#pokemonPic").attr("src",imgUrl);
            if(data.data.cardmarket == undefined){
                $("#price").text("Card price is unavaliable");
            } else {
                $("#price").text(data.data.cardmarket.prices.avg1);
            }
        });
}

// loadDeckButtons function that generates a button for every deck that was saved
// saved deck is saved into local storage as an array of objects
// uses a for loop that runs for the length of the savedDeck array
// appends a button and gives it an index corresponding to the savedDeck index in our array
// adds an event listener every button so when clicked the deckList to be displayed changed to the deck
// corrsponding to the indexed adde to the button. 
function loadDeckButtons(){
    var btnGroup = $("#btnGroup");
    btnGroup.empty();

    for(var i = 0 ; i < saveDeckList.length; i++){
        var oldButton = $('<button>');
        oldButton.attr("deckIndex", i);
        oldButton.addClass("button primary radius");
        oldButton.text(saveDeckList[i].name);
        oldButton.on("click", function(){
            console.log(saveDeckList);
            console.log($(this).attr("deckIndex"));
            deckList = saveDeckList[$(this).attr("deckIndex")].cards;
            var colorDiv = saveDeckList[$(this).attr("deckIndex")].type;
            document.body.id = colorDiv;
            $("#deckName").text(saveDeckList[$(this).attr("deckIndex")].name);
            pokeName = saveDeckList[$(this).attr("deckIndex")].name;
            loadCards();
        });
        btnGroup.append(oldButton);
    }  
}











