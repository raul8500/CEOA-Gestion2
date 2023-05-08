
//Definición de variables
const url = 'http://localhost:8081/api/perfil/'
const contenedor = document.querySelector('tbody')
let resultados = ''


const formArticulo = document.querySelector('form')
const myModalEl = document.getElementById('exampleModal')
const modal = new mdb.Modal(myModalEl)

//Forms from EJS
const nameForm = document.getElementById('firstName')
const lastNameForm = document.getElementById('lastName')
const emailForm = document.getElementById('email')
const userForm = document.getElementById('username')


//funcion para mostrar los resultados

const mostrar = (usuarios) => {
    usuarios.forEach(usuario => {
        nameForm.value = usuario.names_
        lastNameForm.value = usuario.lastnames_
        emailForm.value = usuario.email_
        userForm.value = usuario.user_
    })
}

//Procedimiento Mostrar
fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .catch( error => console.log(error))
    const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
} 

function showDetails(e){
    e.preventDefault();
    const documento = e.target.parentNode.parentNode.children[1].textContent;
    console.log(documento)
}


