const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");


toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
})


modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Light mode";
    }else{
        modeText.innerText = "Dark mode";
        
    }
});


function mueveReloj(){

    
    var today = new Date();
    var now = today.toLocaleTimeString('en-US');
    document.form_reloj.reloj.value = now

    const fecha = new Date();
    const opciones = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    document.form_fecha.fecha.value = fecha.toLocaleDateString('es-MX',opciones);

    setTimeout("mueveReloj()",1000)
}