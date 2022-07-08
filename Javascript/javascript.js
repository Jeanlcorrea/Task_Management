const KEY_BD = '@usuariosestudo'

var listaregistros = {
    ultimoIdGerado:0,
    usuarios:[]
}

function gravarBD(){
    localStorage.setItem(KEY_BD, JSON.stringify(listaregistros) )
}


function lerBD(){
    const data = localStorage.getItem(KEY_BD)
    if (data){
        listaregistros = JSON.parse(data)
    }
    desenhar()
}

function desenhar(){
    const tbody = document.getElementById('listaRegistrosBody')
    if (tbody){
        tbody.innerHTML = listaregistros.usuarios
        .sort ( (a,b) => {
            return a.nome < b.nome ? -1 : 1
        })
        .map( usuario => {
            return `<tr>
                <td>${usuario.id}</td>
                <td>${usuario.nome}</td>
                <td>${usuario.datainicio}</td>
                <td>${usuario.datafim}</td>
                <td>${usuario.atrasado}</td>
                <td>
                    <button id="ferramentas"  onclick = 'visualizar("cadastro", false, ${usuario.id} )'>EDITAR</button>
                    <button  class='vermelho' onclick='perguntarSeDeleta(${usuario.id})' >DELETAR</button>
                    <button  onclick='visualizar("projeto")' class= 'acessarprojeto'>ACESSAR PROJETO</button>
                </td>
            </tr>`
        }).join ('')
    }
}


function insertUsuario(nome, datainicio, datafim){
    const id = listaregistros.ultimoIdGerado + 1;
    listaregistros.ultimoIdGerado =id;
    listaregistros.usuarios.push({
        id, nome, datainicio, datafim
    })
    gravarBD()
    desenhar()
    visualizar('lista')
}
function editUsuario (id, nome, datainicio, datafim, atrasado){
    var usuario = listaregistros.usuarios.find ( usuario => usuario.id == id)
    usuario.nome = nome;
    usuario.datainicio = datainicio;
    usuario.datafim = datafim;
    usuario.atrasado = atrasado;
    gravarBD()
    desenhar()
    visualizar('lista')
}
function deleteUsuario(id){
    listaregistros.usuarios = listaregistros.usuarios.filter( usuario => {
        return usuario.id != id
    } )
    gravarBD()
    desenhar()
}

function perguntarSeDeleta(id){
    if(confirm('Quer deletar o registro de id '+id)){
        deleteUsuario(id)
    }
}

function limparEdicao(){
    document.getElementById('nome').value = ''
    document.getElementById('datainicio').value = ''
    document.getElementById('datafim').value = ''
}

function visualizar (pagina, novo = false, id=null){
    document.body.setAttribute('page', pagina)
    if(pagina === 'cadastro')
    if(pagina === 'projeto') 
    if(novo) limparEdicao()
    if (id){
        const usuario = listaregistros.usuarios.find( usuario => usuario.id == id)
        if (usuario){
            document.getElementById('id').value = usuario.id
            document.getElementById('datainicio').value = usuario.datainicio
            document.getElementById('datafim').value = usuario.datafim
        }
    }
    document.getElementById('nome').focus()
}

function submeter(e){
    e.preventDefault()
    const data = {
        id: document.getElementById('id').value,
        nome: document.getElementById('nome').value,
        datainicio: document.getElementById('datainicio').value,
        datafim: document.getElementById('datafim').value,
}
    if (data.id){
        editUsuario(data.id, data.nome, data.datainicio, data.datafim)
    }else{
        insertUsuario (data.nome, data.datainicio, data.datafim)
    }
}

window.addEventListener ('load', () => {
    lerBD()
    document.getElementById('cadastro-registros').addEventListener('submit', submeter)
})