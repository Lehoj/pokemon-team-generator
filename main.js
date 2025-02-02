import './style.css';
import 'animate.css';

document.querySelector('#app').innerHTML = `
  <div>
    <a href="">
      <img src="./images/pokemon-logo.svg" class="logo" alt="Official Pokemon logo" />
    </a>
    
    <h2>Pokemon Team Generator</h2>

    <div class="form-container">
        <form class="form" id="mainForm">
            <label>Pokémon Count (6 is a full party)</label>
              <select id="pokemonCount">
                <option value=1>1</option>
                <option value=2>2</option>
                <option value=3>3</option>
                <option value=4>4</option>
                <option value=5>5</option>
                <option value=6>6</option>
              </select>

          <label>Generation (1st up to 9th)</label>
              <select id="pokemonGeneration">
                <option value=1,1025>All Pokémon</option>
                <option value=1,151>Kanto</option>
                <option value=152,251>Johto</option>
                <option value=252,386>Hoenn</option>
                <option value=387,493>Sinnoh</option>
                <option value=494,649>Unova</option>
                <option value=650,721>Kalos</option>
                <option value=722,809>Alola</option>
                <option value=810,905>Galar / Hisui</option>
                <option value=906,1025>Paldea</option>
              </select>

            <!--<label>Fully evolved</label>
              <select id="pokemonIsEvolved">
                <option value=1>Yes</option>
                <option value=0>No</option>
              </select>-->

            <label>Shiny</label>
              <select id="pokemonIsShiny">
                <option value=0>No</option>
                <option value=1>Yes</option>
              </select>
            
            <button type="submit">Generate</button>
        </form>
    </div>

    <div class="image-container" id="pokemonList">
        <!--<ul id="pokemeonRows">
        </ul>-->
    </div>

    <div class="card">
      <footer>
        Generate a random team of Pokémons and take on a challenge!
      </footer> 
    </div>

  </div>
`