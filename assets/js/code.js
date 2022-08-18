let api_poke = "https://pokeapi.co/api/v2/pokemon"
let consumo = fetch(api_poke)
consumo.then(res => res.json()).then((data_api) => {
    for (const pokemon_api of data_api.results) {
        let consumo2 = fetch(data_api.url)
        consumo2.then(res2 => res2.json()).then((data_api2) => {
            for (const pokemon_api2 of data_api2.sprites.other.dream_world) {
                var carta = document.createElement("div")
                document.querySelector("#cartas-pokemons").appendChild = `  <img src="${pokemon_api2.front_default}" class="card-img-top" alt="...">`
            }
        })
    }
})
