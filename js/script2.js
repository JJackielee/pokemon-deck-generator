var btn = document.querySelector("#pokemon-button")
btn.addEventListener("click", function(){
    var deckType = document.querySelector('input[name="deckType"]:checked').value;
    var deckName = document.querySelector("#deck-name").value;
    localStorage.setItem("Deck Name", deckName)
    console.log(localStorage)
    console.log(deckType)


})

