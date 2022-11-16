$(document).ready(function() {
    $('.js-example-basic-single').select2();

    $("#slider-range").slider({
        range: true,
        min: $('#slider-range').data('range-min'),
        max: $('#slider-range').data('range-max'),
        values: [$('#slider-range').data('range-min'), $('#slider-range').data('range-max')],
        slide: function( event, ui ) {
        $( "#amount" ).val( "" + ui.values[0] + "-" + ui.values[1]);
        }
    });
    $("#amount").val("" + $("#slider-range").slider("values", 0) +
        "-" + $("#slider-range").slider("values", 1));
});

document.addEventListener('DOMContentLoaded', () => {
    const closeModalBtns = document.querySelectorAll('.graph-modal-close');
    const graphModalOverflow = document.querySelector('.graph-modal');

    if (closeModalBtns) {
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => graphModalOverflow.click());
        });
    }

    const shopFilterTrigger = document.querySelector('.filter .controls__filter');
    const shopFilterCloseTrigger = document.querySelector('.shop .close-filter');
    const shopFilterContentWrapper = document.querySelector('.shop .shop-filter');
    const shopFilterSearchBtn = document.querySelector('.shop .shop-filter__search');
    const shopControllsWrapper = document.querySelector('.shop .controls');
    const shopCatalogContainer = document.querySelectorAll('.shop .catalog');

    function hideCatalogFilter() {
        shopFilterContentWrapper.classList.remove('shop-filter--active');
        shopFilterCloseTrigger.classList.add('d-none');
        shopControllsWrapper.style.opacity = null;
        shopCatalogContainer.forEach(catalog => catalog.style.opacity = null);
    }

    if (shopFilterTrigger) {
        shopFilterTrigger.addEventListener('click', () => {
            shopFilterContentWrapper.classList.add('shop-filter--active');
            shopFilterCloseTrigger.classList.remove('d-none');
            shopControllsWrapper.style.opacity = '0';
            shopCatalogContainer.forEach(catalog => catalog.style.opacity = '0');
        });
        
        shopFilterCloseTrigger.addEventListener('click', () => {
            hideCatalogFilter();
        });

        shopFilterSearchBtn.addEventListener('click', () => {
            hideCatalogFilter();
        });
    }
});