const url = 'http://localhost:8081/api/tareas/'
const test = document.getElementById('divInfo')
const fase2 = document.getElementById('divFase2')
var resultados = ''
var resultadosOficio = ''
const nombreTareaPrimer = document.getElementById('nombreTareaPrimer')
const formPrimer = document.getElementById('formPrimerAcercamiento')
const idProyecto = localStorage.getItem('idProyecto');




//Funciones para Fase 1
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
btnPrimerAcercamiento.addEventListener('click', ()=>{
    nombreTareaPrimer.value = ''
})

//Agregar
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
//Validaciones generales
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

on(document, 'click', '.btnTareaPrimer', e => {
    const boton = e.target.closest('button');
    if (boton) {
      const idBoton = boton.id;
      localStorage.setItem("idFase1Primer",idBoton);
      location.href ='/primerAcercamiento';
    }
});
  
  
  






  


