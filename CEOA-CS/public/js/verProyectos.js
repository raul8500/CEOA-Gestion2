// Definición de variables
const url = 'http://localhost:8081/api/lime/encuestasTablas';
const urlLIME = 'http://localhost:8081/api/lime/encuestas';
const url3 = 'http://localhost:8081/api/lime/guardarGrupos'

const contenedor = document.querySelector('tbody');
const idGrupo = document.getElementById('idGrupo');
const nombreGrupo = document.getElementById('nombreGrupo');
const formArticulo = document.getElementById('tbodyModal');


const formTablaBien = document.getElementById('tbody1')
const myModalEl = document.getElementById('exampleModal');
const modal = new mdb.Modal(myModalEl);
let resultados = '';
let resultados2 = '';
let ayuda = ''

const id2 = localStorage.getItem('id');



// Función para mostrar los resultados
const mostrar = (encuestas) => {
  encuestas.forEach((encuesta) => {
    const { sid, surveyls_title } = encuesta;
    resultados += `
      <tr>
        <td class="text-center">
          <input class="check form-check-input" type="checkbox" value=""/>
        </td>
        <td class="text-center">${sid}</td>
        <td class="text-center">${surveyls_title}</td>
      </tr>`;
  });
  formArticulo.innerHTML = resultados;
};

// Procedimiento Mostrar

fetch(urlLIME)
  .then((response) => response.json())
  .then((data) => {
    mostrar(data);
  })
  .catch((error) => console.log(error));

// Utilidad para delegar eventos
const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

function showDetails(e) {
  e.preventDefault();
  const documento = e.target.parentNode.parentNode.children[1].textContent;
  console.log(documento);
}

function leeselect() {
  const id = localStorage.getItem('id');
  const grupo = localStorage.getItem('grupo');
  idGrupo.innerHTML = id;
  nombreGrupo.innerHTML = grupo;
}

btnAsignarModal.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('.check');
  const selectedEncuestas = [];
  const id = localStorage.getItem('id');
  selectedEncuestas.push({ id });

  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      const sid = checkbox.parentNode.nextElementSibling.textContent;
      const nombre = checkbox.parentNode.nextElementSibling.nextElementSibling.textContent;
      selectedEncuestas.push({ sid,nombre });
    }
  });

  if (selectedEncuestas.length > 0) {
    guardarIDs(selectedEncuestas);
  }
});

btnAsignar.addEventListener('click', ()=>{
  const checkboxes = document.querySelectorAll('.check');

// Asignar valor a los checkboxes
 checkboxes.forEach(function(checkbox) {
 checkbox.checked = false; // true para marcar el checkbox, false para desmarcarlo
 });
})

function guardarIDs(selectedEncuestas) {
  fetch(url3, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(selectedEncuestas), // Convertir el objeto a JSON
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('jalo')
    })
    .catch((error) => console.log(error));
}


fetch(url+'/'+id2)
  .then((response) => response.json())
  .then((data) => {
    mostrar2(data);
  })
  .catch((error) => console.log(error));

const mostrar2 = (encuestas) => {
    encuestas.forEach((encuesta) => {
      if(encuesta.active == 'Y'){
        ayuda = 'Activa'
      }else{
        ayuda = 'Inactiva'
      }
      resultados2 += `<tr>
                            <td class="text-center">${encuesta.sid}</td>
                            <td class="text-center">${encuesta.surveyls_title}</td>
                            <td class="text-center">${ayuda}</td>
                            <td class="text-center">${encuesta.startdate}</td>
                            <td class="text-center"></td>
                            <td class="text-center"><a class="btnVer btn btn-primary">Ver</a></td>


                       </tr>
                    `
    });
    formTablaBien.innerHTML = resultados2;
};

  
