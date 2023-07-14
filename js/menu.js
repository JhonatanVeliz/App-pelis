import { $ } from "./modules/modal-and-utils.js";

const menuBtn = $('.btn--menu');
const menu = $('#nav');

function menuToggler() {
    menu.classList.toggle('nav__links-active');
}

menuBtn.addEventListener('click', menuToggler);