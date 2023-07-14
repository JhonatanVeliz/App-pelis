import { $ } from "./modules/modal-and-utils.js";

const menuBtn = $('.btn--menu');
const menu = $('#nav');
console.log(menu);

function menuToggler() {
    menu.classList.toggle('nav__links-active');
}

menuBtn.addEventListener('click', menuToggler);