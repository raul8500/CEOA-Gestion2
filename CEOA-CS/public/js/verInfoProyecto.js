
//variables 
const nombreProyecto = document.getElementById('nombreEncuesta')




//Funciones
function leeselect() {
    const idEncuesta = localStorage.getItem('encuesta');
    console.log(idEncuesta)

    nombreProyecto.innerHTML = idEncuesta;
}