// gets the list of already used deck names from localstorage

var btn = document.querySelector("#pokemon-button")
var saveDeckName = JSON.parse(localStorage.getItem("savedDeckName")) || [];

//an event listener on the button.
//takes the value of the checked radio button as well as the input for the deckName
//checks if user typed a deckName. if user has not typed anything then it does nothing
//also checks if the name that user type is already being used. if so then it will give it a number
//so user can differiate the decks
//stores everything into local storage and sends user to generator page
btn.addEventListener("click", function(){
    var deckType = document.querySelector('input[name="decktype"]:checked').value;
    var deckName = document.querySelector("#deck-name").value;
    if (deckName == "") {
        return;
    }
    var testName = deckName;
    var iterator = 1;
    while(saveDeckName.includes(testName)){
        testName = deckName + "-" + iterator;
        iterator++;
    }

    localStorage.setItem("deckType",deckType);
    localStorage.setItem("deckName",testName);
    location.href = "generators.html";
        
})

const form = document.querySelector("form");
 
//eventlistener on the radio buttons to change the color of the background color to represent
//the deck type the user is tryign to select. it changes the ID of the background to make 
//background color change
//also stores the id name so it will show the same background color on the next page. 
form.addEventListener("change", (event) => {
    console.log(document.body);
 
    var colorDiv = event.target.getAttribute("data-div");
    console.log(colorDiv);
    document.body.id = colorDiv;
    localStorage.setItem("color", colorDiv);
});


