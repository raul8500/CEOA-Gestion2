
//Definición de variables
const url = 'http://localhost:8081/api/grupos/'
const contenedor = document.querySelector('tbody')
let resultados = ''


//variables
const formGroup = document.querySelector('form')
const nameGroups = document.getElementById('nameGroupp')
const idd = document.getElementById('idGrupo')
var date = ''
var d = ''
var dateF= 'ayuda'
//Modal
const myModalEl = document.getElementById('exampleModal')
const modal = new mdb.Modal(myModalEl)


//Variables de creacion
var noProyect_ = 0
var state_ = 1
var dateI_ = 'CURRENT_DATE()'
var dateF_ = null

//Crear boton
btnCrear.addEventListener('click', ()=>{
    nameGroups.value = ''
    opcion = 'crear'
})

const mostrar = (grupos) => {
    grupos.forEach(grupo => {

        d = new Date(grupo.date_I);
        console.log(d.getMonth())
        date = d.getDate()+'/'+ (d.getMonth()+1)+'/'+d.getFullYear()

        if (grupo.dateF == null){
            dateF = 'N/A'
        }else{
            dateF = grupo.date_F
        }
        resultados += `<tr>
                            <td class="text-center">${grupo.id}</td>
                            <td class="text-center">${grupo.nameGroup_}</td>
                            <td class="text-center">${grupo.noProyect_}</td>
                            <td class="text-center">${grupo.state_}</td>
                            <td class="text-center">${date}</td>
                            <td class="text-center">${dateF}</td>
                            <td class="text-center">
                                <a class="verGrupos btn btn-primary">Ver</a>
                                <a class="btnEditar btn btn-secondary">Editar</a>
                                <a class="btnAsignar btn btn-info ">Asignar</a>
                            </td>
                       </tr>
                    `
    })
    contenedor.innerHTML = resultados
}

//Procedimiento Mostrar
fetch(url)
    .then( response => response.json())
    .then( data => mostrar(data) )
    .catch( error => console.log(error))

    const on = (element, event, selector, handler) => {
        //console.log(element)
        //console.log(event)
        //console.log(selector)
        //console.log(handler)
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


on(document, 'click', '.verGrupos', e => {  
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    nombreGrupo = fila.children[1].innerHTML
    localStorage.setItem("id", idForm);
    localStorage.setItem("grupo", nombreGrupo);
    location.href ='/verGrupos';
})

formGroup.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(nameGroups.value.length != 0){
        if(opcion=='crear'){   
            //console.log('OPCION CREAR')
            fetch(url+'crear', {
                method:'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    nameGroup:nameGroups.value,
                    
                })
            })

            Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            showConfirmButton: false,
            timer: 1500
            })
            modal.hide()

            setTimeout(function() {
                location.reload()
              }, 1500);
        }
        if(opcion=='ver'){
            localStorage.setItem("myCat", "Tom");
        }
        /*
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
            .then( response => location.reload() )

              }
            Swal.fire({
            icon: 'success',
            title: 'Edicion exitosa',
            showConfirmButton: false,
            timer: 1500
            })*/
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: 'No puedes dejar campos vacios',
        })
    }
})








