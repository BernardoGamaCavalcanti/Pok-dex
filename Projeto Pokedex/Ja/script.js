const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); 


    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
                  
      const data = await fetchPokemon(pokemon); /*await faz com que o programa espere caregar a informação antes de continuar lendo o restante da instrução*/

    if (data) {
      pokemonImage.style.display = 'block';
      pokemonName.innerHTML = data.name;
      pokemonNumber.innerHTML = data.id;
      pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']
      ['front_default'];
      input.value = ''; /*faz com que após renderizar o pokemon o campo de pesquisa fique vazio*/
      searchPokemon = data.id; 
    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innnerHTML = 'Not found';
        pokemonNumber.innerHTML = '';
     }
}

form.addEventListener('submit', (event) => {
      event.preventDefault();
      renderPokemon(input.value.toLowerCase()); /*O tolowercase() faz com que independente de as letras estarem maiúsculas ou minúsculas fique tudo minúsculo, pois nesta API está tudo minúsculo0*/
});

buttonPrev.addEventListener('click', () =>{
    if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);}
});


buttonNext.addEventListener('click', () =>{
      searchPokemon += 1;
      renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);