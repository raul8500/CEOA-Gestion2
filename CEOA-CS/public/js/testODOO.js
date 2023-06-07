const url = 'http://localhost:8081/api/tareas/'
const test = document.getElementById('divInfo')
var resultados = ''
const nombreTareaPrimer = document.getElementById('nombreTareaPrimer')
const formPrimer = document.getElementById('formPrimerAcercamiento')
const idProyecto = localStorage.getItem('idProyecto');


const mostrar = (tareas) => {
    tareas.forEach(tarea => {
        resultados += `<button id='${tarea.idPrimer}' type="button" class="btnTareaPrimer btn btn-info text-center col-sm-12 text-white">
                            <span>${tarea.nombrePrimer}</span>
                        </button>
                        `
    })
    test.innerHTML = resultados
}

//Procedimiento Mostrar
fetch(url+idProyecto)
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

boton1.addEventListener('click', ()=>{
    nombreTareaPrimer.value = ''
})

formPrimer.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(validaciones()){
        //console.log('OPCION CREAR')
        fetch(url+'crear', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                idPro_: idProyecto,
                nombrePrimer_: nombreTareaPrimer.value
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
        
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: 'No puedes dejar campos vacios',
        })
    }
})

function validaciones() {
    const nombreTareaPrimerValue = nombreTareaPrimer.value.trim(); // Eliminar espacios en blanco al inicio y al final

    if (nombreTareaPrimerValue.length === 0) {
        return false;
    } else {
        // Validar caracteres permitidos en el campo nombreProyecto
        const regex = /^[a-zA-Z0-9\s]+$/; // Expresión regular para permitir letras, números y espacios
        if (!regex.test(nombreTareaPrimerValue)) {
            return false;
        }

        return true;
    }
}

const botones = document.querySelectorAll('.btnTareaPrimer');
botones.forEach((boton) => {
  boton.addEventListener('click', obtenerPropiedades);
});

function obtenerPropiedades(event) {
  const boton = event.target;
  // Obtener el contenido del botón
  const contenido = boton.innerHTML;
  // Verificar si el contenido coincide con el botón específico
  if (contenido === 'Botón Específico') {
    // Realizar las operaciones deseadas para el botón específico
    console.log('Propiedades del botón específico:');
    console.log('Contenido:', contenido);
    console.log('ID:', boton.id);
    console.log('Atributos adicionales:', boton.getAttribute('data-custom'));
  }
}



  


