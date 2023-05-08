
//Definición de variables
const url = 'http://localhost:8081/api/perfil/'
const contenedor = document.querySelector('tbody')
let resultados = ''
let opcion = 'actualizar'


const formArticulo = document.querySelector('form')
const myModalEl = document.getElementById('exampleModal')
const modal = new mdb.Modal(myModalEl)

//Forms from EJS
const nameForm = document.getElementById('firstName')
const lastNameForm = document.getElementById('lastName')
const emailForm = document.getElementById('email')
const userForm = document.getElementById('username')

const passForm = document.getElementById('password-input')


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


on(document, 'click', '.btnGuardar', async e => {
    e.preventDefault()
    if (passForm.value.length == 0){
        Swal.fire({
            icon: 'error',
            title: 'Error al actualizar',
            text: 'No puedes dejar campos vacios',
        })
    }else{
        fetch(url+'actualizarPass/',{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                pass:passForm.value,
            })
        })
        .then( response => response.json())

        Swal.fire({
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })

        setTimeout(function() {
            location.reload()
        }, 2000);
    }
})

//Editar
formArticulo.addEventListener('submit', (e)=>{
    e.preventDefault()
    if (validaciones() == true){
        Swal.fire({
            title: '¿Quieres guardar los cambios?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            denyButtonText: `Descartar`,
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                fetch(url+'actualizar/',{
                    method: 'PUT',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        name:nameForm.value,
                        lastname:lastNameForm.value,
                        email:emailForm.value,
                        user:userForm.value,
                    })
                })
                .then( response => response.json() )
                Swal.fire('Actualizado correctamente')
                setTimeout(function() {
                    location.reload()
                    }, 2000);
    
            } else if (result.isDenied) {
                Swal.fire('Cambios descartados')
            }
            })
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error al actualizar',
            text: 'No puedes dejar campos vacios',
        })
        setTimeout(function() {
            location.reload()
            }, 1500);
    }

})

function validaciones(){
    if(nameForm.value.length == 0 || lastNameForm.value.length == 0 || emailForm.value.length == 0 || userForm.value.length == 0){
        return false
    }else{
        return true
    }
}



