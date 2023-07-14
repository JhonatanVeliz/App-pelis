const btnsOpenModal = document.querySelectorAll('.btn-perfil');
const modal = $('.modal-login');

import { modalToggler } from "./modules/modal-and-utils.js";
import { $ } from "./modules/modal-and-utils.js";

btnsOpenModal.forEach((btn) => {
    btn.addEventListener('click', () => modalToggler(modal));
})

// DOM ELEMENTS
const userName = $('#name');
const userPhoto = $('#logo-perfil');

const perfilImg = $('#perfil-img');
const perfilName = $('#perfil-name');

const btnAceptar = $('#btn-login');

// LOGICA DEL LOGIN
// LOGIN GET IMG
function uploadImgPerfil() {

    const optionsImg = ['image/jpeg', 'image/png'];

    const input = userPhoto.files[0];

    if (optionsImg.includes(input.type)) {

        const reader = new FileReader();
        reader.addEventListener('load', getSrcImg)

        reader.readAsDataURL(input);
    }
}

function getSrcImg(e) {
    perfilImg.src = e.target.result;
}

function uploadNamePerfil(newName) {
    perfilName.innerText = newName;
}

btnAceptar.addEventListener('click', ()=>{

    const userNameValue = userName.value;

    if(userNameValue.length == 2){
        uploadImgPerfil();
        uploadNamePerfil(userNameValue);
        modalToggler(modal);
        return;
    }
    alert('Cantidad invalida');
});