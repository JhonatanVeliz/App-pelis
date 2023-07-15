import { $ } from "./modules/modal-and-utils.js";
import { modalToggler } from "./modules/modal-and-utils.js";

// CONTENEDOR DE LA DATA
let MOVIESDATA = [];
let arrayURLImg = [];
const API_KEY = 'e75b92cd8bd575c0bf29ae061006d03c';

setTimeout(() => {
    // DOM ELEMENTS
    const carouselItems = document.querySelectorAll('.glider-track');
    async function getMovies(movie = 'popular', language = 'es-ES') {


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
        arrayURLImg.forEach((img, index) => {
            crearImg(img, MOVIESDATA[index].id, 0);
        });

        function crearImg(img, id, index) {

            const movieHTML = `
                <img src="https://image.tmdb.org/t/p/w500/${img}" alt="pelicula" class="carousel__img" id="${id}">
            `;

            carouselItems[index].insertAdjacentHTML('afterbegin', movieHTML);
        }

        const gridImgCarousel = document.querySelectorAll('.carousel__img');
        gridImgCarousel.forEach((img, index) => {
            img.addEventListener('click', (e) => pasarInfoModal(e.target.id, e.target.src, index));
        })

        // API PARA LAS SERIES
        async function obtenerSeriesPopulares() {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=${language}`);
                if (response.status != 200) {
                    throw new Error('No se pudo obtener la lista de series populares');
                }
                const data = await response.json();
                const seriesPopulares = data.results;
                // Hacer algo con la lista de series populares
                seriesPopulares.forEach((serieData)=>{
                    const {id, poster_path, name} = serieData;

                    crearImg(poster_path, id, 1);
                })
            } catch (error) {
                console.error(error);
            }
        }

        obtenerSeriesPopulares();
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
