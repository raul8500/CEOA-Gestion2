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


const exampleModal = document.getElementById('exampleModal');
exampleModal.addEventListener('show.mdb.modal', (e) => {
  // Button that triggered the modal
  const button = e.relatedTarget;
  // Extract info from data-mdb-* attributes
  const recipient = button.getAttribute('data-mdb-whatever');
  // If necessary, you could initiate an AJAX request here
  // and then do the updating in a callback.
  //
  // Update the modal's content.
  const modalTitle = exampleModal.querySelector('.modal-title');
  const modalBodyInput = exampleModal.querySelector('.modal-body input');

  modalTitle.textContent = `New message to ${recipient}`;
  modalBodyInput.value = recipient;
})