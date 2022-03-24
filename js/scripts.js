// wrapped pokemonList inside IIFE

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    // check if new pokemon is an object
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let divItem = document.createElement('div');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-primary', 'text-capitalize', 'btn-block');
    divItem.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-around'
    );
    listItem.classList.add('list-item', 'col-sm-4');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokedexModal');
    listItem.appendChild(divItem);
    divItem.appendChild(button);
    pokemonList.appendChild(listItem);

    // on click event listener returns show details function
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }
  // using fetch to return pokemon list from pokedex api url defined previously
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  // fetching details from the pokemon api
  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // defining which details we want
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        //loop through types array for type values
        pokemon.type = [];
        for (let i = 0; i < details.types.length; i++) {
          pokemon.type.push(details.types[i].type.name);
        }
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      //call the show modal function defined below
      showModal(
        pokemon.name,
        pokemon.height,
        pokemon.weight,
        pokemon.imageUrl,
        pokemon.type
      );
    });
  }

  function showModal(name, height, weight, imageUrl, type) {
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');
    let sprite = $('<img class="sprite">');

    modalTitle.empty();
    modalBody.empty();

    modalTitle.text(name);

    sprite.attr('src', imageUrl);
    modalBody.append(sprite);

    modalBody.append(
      '<p class="text-capitalize">height: ' +
        height +
        '<br>' +
        'weight: ' +
        weight +
        '<br>' +
        'type: ' +
        type.join(' & ') +
        '</p>'
    );
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  };
})();

// refactored code to use a forEach loop

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
