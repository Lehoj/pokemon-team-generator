console.log('fetch-pokemons.js works!');

async function fetchRandomPokemon(pokemonCount, startId, endId, pokemonShinyBoolean) {
    const pokemonData = [];
    const totalPokemon = 1010; // Total Pokémon available in the API
    //const randomIds = Array.from({ length: pokemonCount }, () => Math.floor(Math.random() * totalPokemon) + 1);
    const randomPokemonIds = generateRandomPokemonIdsInRange(pokemonCount, startId, endId);
    const pokemonShiny = pokemonShinyBoolean;

    let onlyEvolved = false;

    //let idsInRange = Array.from({ length: endId - startId + 1 }, (_, i) => i + startId); console.log(idsInRange);

    // Fetch each Pokémon by ID concurrently
    try {
        const fetchPromises = randomPokemonIds.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => response.ok ? response.json() : null).catch(() => null));
        const results = await Promise.all(fetchPromises);

        // Add each fetched Pokémon to pokemonData
        pokemonData.push(...results); console.log(results);
        
        //let pokemonDataTest = [];

        /* pokemonData.push(
            ...results.map(pokemon => ({
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.front_default,
                shinyImage: pokemon.sprites.front_shiny,
            }))
          ); */

          //let pokemonNames = [];

        /* pokemonData.forEach(pokemon => {
            console.log(`Test name: ${pokemon.name}, Test ID: ${pokemon.id}`);
            pokemonNames = pokemon.abilities;
            console.log(pokemonNames);
        }); */

        if(onlyEvolved == true) {
            console.log('onlyEvolved condition works!');
            fetchOnlyEvolvedPokemon(fetchPromises);
        }

        // Display the fetched Pokémon data
        displayPokemon(pokemonData, pokemonShiny);

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

async function fetchOnlyEvolvedPokemon(fetchPromises) {
    let pokemonDataFinal = [];

    const speciesDataArray = await Promise.allSettled(fetchPromises); console.log('Species: ' + speciesDataArray);
    
    // Filter for only fulfilled and valid data, then check if fully evolved
    const evolvedSpecies = speciesDataArray
        .filter(result => result.status === 'fulfilled' && result.value && result.value.evolution_chain) // Only valid species data
        .map(result => result.value)
        .filter(speciesData => isFullyEvolved(speciesData));

    // Fetch detailed data only for fully evolved Pokémon
    const evolvedPokemonPromises = evolvedSpecies.map(speciesData => fetch(`https://pokeapi.co/api/v2/pokemon/${speciesData.id}`).then(response => response.ok ? response.json() : null).catch(() => null));
    const evolvedPokemonData = await Promise.all(evolvedPokemonPromises);
    
    pokemonDataFinal.push(...evolvedPokemonData);
    
    console.log('Evolved: ' + evolvedPokemonData);

    // Fetch species data in parallel to determine fully evolved status
/*         const evolvedPokemonPromises = pokemonData.map(async pokemon => {
        const speciesResponse = await fetch(pokemon.species.url);
        const speciesData = await speciesResponse.json();

        // Fetch evolution chain data
        const evolutionChainResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionChainData = await evolutionChainResponse.json();

        // Check if Pokémon is fully evolved
        if (isFullyEvolved(pokemon.name, evolutionChainData.chain)) {
            return pokemon; // Return fully evolved Pokémon
        }
        return null; // Return null if not fully evolved
    });

    // Filter out null values for non-evolved Pokémon
    const evolvedPokemonData = (await Promise.all(evolvedPokemonPromises)).filter(pokemon => pokemon); */

    // Display evolved Pokémon data
    //displayPokemon(evolvedPokemonData);

    displayPokemon(evolvedPokemonData);
}

function isFullyEvolved(speciesData) {
    if (!speciesData.evolution_chain) return false;

    // Check if there are no further evolutions
    const evolvesTo = speciesData.evolution_chain.evolves_to;
    return !evolvesTo || evolvesTo.length === 0;
}

function generateRandomPokemonIdsInRange(pokemonCount, startId, endId) {
    const idsInRange = Array.from({ length: endId - startId + 1 }, (_, i) => i + startId);
    const randomIds = Array.from({ length: pokemonCount }, () => {
        return idsInRange[Math.floor(Math.random() * idsInRange.length)];
    });
    return randomIds;
}

// Function to display Pokémon data
function displayPokemon(pokemonData, pokemonIsShiny) {
    let saveDisplayedPokemon = [];
    const pokemonListElement = document.getElementById('pokemonList'); console.log(pokemonListElement);
    document.getElementById("pokemonList").replaceChildren();
    
    //const idsInRange = Array.from({ length: endId - startId + 1 }, (_, i) => i + startId); console.log(idsInRange);

    pokemonData.forEach(pokemon => {
        // Displaying Pokémon names and images
        console.log(`Name: ${pokemon.name}, ID: ${pokemon.id}`);
    
        const container = document.createElement("div");
        container.className = 'image-item'; console.log(container);

        // Log values to debug
        /* console.log("pokemonIsShiny:", pokemonIsShiny);
        console.log("Shiny image:", pokemon.sprites.front_shiny);
        console.log("Default image:", pokemon.sprites.front_default); */

        container.innerHTML = `
            <h3 class="animate__animated animate__flipInY">${pokemon.name}</h3>
            <img src="${pokemonIsShiny == 1 ? pokemon.sprites.front_shiny : pokemon.sprites.front_default}" alt="${pokemon.name}" class="animate__animated animate__flipInX">
        `;

        // Save displayed Pokémon to the new array
        saveDisplayedPokemon.push({
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.front_default
        }); //console.log('Saved Pokemons: ' + saveDisplayedPokemon);

        pokemonListElement.appendChild(container);
        // Trigger reflow to ensure the DOM updates
        document.body.offsetHeight;
    });
}