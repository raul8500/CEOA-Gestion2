
//Definición de variables
const url = 'http://localhost:8081/api/grupos/'
const urlLIME = 'http://localhost:8081/api/lime/encuestas'
const contenedor = document.querySelector('tbody')
const idGrupo = document.getElementById('idGrupo')
const nombreGrupo = document.getElementById('nombreGrupo')
let resultados = ''


function leeselect(){
    const id = localStorage.getItem("id")
    const grupo = localStorage.getItem("grupo")
    idGrupo.innerHTML = id
    nombreGrupo.innerHTML = grupo
}

const formArticulo = document.getElementById('hola')
const myModalEl = document.getElementById('exampleModal')
const modal = new mdb.Modal(myModalEl)


btnAsignar.addEventListener('click', ()=>{
    const checkboxes = document.querySelectorAll('.check');

  // Asignar valor a los checkboxes
   checkboxes.forEach(function(checkbox) {
    checkbox.checked = false; // true para marcar el checkbox, false para desmarcarlo
   });
})


//funcion para mostrar los resultados

const mostrar = (encuestas) => {
    encuestas.result.forEach(encuesta => {
      resultados += `<tr>
        <td class="text-center"> <input class="check form-check-input" type="checkbox" value=""/></td>
        <td class="text-center">${encuesta.sid}</td>
        <td class="text-center">${encuesta.surveyls_title}</td>
      </tr>`;
    });
    formArticulo.innerHTML = resultados;
  };

//Procedimiento Mostrar
fetch(urlLIME)
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