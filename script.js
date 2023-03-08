const pokemonName = document.querySelector('.pokemon-name')
const pokemonNumber = document.querySelector('.pokemon-number')
const pokemonImage = document.querySelector('.pokemon-imagem')

const form = document.querySelector('.search-box')
const input = document.querySelector('.search')

const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1;

const buscarPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const mostrarPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await buscarPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not found :(';
        pokemonNumber.innerHTML = '';
    }

}

form.addEventListener('submit', (event) => {

    event.preventDefault();
    mostrarPokemon(input.value.toLowerCase())
});


buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon--
        mostrarPokemon(searchPokemon)
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon++
    mostrarPokemon(searchPokemon)
});

mostrarPokemon(searchPokemon);