// Zatial sa nepouziva

console.log('functions.js works!');

let allPokemons = [];

async function loadPokemonAPI() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json(); // Parse the JSON from the response
        //console.log(data); // Use the data received from the API
        
        allPokemons = data.results; // Store the Pokémon name and URL
        /* allPokemons = data.results.map(pokemon => ({
            name: pokemon.name,
            url: pokemon.url
        })); */
    
        // Call the function to display Pokémon data in HTML
        displayPokemons();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

/* // Function to display Pokémon data in HTML
function displayPokemons() {
    const pokemonListElement = document.getElementById('pokemonList'); // Get the <ul> element from the DOM
    
    allPokemons.forEach(pokemon => {
        const listItem = document.createElement('li'); // Create a new <li> element
        listItem.textContent = pokemon.name; // Set the text content to the Pokémon's name
        
        pokemonListElement.appendChild(listItem); // Append the <li> to the <ul>
    });
} */

// Function to fetch and display Pokémon data in HTML
async function displayPokemons() {
    const pokemonListElement = document.getElementById('pokemonList'); // Get the <ul> element

    for (const pokemon of allPokemons) {
        const pokemonDetails = await fetchPokemonDetails(pokemon.url); // Fetch details for each Pokémon

        const listItem = document.createElement('div'); // Create a new <div> element
        //listItem.classList.add("card");
        listItem.className = "card";

        // Create an image element for the Pokémon's image
        const pokemonImage = document.createElement('img');
        pokemonImage.src = pokemonDetails.sprites.front_default; // Set the src to the Pokémon image URL
        pokemonImage.alt = pokemon.name; // Add alt text for accessibility
        pokemonImage.width = 100; // Set a fixed width for the image

        // Create a text element for the Pokémon's name
        const pokemonName = document.createElement('p');
        pokemonName.textContent = pokemon.name;

        // Append the image and name to the list item
        listItem.appendChild(pokemonImage);
        listItem.appendChild(pokemonName);

        // Append the list item to the unordered list
        pokemonListElement.appendChild(listItem);
    }
}

// Function to fetch Pokémon details, including its image
async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url); // Fetch details from the Pokémon URL
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const pokemonData = await response.json(); // Parse the details
        return pokemonData; // Return the Pokémon data
    } catch (error) {
        console.error('Error fetching Pokémon details:', error);
    }
}