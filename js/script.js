
var deckList= [];
var pokeType = "";
var colorDiv = "";
var pokeName = "";
var saveDeckList = JSON.parse(localStorage.getItem("savedDeck")) || [];
var saveDeckName = JSON.parse(localStorage.getItem("savedDeckName")) || [];

getType();
loadDeckButtons();


$("#saveBtn").on("click",function(){
    if(saveDeckName.includes(pokeName)){
        console.log("already deck");

    } else{
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

        // var deleteButton = $('<button>');
        // deleteButton.attr("class","hollow button");
        // deleteButton.text("Delete This");
        // deleteButton.on("click", function(){
        //     console.log($(this).parent().parent().parent().index())
        //     deckList.splice($(this).parent().parent().parent().index(), 1);
        //     $(this).parent().parent().parent().remove();
        //     console.log(deckList);

        // });


        var infoButton = $('<button>');
        infoButton.attr("class","button small medium-expanded");
        infoButton.text("More Info");
        infoButton.attr("data-open","exampleModal1");
        infoButton.attr("data-id",deckList[i].id);
        infoButton.attr("data-img",deckList[i].image);
        infoButton.attr("data-name",deckList[i].name);
        infoButton.on("click", function(){
            console.log($(this).parent().parent().children().attr("src"));
            getInfo($(this).attr("data-id"),$(this).attr("data-img"),$(this).attr("data-name"));

        });


        

        deckCard.append(cardImg);
        deckCard.append(infoButton);
       
        deckCell.append(deckCard);
        deckContainer.append(deckCell);
    }
  
    
}

function getType(){
    pokeType = localStorage.getItem("deck");
    pokeName= localStorage.getItem("deckName");
    $("#deckName").text(pokeName);
    if(localStorage.getItem("deck") == ""){
        location.href="./index.html";
    } else {
        pullPokemon(pokeType,20);
    }
    colorDiv = localStorage.getItem("color");
    document.body.id = colorDiv;
}

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
            if(data.data.cardmarket.prices.averageSellPrice == undefined){
                $("#price").text("Card price is unavaliable");
            } else {
                $("#price").text(data.data.cardmarket.prices.averageSellPrice);
            }
        });
}

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
            loadCards();
        });
        btnGroup.append(oldButton);
    }  
}











