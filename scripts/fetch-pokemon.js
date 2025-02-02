const pokemonApiUrl = 'https://pokeapi.co/api/v2';

async function generateRandomPokemon(pokemonFinalCount, startId, endId, pokemonIsShiny) {
    const pokemonGeneratedData = [];
    const pokemonRandomIds = generateRandomPokemonIdsInRange(pokemonFinalCount, startId, endId);

    // Fetch each Pokémon by ID concurrently
    try {
        const pokemonPromises = pokemonRandomIds.map(id => fetch(`${pokemonApiUrl}/pokemon/${id}`).then(response => response.json()));
        const pokemonPromisesResults = await Promise.all(pokemonPromises);

        // Add each fetched Pokémon to pokemonData
        pokemonGeneratedData.push(...pokemonPromisesResults);
        
        /*pokemonGeneratedData.push(
            ...pokemonPromisesResults.map(pokemon => ({
                id: pokemon.id,
                name: pokemon.name,
                sprites: {
                    image: pokemon.sprites.front_default,
                    shinyImage: pokemon.sprites.front_shiny,
                }
            }))
          );*/

        // Display the fetched Pokémon data
        displayPokemon(pokemonGeneratedData, pokemonIsShiny);

    } catch (error) {
        console.log("Error fetching Pokémon:", error);
    }
}

/*** Could generate duplicated IDs ***/
/* function generateRandomPokemonIdsInRange(pokemonCount, startId, endId) {
    const idsInRange = Array.from({ length: endId - startId + 1 }, (_, i) => i + startId);
    const randomIds = Array.from({ length: pokemonCount }, () => {
        return idsInRange[Math.floor(Math.random() * idsInRange.length)];
    });
    return randomIds;
}*/

/*** Function to generate unique random IDs in the chosen range ***/
function generateRandomPokemonIdsInRange(pokemonCount, startId, endId) {
    const idsInRange = Array.from({ length: endId - startId + 1 }, (_, i) => i + startId);

    if (pokemonCount > idsInRange.length) {
        throw new Error("Requested number of Pokémon exceeds available unique IDs in the range.");
    }

    // Shuffles the array (Fisher-Yates shuffle algorithm) and takes the first `pokemonCount` elements for unique random selection
    for (let i = idsInRange.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swaps elements
        [idsInRange[i], idsInRange[j]] = [idsInRange[j], idsInRange[i]];
    }
    
    // forEach variant
    /* idsInRange.forEach((_, i) => {
        const j = Math.floor(Math.random() * (i + 1));
        [idsInRange[i], idsInRange[j]] = [idsInRange[j], idsInRange[i]]; // Swap elements
    }); */

    return idsInRange.slice(0, pokemonCount);
}

/***  Function to display generated Pokémon data ***/
function displayPokemon(pokemonGeneratedData, pokemonIsShiny) {
    //let saveDisplayedPokemon = [];
    const pokemonListElement = document.getElementById('pokemonList');
    document.getElementById("pokemonList").replaceChildren();

    pokemonGeneratedData.forEach(pokemon => {    
        const container = document.createElement("div");
        container.className = 'image-item';

        // Log values to debug
        //console.log("pokemonIsShiny:", pokemonIsShiny);
        //console.log("Shiny image:", pokemon.sprites.front_shiny);
        //console.log("Default image:", pokemon.sprites.front_default);

        container.innerHTML = `
            <h3 class="animate__animated animate__flipInY">${pokemon.name}</h3>
            <img src="${pokemonIsShiny == 1 ? pokemon.sprites.front_shiny : pokemon.sprites.front_default }" alt="${pokemon.name}" class="animate__animated animate__flipInX">
        `;

        // Save displayed Pokémon to the new array
        /*saveDisplayedPokemon.push({
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.front_default,
            shinyImage: pokemon.sprites.front_shiny
        }); console.log('Saved Pokemons: ' + saveDisplayedPokemon);*/

        pokemonListElement.appendChild(container);

        // Trigger reflow to ensure the DOM updates
        document.body.offsetHeight;
    });
}