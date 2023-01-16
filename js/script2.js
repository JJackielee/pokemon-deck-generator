var btn = document.querySelector("#pokemon-button")
var saveDeckName = JSON.parse(localStorage.getItem("savedDeckName")) || [];

btn.addEventListener("click", function(){
    var deckType = document.querySelector('input[name="decktype"]:checked').value;
    var deckName = document.querySelector("#deck-name").value;
    if (deckName == "") {
        return;
    }
    console.log(deckName);
    console.log(deckType);
    var testName = deckName;
    var iterator = 1;
    while(saveDeckName.includes(testName)){
        testName = deckName + "-" + iterator;
        iterator++;
    }

    localStorage.setItem("deck",deckType);
    localStorage.setItem("deckName",testName);
    location.href = "generators.html";
        
})

const form = document.querySelector("form");
 
// var savedColorDiv = localStorage.getItem("background-color-div");
// if (savedColorDiv) {
//     document.body.className = savedColorDiv;
// } else {
//     var selectedDiv = document.querySelector('input[name="decktype"]:checked').getAttribute("data-div");
//     document.body.className = selectedDiv;
//     localStorage.setItem("background-color-div", selectedDiv);
// }
 
form.addEventListener("change", (event) => {
    console.log(document.body);
 
    var colorDiv = event.target.getAttribute("data-div");
    console.log(colorDiv);
    document.body.id = colorDiv;
    localStorage.setItem("color", colorDiv);
});


