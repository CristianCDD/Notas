const addBox = document.querySelector(".add-box");
const popuBox = document.querySelector(".popup-box");
const popupTitle = document.querySelector("header p");
const closeIcon =   document.querySelector(".uil.uil-times");
const titleTag =  document.querySelector("input");
const descTag =  document.querySelector("textarea");
const addBtn =   document.querySelector("button");
const wrapper =   document.querySelector("wrapper");


const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
let notes = [];

if (localStorage.getItem("notes")) {
  notes = JSON.parse(localStorage.getItem("notes"));
}
let isUpdate = false, updateId;



addBox.addEventListener('click', (e)=>{
    titleTag.focus();
    popuBox.classList.add("show");
   
});

closeIcon.addEventListener('click', (e)=>{
    updateId = false;
    popuBox.classList.remove("show");
    titleTag.value = '';
    descTag.value = '';
    addBtn.innerText = 'Agregar nota';
    popupTitle.innerText = 'Agregar una nueva nota'

});


function showNotes(){
    document.querySelectorAll(".note").forEach(note => note.remove());

        notes.forEach((note, index)=>{
            let liTag = `<li class="note">
            <div class="details">
                <p>${note.title}</p>
                <span>${note.description}</span>
            </div>
    
            <div class="bottom-content">
                <span>${note.date}</span>
                <div class="settings">
                    <i onclick = "showMenu(this)" class="uil uil-ellipsis-h"></i>
                    <ul class="menu">
                        <li onclick = "updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil-pen"></i>Edit</li>
                        <li  onclick = "deleteNote(${index})"><i class="uil-trash"></i>Delete</li>
                    </ul>
                </div>
            </div>
        </li>`;
    
        addBox.insertAdjacentHTML('afterend',liTag);
    
        })
   

    
}

showNotes();


function showMenu(elem) {
   elem.parentElement.classList.add("show");


   document.addEventListener('click', (e)=>{
    if(e.target.tagName != "I" || e.target != elem){

        elem.parentElement.classList.remove("show");

    }
   })
   
    
}



const deleteNote = async function (id) {

    const respuesta = await Swal.fire({
        title: '¿Desea eliminar?',
        text: "Una vez eliminado no se podra recuperar",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar'
    });

    if (respuesta.isConfirmed) {


        notes.splice(id, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
        Swal.fire('Nota eliminada', 'Eliminacion exitosa', 'info');

    }

}





function updateNote(id, title, descr ) {
    isUpdate = true;
    addBox.click();
    addBtn.innerText = 'Actualizar nota';
    popupTitle.innerText = 'Actualizando nota'
    updateId = id;
    titleTag.value = title;
    descTag.value = descr;
}


addBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    let noteTitle = titleTag.value;
    let noteDesc = descTag.value;

   if(noteTitle || noteDesc){
    let dateObj = new Date();

    month = dateObj.getMonth();
    day = dateObj.getDate();
    year = dateObj.getFullYear();

    let noteInfo = {
        title: noteTitle,
        description: noteDesc,
        date:  `${months[month]} ${day}, ${year}`
    }

    if(isUpdate == false){
    notes.push(noteInfo);
    }else{
         isUpdate = false;
        notes[updateId] = noteInfo;
        console.log(noteInfo);
    }

    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click();
    showNotes();

    

   }
});

