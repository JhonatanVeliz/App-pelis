import { modalToggler, $ } from "./modules/modal-and-utils.js";

const btnsOpenModal = document.querySelectorAll('.btn-perfil');
const modal = $('.modal-login');
const modalAlerts = $('#modal-alerts');
const modalAlertsTitle = $('#modal-alerts-title');

// DOM ELEMENTS
const userName = $('#name');
let userPhoto = $('#logo-perfil');
userPhoto.value = '';

const perfilImg = $('#perfil-img');
const perfilName = $('#perfil-name');

const btnAceptar = $('#btn-login');
const btnRetirarModal = $('.btn-modal-alerts');

// LOGICA DEL LOGIN
// LOGIN GET IMG
function uploadImgPerfil() {

    if(userPhoto.value == ''){
        return;
    }

    const optionsImg = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/tiff', 'image/svg+xml'];
    const input = userPhoto.files[0];

    if (optionsImg.includes(input.type)) {
        const reader = new FileReader();
        reader.addEventListener('load', getSrcImg)
        reader.readAsDataURL(input);
    }
}

function getSrcImg(e) {
    const targetResult = e.target.result;
    perfilImg.src = targetResult;
    localStorage.setItem('perfilSrc', targetResult);
}

function uploadNamePerfil(newName) {
    const userName = perfilName.innerText = newName;
    localStorage.setItem('perfilName', userName);
}

function getDatosUser() {
    const src = localStorage.getItem('perfilSrc');
    const name = localStorage.getItem('perfilName');

    if(src){
        perfilImg.src = src;
        perfilName.innerText = name;
    } else{return};
}

// CARGA LOS DATOS DEL USUARIO EN LOCALSTORAGE
getDatosUser();

btnsOpenModal.forEach((btn) => {
    btn.addEventListener('click', () => modalToggler(modal));
})

btnAceptar.addEventListener('click', () => {

    const userNameValue = userName.value;

    if (userNameValue.length == 2) {
        uploadImgPerfil();
        uploadNamePerfil(userNameValue);
        modalToggler(modal);
        return;
    }
    modalAlertsTitle.textContent = '¡Ups! Parece que faltan algunos datos...';
    modalToggler(modalAlerts);
});
btnRetirarModal.addEventListener('click', ()=> modalToggler(modalAlerts));