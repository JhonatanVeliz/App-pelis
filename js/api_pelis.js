import { $ } from "./modules/modal-and-utils.js";
import { modalToggler } from "./modules/modal-and-utils.js";

// CONTENEDOR DE LA DATA
let MOVIESDATA = [];
let arrayURLImg = [];

setTimeout(() => {
    // DOM ELEMENTS
    const carouselItems = $('.glider-track');
    async function getMovies(movie = 'popular', language = 'es-ES') {

        const API_KEY = 'e75b92cd8bd575c0bf29ae061006d03c';

        try {
            const resp = await fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=${API_KEY}&language=${language}`);

            if (resp.status === 200) {
                const data = await resp.json();
                data.results.forEach((movieData) => {

                    const { id, title, overview, poster_path, release_date, vote_average, vote_count } = movieData;

                    arrayURLImg.push(poster_path);
                    MOVIESDATA.push({ id, title, overview, poster_path, release_date, vote_average, vote_count });

                });

            } else if (resp.status === 401) {
                console.log('Error en la KEY');

            } else if (resp.status === 404) {
                console.log('Pelicula no encontrada...');

            } else {
                console.log('error');
            }

        } catch (error) {
            return console.log('Error al solicitar la API' + error);
        }

        arrayURLImg.reverse();
        arrayURLImg.forEach((img, index)=>{
            crearImg(img, MOVIESDATA[index].id);
        });

        function crearImg(img, id) {

            const movieHTML = `
                <img src="https://image.tmdb.org/t/p/w500/${img}" alt="pelicula" class="carousel__img" id="${id}">
            `;

            carouselItems.insertAdjacentHTML('afterbegin', movieHTML);
        }

        const gridImgCarousel = document.querySelectorAll('.carousel__img');
        gridImgCarousel.forEach((img, index) => {
            img.addEventListener('click', (e) => pasarInfoModal(e.target.id, e.target.src, index));
        })
    }
    getMovies();

}, 1500)

// DOM ELEMENTS
const btnLike = $('.btn-heart');
const btnCerrar = $('#cerrar-modal-info');
const modalInfo = $('#modal-info');

// DOM ELEMENTS DEL MODAL
const imgModal = $('.img-movies');
const titleModal = $('.modal-title');
const paragraphModal = $('.modal-paragraph');

function addFavoriteMovie() {
    btnLike.classList.toggle('btn-heart-active');
}

function pasarInfoModal(id, src, index) {
    imgModal.src = src;
    imgModal.data = id;
    titleModal.innerText = MOVIESDATA[index].title;
    paragraphModal.innerText = MOVIESDATA[index].overview;
    modalToggler(modalInfo);
}

btnLike.addEventListener('click', () => addFavoriteMovie());
btnCerrar.addEventListener('click', () => modalToggler(modalInfo));