
//Definición de variables
const url = 'http://localhost:8081/api/accesos/'
const contenedor = document.querySelector('tbody')
const myModalEl = document.getElementById('exampleModal')
const modal = new mdb.Modal(myModalEl)
const formArticulo = document.querySelector('form')
const name = document.getElementById('name')
const lastname = document.getElementById('lastname')
const email = document.getElementById('email')
const radioAdmin = document.getElementById('typeAdmin')
const radioInte = document.getElementById('typeInte')
const user = document.getElementById('user')
const pass = document.getElementById('pass')

let resultados = ''
let rol = 0
let varRol = 0
var opcion = ''
var rolText = ''
let idForm = 0

//para limpiar los campos de crear
btnCrear.addEventListener('click', ()=>{
    name.value = ''
    lastname.value = ''
    email.value = ''
    radioAdmin.checked = false
    radioInte.checked = false
    user.value = ''
    pass.value = ''
    opcion = 'crear'
})

//Funcion mostrar
const mostrar = (usuarios) => {

    usuarios.forEach(usuario => {
        if(usuario.rol_ == 1){
            rolText = 'Administrador'
        }else{
            rolText = 'Integrante'
        }
        resultados += `<tr>
                            <td class="text-center">${usuario.id}</td>
                            <td class="text-center">${usuario.names_}</td>
                            <td class="text-center">${usuario.lastnames_}</td>
                            <td class="text-center">${usuario.email_}</td>
                            <td class="text-center">${rolText}</td>
                            <td class="text-center">${usuario.user_}</td>
                            <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
                       </tr>
                    `
    })
    contenedor.innerHTML = resultados
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

//Procedimiento Borrar
on(document, 'click', '.btnBorrar', async e => {
    //try{
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML

    Swal.fire({
        title: 'Seguro que deseas eliminarlo',
        showDenyButton: true,
        confirmButtonText: 'Eliminar',
        denyButtonText: 'No eliminar',

    }).then((result) => {

        if (result.isConfirmed) {

            fetch(url+id, {
                method: 'DELETE'
            })
            .then( res => res.json() )

            Swal.fire({
                icon: 'success',
                title: 'Eliminado Correctamente',
                showConfirmButton: false,
                timer: 2500
            })
            setTimeout(function() {
                location.reload()
            }, 2000);

        } else if (result.isDenied) {
            Swal.fire({
                icon: 'info',
                title: 'Datos no eliminados',
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
})

//Procedimiento Editar
on(document, 'click', '.btnEditar', e => {    
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML

    const nombreForm = fila.children[1].innerHTML
    const apellidosForm = fila.children[2].innerHTML
    const emailForm = fila.children[3].innerHTML
    const rolForm = fila.children[4].innerHTML
    const usuarioForm = fila.children[5].innerHTML
    const passForm = fila.children[6].innerHTML

    name.value = nombreForm
    lastname.value = apellidosForm
    email.value = emailForm

    if (rolForm == "Administrador"){
        varRol = 1;
        radioInte.checked = false
        radioAdmin.checked = true
    }else{
        varRol = 0;
        radioAdmin.checked = false
        radioInte.checked = true
    }
    user.value = usuarioForm
    pass.disabled  = true
    opcion = 'editar' 
    console.log(rolForm)
    modal.show()
})

//Procedimiento para Crear y Editar
formArticulo.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(validaciones()){
        if(opcion=='crear'){   
            if(radioAdmin.checked){
                rol= 1
            }else{
                rol = 0
            }
            //console.log('OPCION CREAR')
            fetch(url+'crear', {
                method:'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name:name.value,
                    lastname:lastname.value,
                    email:email.value,
                    rol:rol,
                    user:user.value,
                    pass:pass.value
                })
            })
            .then( response => response.json() )
            .then( data => {
                const nuevoUsuario = []
                nuevoUsuario.push(data)
                mostrar(nuevoUsuario)
            })

            Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            showConfirmButton: false,
            timer: 1500
            })

        }

        if(opcion=='editar'){    
        //console.log('OPCION EDITAR')
            if(radioAdmin.checked){
                rol= 1
            }else{
                rol = 0
            }
            fetch(url+'editar/' +idForm,{
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name:name.value,
                    lastname:lastname.value,
                    email:email.value,
                    rol:rol,
                    user:user.value,
                })
            })
            .then( response => response.json() )

            Swal.fire({
            icon: 'success',
            title: 'Edicion exitosa',
            showConfirmButton: false,
            timer: 1500
            })

            setTimeout(function() {
                location.reload()
              }, 2000);

        }
        modal.hide()
    }else{
        //ayuda
    }
})

//Validaciones para crear
function validaciones() {
    var name = document.getElementById("name").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    var forbiddenChars = /[^a-zA-Z0-9]/; // Expresión regular para detectar caracteres especiales, excluyendo letras y números
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el formato del correo electrónico

    if (name.length == 0 || lastname.length == 0 || email.length == 0 || user.length == 0 || pass.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: 'No puedes dejar campos vacíos',
        });
        return false;
    } else if (forbiddenChars.test(name) || forbiddenChars.test(lastname) || forbiddenChars.test(user) || forbiddenChars.test(pass)) {
        Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: 'No se permiten caracteres especiales en los campos',
        });
        return false; // Si alguno de los campos contiene caracteres especiales, retorna false
    } else if (!emailRegex.test(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: 'El formato del correo electrónico no es válido',
        });
        return false; // Si el formato del correo electrónico es inválido, retorna false
    } else {
        if (!radioAdmin.checked && !radioInte.checked) {
            return false;
        } else {
            return true;
        }
    }
}