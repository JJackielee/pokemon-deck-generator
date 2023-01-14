var btn = document.querySelector("#pokemon-button")


var pokemonList= [];
var energyList =[];
var trainerList =[];





btn.addEventListener("click", function(){
    var deckType = document.querySelector('input[name="decktype"]:checked').value;
    var deckName = document.querySelector("#deck-name").value;
    //localStorage.setItem("Deck Name", deckName)
    console.log(deckName);
    console.log(deckType);
    localStorage.setItem("deck",deckType);
    localStorage.setItem("deckName",deckName);
    //pullPokemon(deckType,20);
    location.href = "generators.html";
    
})




// function pullPokemon(type,num){
//     fetch('https://api.tcgdex.net/v2/en/cards/?stage=basic&types='+ type, {
//     method: 'GET'
//     })
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {

//         var totalCards = data.length;
//         for(var i = 0; i < num; i++){
//             var randomNum = Math.floor(Math.random() * data.length)
           
//             fetch('https://api.tcgdex.net/v2/en/cards/' + data[randomNum].id , {
//                 method: 'GET'
//             })
//             .then(function (responseCard) {
//                  return responseCard.json();
//             })
//             .then(function (dataCard) {
//                 var randomCard = {
//                     name: dataCard.name,
//                     id: dataCard.id,
//                     imageLink: dataCard.image + "/high.png"
//                 } 
//                 pokemonList.push(randomCard);
                 
//             });
            

            
//         }

//         console.log(pokemonList);
//         pullEnergy(type,20);

//     });
// }

// function pullEnergy(type,num){
//     fetch('https://api.tcgdex.net/v2/en/cards/?category=energy', {
//         method: 'GET'
//         })
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             var totalCards = data.length;
//             for(var i = 0; i < num; i++){
//                 var check = true;
//                 while(check){
//                     var randomNum = Math.floor(Math.random() * data.length)
                    
//                     if(data[randomNum].name.includes(type)){
//                         fetch('https://api.tcgdex.net/v2/en/cards/' + data[randomNum].id , {
//                             method: 'GET'
//                         })
//                         .then(function (responseCard) {
//                              return responseCard.json();
//                         })
//                         .then(function (dataCard) {
//                             var randomCard = {
//                                 name: dataCard.name,
//                                 id: dataCard.id,
//                                 imageLink: dataCard.image + "/high.png"
//                             } 
//                             energyList.push(randomCard);
                             
//                         })
//                         check = false;
//                     }
//                 }
//             }
//             console.log(energyList)
//             pullTrainers(20);
//         });
    
// }

// function pullTrainers(num){
//     fetch('https://api.tcgdex.net/v2/en/cards/?category=trainer', {
//         method: 'GET'
//         })
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             var totalCards = data.length;
//             for(var i = 0; i < num; i++){
//                 var randomNum = Math.floor(Math.random() * data.length)
//                 fetch('https://api.tcgdex.net/v2/en/cards/' + data[randomNum].id , {
//                             method: 'GET'
//                 })
//                 .then(function (responseCard) {
//                         return responseCard.json();
//                 })
//                 .then(function (dataCard) {
//                     var randomCard = {
//                         name: dataCard.name,
//                         id: dataCard.id,
//                         imageLink: dataCard.image + "/high.png"
//                     } 
//                     trainerList.push(randomCard);
                        
//                 })
                
                
//             }
//             console.log(trainerList);
//             saveDeck();
//         });
// }

// function saveDeck(){
//     localStorage.setItem("pokemon",JSON.stringify(pokemonList));
//     localStorage.setItem("energy",JSON.stringify(energyList));
//     localStorage.setItem("trainer",JSON.stringify(trainerList));

// }
