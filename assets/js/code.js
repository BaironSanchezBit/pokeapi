function consumo_api_total(url_a_consumir) {
    //let api_pokemon = "https://pokeapi.co/api/v2/pokemon/"
    let consumo1 = fetch(url_a_consumir)
    consumo1.then(res => res.json())
        .then((data_api) => {
            document.querySelector("#cartas-pokemon").innerHTML = ''
            for (const pokemon_api of data_api.results) {
                let consumo2 = fetch(pokemon_api.url)
                consumo2.then(res2 => res2.json())
                    .then((data_api2) => {
                        console.log(data_api2)
                        let vida_pokemon = data_api2.stats[0].base_stat
                        let ataque_pokemon = data_api2.stats[1].base_stat
                        let defensa_pokemon = data_api2.stats[2].base_stat

                        document.querySelector("#cartas-pokemon").innerHTML += `
                    <div class="col">
                        <div class="card" style="box-shadow: 0 0 15px #887878">
                            <img src="${data_api2.sprites.other.home.front_default}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title d-flex justify-content-center h4  ">${data_api2.name}</h5>
                                <div class="row">
                                <div class="col-3"><label>HP</label></div>
                                    <div class="progress p-0">
                                        <div class="progress-bar progress-bar-striped bg-info" role="progressbar" aria-label="Info striped example" style="width: ${vida_pokemon}%" aria-valuenow="${vida_pokemon}" aria-valuemin="0" aria-valuemax="${vida_pokemon}">${vida_pokemon}%</div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-3"><label>ATTACK</label></div>
                                    <div class="progress p-0">
                                        <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" aria-label="Danger striped example" style="width: ${ataque_pokemon}%" aria-valuenow="${ataque_pokemon}" aria-valuemin="0" aria-valuemax="${ataque_pokemon}">${ataque_pokemon}%</div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-3"><label>DEFENSE</label></div>
                                    <div class="progress p-0">
                                        <div class="progress-bar progress-bar-striped bg-success" role="progressbar" aria-label="Success striped example" style="width: ${defensa_pokemon}%" aria-valuenow="${defensa_pokemon}" aria-valuemin="0" aria-valuemax="${defensa_pokemon}">${defensa_pokemon}%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                    })
            }
            // crear_botones(data_api.next, data_api.previous)
            crear_botones(data_api.next, data_api.previous)
        })
}


function crear_botones(url_pagina_siguiente, url_pagina_anterior) {
    let div_paginacion = document.querySelector("#paginacion")
    div_paginacion.innerHTML = ''

    let boton_anterior = document.createElement("button")
    boton_anterior.className = "btn btn-dark"
    // boton_anterior.classList.add("btn", "btn-primary")
    boton_anterior.innerText = "Página anterior"
    if (url_pagina_anterior != null) {
        boton_anterior.setAttribute("onclick", `consumo_api_total('${url_pagina_anterior}')`)
    } else {
        boton_anterior.setAttribute("disabled", '')
    }
    div_paginacion.appendChild(boton_anterior)

    let boton_siguiente = document.createElement("button")
    boton_siguiente.className = "btn btn-dark mx-4"
    // boton_siguiente.classList.add("btn", "btn-dark")
    boton_siguiente.innerText = "Siguiente página"
    if (url_pagina_siguiente != null) {
        boton_siguiente.setAttribute("onclick", `consumo_api_total('${url_pagina_siguiente}')`)
    } else {
        boton_siguiente.setAttribute("disabled", '')
    }
    div_paginacion.appendChild(boton_siguiente)
}

consumo_api_total("https://pokeapi.co/api/v2/pokemon/")

let btnBusqueda = document.querySelector("#btn-busqueda-api")
btnBusqueda.addEventListener("click", () =>{
    let busqueda = document.querySelector("#busqueda").value
    consumo_api_total("https://pokeapi.co/api/v2/pokemon/?${data_api2.name}=" + busqueda)
})