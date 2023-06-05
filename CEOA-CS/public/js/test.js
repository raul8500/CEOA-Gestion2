
//Definición de variables
const url = 'http://localhost:8081/api/proyectos/'
const contenedor = document.getElementById('tbodyProyectos')
let resultados = ''


const formProyecto = document.getElementById('formProyecto')
const nombreProyecto = document.getElementById('nombreProyecto')
const myModalEl = document.getElementById('exampleModal')
const modal = new mdb.Modal(myModalEl)

var opcion = ''

btnCrear.addEventListener('click', ()=>{
    nombreProyecto.value = ''
    opcion = 'crear'
})

var estado = ''
var date = ''
var d = ''
var dateF_ = ''

//funcion para mostrar los resultados

const mostrar = (proyectos) => {
    proyectos.forEach(proyecto => {
        if(proyecto.estado == 1){
            estado = 'Activo'
        }else{
            estado = 'Inactivo'
        }
        d = new Date(proyecto.fechaInicio);
        date = d.getDate()+'/'+ (d.getMonth()+1)+'/'+d.getFullYear()

        if (proyecto.fechaTermino == null){
            dateF = 'N/A'
        }else{
            dateF = proyecto.fechaTermino
        }

        resultados += `<tr>
                            <td class="text-center">${proyecto.idPro}</td>
                            <td class="text-center">${proyecto.nombreProyecto}</td>
                            <td class="text-center">${estado}</td>
                            <td class="text-center">${date}</td>
                            <td class="text-center">${dateF}</td>
                            <td class="text-center">
                                <a class="btnEditar btn btn-secondary">Ver</a>
                            </td>
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

function validaciones() {
    const nombreProyectoValue = nombreProyecto.value.trim(); // Eliminar espacios en blanco al inicio y al final

    if (nombreProyectoValue.length === 0) {
        return false;
    } else {
        // Validar caracteres permitidos en el campo nombreProyecto
        const regex = /^[a-zA-Z0-9\s]+$/; // Expresión regular para permitir letras, números y espacios
        if (!regex.test(nombreProyectoValue)) {
            return false;
        }

        return true;
    }
}


formProyecto.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(validaciones()){
        if(opcion=='crear'){   
            //console.log('OPCION CREAR')
            fetch(url+'crear', {
                method:'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    nombreProyecto_:nombreProyecto.value
                })
            })
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
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: 'No puedes dejar campos vacios',
        })
    }
})


