const pokemonName = document.querySelector(".pokemon__name")
const pokemonNumber = document.querySelector(".pokemon__number")
const pokemonImage = document.querySelector(".pokemon__image")
const form = document.querySelector(".form")
const input = document.querySelector(".input__search")
const prev = document.querySelector(".btn-prev")
const next = document.querySelector(".btn-next")

let pokemonSearch = 1;

const fetchPokemon = async (pokemon) => { // função assíncrona precisa do await para ser executada
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); //vai retornar só uma promise // é dentro do fetch onde será realizada a busca pelo pokemon na variável ${pokemon}

    // são crases em volta da url, e não aspas simples, jamais confundir

    // toLowerCase() vai tornar todos os caracteres da busca em minúsculo, evitando erros no console

    if (APIresponse.status == 200) { // se a resposta(status) da API for igual a 200 (se não houver erro)
        const data = await APIresponse.json(); //vai retornar os dados completos
        return data; //retorna o valor dos dados da API
    }
    
}


const renderPokemon = async (pokemon) => { //função para renderizar a imagem, nome e id do pokemon na tela
    const data = await fetchPokemon(pokemon)
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''


    if (data) { // se o data tiver algum resultado (nenhum erro)

        pokemonImage.style.display = 'block' // volta a exibir a imagem do pokemon
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        pokemonSearch = data.id;
    }

    else{ // se a API não encontrar nenhum dado relacionado ao input
        pokemonName.innerHTML = "Not found :("
        pokemonNumber.innerHTML = ''
        pokemonImage.style.display = 'none' // vai esconder a imagem do pokemon
    }
    
}

 //adicionando um eventListener do tipo submit(enviar) ao formulário
form.addEventListener('submit', (event) => {
    event.preventDefault() //bloqueia o comportamento padrão do formulário (seja lá o que isso signifique)
    //console.log(input.value) // .value pega o valor da variável input em texto

    renderPokemon(input.value.toLowerCase()) //a função renderPokemon recebe o value do input como parâmetro, toLowerCase() vai tornar os caracteres minúsculos

}) //vamos adicionar um evento de submit(enviar) no formulário


// a função acompanhada ao submit do formulério é simplesmente pegar o valor do input e enviar à função renderPokemon() como parâmetro e assim realizar a busca pelo pokemon no API por meio do fetchPokemon()

renderPokemon(pokemonSearch) // pokemon de id 1 será o padrão por enquanto

next.addEventListener('click', () => {
    pokemonSearch += 1;
    renderPokemon(pokemonSearch)
})

prev.addEventListener('click', () => { // adciona um evento de click ao botão prev
    if(pokemonSearch > 1){ // se o valor do pokemonSearch for maior que 1
        pokemonSearch -= 1;
    renderPokemon(pokemonSearch)
    }
    
})