//Funciones Fase 2
fetch(url+'oficio/'+idProyecto)
.then( response => response.json() )
.then( data => mostrarFase2(data) )
.catch( error => console.log(error))

const mostrarFase2 = (tareas) => {
    tareas.forEach(tarea => {
        resultadosOficio += `<button id='${tarea.idOficio}' type="button" class="btnTareaOficio btn btn-info text-center col-sm-12 text-white">
                            <span>${tarea.nombreOficio}</span>
                        </button>
                        `
    })
    fase2.innerHTML = resultadosOficio
}

on(document, 'click', '.btnTareaOficio', e => {  
    const hola = e.target.parentNode.parentNode;
    const boton = hola.querySelector('button');
    localStorage.setItem("idFase2Oficio",boton.id);
    location.href ='';
})
