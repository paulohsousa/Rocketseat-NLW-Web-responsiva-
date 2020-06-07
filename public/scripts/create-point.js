function popularUfs () {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json() )
    .then(states => {
        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )
}
popularUfs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url =`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true
    fetch(url)
    .then(res => res.json() )
    .then(cities => {
        
        for (const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

    //Itens de Coleta

    //pegar todas as lis

    const itensToCollect = document.querySelectorAll(".itens-grid li")

    for (item of itensToCollect) {
        item.addEventListener("click", handleSelectedItem)
    }
    const  collectedItems = document.querySelector("input[name=items]")
    
    let selelectedItens = []

    function handleSelectedItem(event) {
        const itemLi = event.target

        //adicionar ou remover classe
        itemLi.classList.toggle("selected")

        const itemId = itemLi.dataset.id

        
        //verificar itens selecionados se sim,pegar os itens selecionados
        const alreadySelected = selelectedItens.findIndex(item => {
            const itemFound = item == itemId //retornará true or false
            return itemFound
        })
        //se selecionado

        if (alreadySelected >= 0 ) {
            //tirar da seleção
            const filteredItems = selelectedItens.filter(item => {
                const itemIsDifferent = item != itemId
                return itemIsDifferent
            })
            selelectedItens = filteredItems
        }else{
            //se não estiver selecionado,adiconar a seleção
            
            selelectedItens.push(itemId)
        }
        
            collectedItems.value = selelectedItens
    }