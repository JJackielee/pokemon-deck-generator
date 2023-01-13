var btn = document.querySelector("#pokemon-button")
btn.addEventListener("click", function(){
    var deckName = document.querySelector("#deck-name").value;
    localStorage.setItem("Deck Name", deckName)
    console.log(localStorage)
    
})