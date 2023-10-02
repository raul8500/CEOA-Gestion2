const url = 'http://localhost:8081/api/tareas'
const urlProyecto = 'http://localhost:8081/api/proyectos'
const urlNotas= 'http://localhost:8081/api/notas/'


const notasForm = document.getElementById('formNota')
const idTarea = localStorage.getItem('idFase1Primer');
const idProyecto = localStorage.getItem('idProyecto');
const tituloTarea = document.getElementById('tituloTarea')
const tituloProyecto = document.getElementById('tituloProyecto')
const descripcion = document.getElementById('descripcion')
const contenedor = document.getElementById('divNotas')
let resultados = ''

const mostrar = (proyectos) => {
    proyectos.forEach(proyecto => {
        tituloTarea.textContent = proyecto.nombrePrimer
        descripcion.textContent = proyecto.descripcion
    })
}

//Procedimiento Mostrar
fetch(url+'/info/'+idTarea)
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

fetch(urlProyecto+/info/+idProyecto)
    .then( response => response.json() )
    .then( data => mostrarPro(data) )
    .catch( error => console.log(error))

    const mostrarPro = (proyectos) => {
        proyectos.forEach(proyecto => {
            tituloProyecto.textContent = proyecto.nombreProyecto
        })
    }


//Procedimiento Mostrar notas
fetch(urlNotas+idTarea)
    .then( response => response.json() )
    .then( data => mostrarNotas(data) )
    .catch( error => console.log(error))

    const mostrarNotas = (notas) => {
        notas.forEach(nota => {
            resultados += `<div style="margin-bottom: 10pt;">
                                <i class="fa fa-user" aria-hidden="true"></i>
                                <label style="font-size:13pt;  color: blue;">${nota.userName}</label>
                                <br>
                                <label style="padding-left: 20px;">${nota.nota}</label>
                            </div>
                    `
        })
        contenedor.innerHTML = resultados
    }

//Procedimiento para Crear y Editar
btnEnviar.addEventListener('click', ()=>{
    if(validaciones()){
        fetch(urlNotas+'crear', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                idPrimer_:idTarea,
                nota_:notasForm.value
            })
        })
        .then( response => response.json() )
        setTimeout(function() {
            location.reload()
        }, 1000);

    }else{
        //ayuda
    }
})

function validaciones() {
    var notasForm = document.getElementById("formNota").value;
    if (notasForm.trim().length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error al enviar',
            text: 'El campo de notas no puede estar vacío',
        });
        return false;
    }
    return true;
}




