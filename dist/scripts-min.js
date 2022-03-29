let pokemonRepository=function(){let e=[];function t(t){"object"==typeof t&&"name"in t?e.push(t):console.log("pokemon is not correct")}function n(e){let t=e.detailsUrl;return fetch(t).then(function(e){return e.json()}).then(function(t){e.imageUrl=t.sprites.front_default,e.height=t.height,e.weight=t.weight,e.type=[];for(let n=0;n<t.types.length;n++)e.type.push(t.types[n].type.name)}).catch(function(e){console.error(e)})}function o(e){n(e).then(function(){i(e.name,e.height,e.weight,e.imageUrl,e.type)})}function i(e,t,n,o,i){let l=$(".modal-title"),a=$(".modal-body");l.empty(),a.empty(),l.text(e);let c=document.createElement("img");c.src=o,a.append(c);let r=document.createElement("p");r.innerText=`Height: ${10*t}cm\n      Weight: ${n/10}kg\n      Type: ${i.join(" & ")}`,a.append(r)}return{add:t,getAll:function(){return e},addListItem:function(e){let t=document.querySelector(".pokemon-list"),n=document.createElement("li"),i=document.createElement("div"),l=document.createElement("button");l.innerText=e.name,l.classList.add("btn","btn-primary","text-capitalize"),i.classList.add("list-group-item","d-flex","justify-content-around"),n.classList.add("list-item","col"),l.setAttribute("data-toggle","modal"),l.setAttribute("data-target","#pokedexModal"),n.appendChild(i),i.appendChild(l),t.appendChild(n),l.addEventListener("click",function(t){o(e)})},showDetails:o,loadList:function(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){t({name:e.name,detailsUrl:e.url})})}).catch(function(e){console.error(e)})},loadDetails:n,showModal:i}}();function pokemonSearch(){let e=document.querySelectorAll(".list-item"),t=document.getElementById("search").value;for(var n=0;n<e.length;n++)e[n].innerText.toLowerCase().includes(t.toLowerCase())?e[n].classList.remove("hide"):e[n].classList.add("hide")}pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(e=>{pokemonRepository.addListItem(e)})});
