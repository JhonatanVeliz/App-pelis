// const $ = (nodo, thisDocument = document.body) => thisDocument.querySelector(nodo);
const gridCarousels = document.querySelectorAll('.carousel__list');

function main(){

    // let acomulador = 1;

    gridCarousels.forEach( (carousel, index) => {

        if(window.screen.width <= 400){
            new Glider(carousel,{
                slidesToShow: 2,
                slidesToScroll: 1,
                draggable: false,
                dots: false,
                arrows: {
                    prev: `#btn--left-${index + 1}`,
                    next: `#btn--right-${index + 1}`,
                },
            })
        }else{
            new Glider(carousel,{
                slidesToShow: 6,
                slidesToScroll: 1,
                draggable: false,
                dots: false,
                arrows: {
                    prev: `#btn--left-${index + 1}`,
                    next: `#btn--right-${index + 1}`,
                },
            })
        };
    })

}
window.addEventListener('load', main);