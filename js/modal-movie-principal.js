import { modalToggler } from "./modules/modal-and-utils.js";
import { $ } from "./modules/modal-and-utils.js";

const btnPlay = $('#video-play');
const modalTrailer = $('.modal-movies');
const btnExitModal = $('#modal-movie-exit');
const modalVideo = $('#modal-movie-principal-video');

btnPlay.addEventListener('click', () => modalToggler(modalTrailer));
btnExitModal.addEventListener('click', ()=> {
    modalVideo.pause()
    modalVideo.currentTime = 0;

    modalToggler(modalTrailer);
});