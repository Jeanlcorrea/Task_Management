const KEY_BANCO = '@projetoestudo'

var projetoregistro = {
    ultimoIDgerado:0,
    projetos:[]
}

function gravarBANCO () {
    localStorage.setItem(KEY_BANCO, JSON.stringify(projetoregistro))
}

function lerBANCO() {
    const dataa = localStorage.getItem(KEY_BANCO)
    if(dataa) {
        projetoregistro = JSON.parse(dataa)
    }
    desenha()
}

function desenha() {
    const tfoot = document.getElementById('listaProjetosBody')
    if (tfoot) {
        tfoot.innerHTML = projetoregistro.projetos
        .map( projeto => {
            return `<tr>
                        <td>${projeto.idprojeto}</td>
                        <td>${projeto.idatividade}</td>
                        <td>${projeto.nomeatividade}</td>
                        <td>${projeto.datadeinicio}</td>
                        <td>${projeto.datadefim}</td>
                        <td>${projeto.checkbox}</td>
                        <td>
                            <button>EDITAR</button>
                            <button class='vermelho'>DELETAR</button>
                        </td>
                    </tr>`
        } ).join('')
    }
}


function insertUser (idatividade, nomeatividade, datadeinicio, datadefim, checkbox) {
    const idprojeto = projetoregistro.ultimoIDgerado + 1;
    projetoregistro.projetos.push( {
        idprojeto, idatividade, nomeatividade, datadeinicio, datadefim, checkbox
    })
    gravarBANCO()
    desenha()
}



function submet(f) {
    f.preventDefault()
    const dataa = {
        idprojeto: document.getElementById('idprojeto').value,
        idatividade: document.getElementById('idatividade').value,
        nomeatividade: document.getElementById('nomeatividade').value,
        datadeinicio: document.getElementById('datadeinicio').value,
        datadefim: document.getElementById('datadefim').value,
        checkbox: document.getElementById('checkbox').value,
        
    }
    insertUser(dataa.idatividade, dataa.nomeatividade, dataa.datadeinicio, dataa.datadefim, dataa.checkbox )
}

window.addEventListener('load', () => {
    lerBANCO()
    document.getElementById('novoprojeto').addEventListener('submit', submet)
})
