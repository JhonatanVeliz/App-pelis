export const modalToggler = (modal) => {
    modal.classList.toggle('modal-active');
};
export const $ = (nodo, documento = document.body) => documento.querySelector(nodo);