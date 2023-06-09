const url = 'http://localhost:8081/api/tareas'
const urlProyecto = 'http://localhost:8081/api/proyectos'
const idTarea = localStorage.getItem('idFase1Primer');
const idProyecto = localStorage.getItem('idProyecto');
const tituloTarea = document.getElementById('tituloTarea')
const tituloProyecto = document.getElementById('tituloProyecto')
const descripcion = document.getElementById('descripcion')

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