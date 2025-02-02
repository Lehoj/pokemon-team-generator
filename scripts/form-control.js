const mainForm = document.getElementById('mainForm');
const pokemonCountSelect = document.getElementById("pokemonCount");
//const pokemonEvolvedSelect = document.getElementById("pokemonIsEvolved");
const pokemonShinySelect = document.getElementById("pokemonIsShiny");

mainForm.addEventListener('submit', (event) => {
	event.preventDefault();
    
    const pokemonGenerationSelect = document.getElementById("pokemonGeneration").value.split(",");

    const pokemonFinalCount = pokemonCountSelect.value;
    const startId = parseInt(pokemonGenerationSelect[0]);
    const endId = parseInt(pokemonGenerationSelect[1]);
    //const pokemonIsEvolved = pokemonEvolvedSelect.value;
    const pokemonIsShiny = pokemonShinySelect.value;

    generateRandomPokemon(pokemonFinalCount, startId, endId, pokemonIsShiny); // pokemonIsEvolved
});
