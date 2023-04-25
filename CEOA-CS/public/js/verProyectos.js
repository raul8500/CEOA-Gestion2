
//Definición de variables
const url = 'http://localhost:8081/api/grupos/'
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