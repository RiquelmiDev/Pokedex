const pokemonName = document.querySelector('.pokemonname');
const pokemonNunber = document.querySelector('.pokemonnunber');
const pokemonImage = document.querySelector('.pokemonimagem');

const form = document.querySelector('.form');
const input = document.querySelector('.inputsearch');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status ==200) {
        const data = await APIResponse.json();
        return data;
    } 

    
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando... ';
    pokemonNunber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNunber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        input.value = '';
        searchPokemon = data.id;

    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Sem registro :( ';
        pokemonNunber.innerHTML = '';
        
    }

    

}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    
});

btnPrev.addEventListener('click', () => {
    if(searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    
    }
});  

btnNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);