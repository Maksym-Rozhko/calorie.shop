$(document).ready(function() {
    $('.js-example-basic-single').select2();
});

document.addEventListener('DOMContentLoaded', () => {
    const closeModalBtns = document.querySelectorAll('.graph-modal-close');
    const graphModalOverflow = document.querySelector('.graph-modal');

    if (closeModalBtns) {
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => graphModalOverflow.click());
        });
    }
});