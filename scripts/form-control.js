console.log('form-control.js works!');

const pokemonGenerateForm = document.getElementById('pokemonInfoForm');
// Ak je tu, berie iba prvy select a nic ine
//const pokemonGenerationSelect = document.getElementById("pokemonGeneration").value.split(",");
const pokemonCountSelect = document.getElementById("pokemonCount");
const pokemonShininess = document.getElementById("pokemonShiny");

pokemonGenerateForm.addEventListener('submit', (event) => {
	event.preventDefault(); console.log('Submit works!');
    // Ak je tu, berie vsetky selecty a ich hodnoty
    const pokemonGenerationSelect = document.getElementById("pokemonGeneration").value.split(",");

    const pokemonCount = pokemonCountSelect.value;
    const startId = parseInt(pokemonGenerationSelect[0]); console.log('Start id: ' + startId);
    const endId = parseInt(pokemonGenerationSelect[1]); console.log('End id: ' + endId);
    const pokemonShinyBoolean = pokemonShininess.value;

    fetchRandomPokemon(pokemonCount, startId, endId, pokemonShinyBoolean);
});
