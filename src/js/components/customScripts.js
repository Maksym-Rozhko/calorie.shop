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

    const seedPhraseList = document.querySelectorAll('.seed-phrase .seed-phrase__list li');
    const seedPhraseBtnCopy = document.querySelector('.seed-phrase .seed-phrase__copy');
    let seedPhraseModalCopy = '';

    if (seedPhraseBtnCopy) {
        seedPhraseBtnCopy.addEventListener('click', () => {
            let seedPhrase = '';

            seedPhraseList.forEach(li => {
                seedPhrase += ` ${li.textContent}`;
            });

            navigator.clipboard.writeText(seedPhrase)
                .then(() => {
                    seedPhraseModalCopy = seedPhrase;

                    seedPhraseBtnCopy.classList.add('copied');
                    setTimeout(function () {
                        seedPhraseBtnCopy.classList.remove('copied');
                    }, 1500)
                })
        });
    }

    const crateWalletContainer = document.querySelector('.wallet .create-wallet');
    const seedPhraseWordsContainer = document.querySelector('.wallet .seed-phrase-page');
    const seedPhraseWordsReturnLink = document.querySelector('.wallet .seed-phrase-page .return-link');
    const seedPhraseModalNextBtn = document.querySelector('.seed-phrase .graph-modal__btn-next');
    const seedPhraseWords = document.querySelectorAll('.seed-phrase-page .words-list .words-list__word');
    const seedPhraseWordsChoosedArea = document.querySelector('.seed-phrase-page .form__area');
    const seedPhraseWordsInput = document.querySelector('.seed-phrase-page .form__seed-phrase-input');
    const seedPhraseWordsSubmitBtn = document.querySelector('.seed-phrase-page .form .form__submit');

    if (seedPhraseWords) {
        seedPhraseWords.forEach((word, i) => {
            word.addEventListener('click', () => {
                word.classList.add('word-choosed');
                seedPhraseWordsChoosedArea.innerHTML += `
                    <span>${word.textContent}</span>
                `;
                seedPhraseWordsInput.value += ` ${word.textContent}`;

                seedPhraseWordsInput.value === seedPhraseModalCopy ? seedPhraseWordsSubmitBtn.classList.add('submit-active') : seedPhraseWordsSubmitBtn.classList.remove('submit-active');
            });
        });

        seedPhraseWordsChoosedArea?.addEventListener('click', e => {
            const target = e.target;

            if (target.tagName === 'SPAN') {
                target.remove();

                seedPhraseWords.forEach(word => {
                    if (word.textContent === target.textContent) {
                        word.classList.remove('word-choosed');
                        seedPhraseWordsInput.value = seedPhraseWordsInput.value.replace(` ${target.textContent}`, '');
                        seedPhraseWordsInput.value === seedPhraseModalCopy ? seedPhraseWordsSubmitBtn.classList.add('submit-active') : seedPhraseWordsSubmitBtn.classList.remove('submit-active');
                    }
                });
            }
        });

        seedPhraseModalNextBtn?.addEventListener('click', () => {
            seedPhraseWordsContainer.classList.remove('d-none');
            crateWalletContainer.classList.add('d-none');
        });

        seedPhraseWordsReturnLink?.addEventListener('click', () => {
            seedPhraseWordsContainer.classList.add('d-none');
            crateWalletContainer.classList.remove('d-none'); 
        })
    };

    const balanceTransferBtn = document.querySelector('.balance-main .balance__transfer-btns');
    const balanceTransferExtraBtns = document.querySelector('.balance-main .balance__btns-group-extra');
    const mainOverflow = document.querySelector('.main');

    if (balanceTransferBtn) {
        balanceTransferBtn.addEventListener('click', () => {
            mainOverflow.classList.add('main--overflow');
            balanceTransferExtraBtns.classList.remove('d-none');
        });

        mainOverflow.addEventListener('click', e => {
            if (e.target.classList.contains('main--overflow')) {
                mainOverflow.classList.remove('main--overflow');
                balanceTransferExtraBtns.classList.add('d-none');
            }
        });
    }

    const transformToSelectWrap = document.querySelector('.transfer-page .transfer__select-transfer-to');

    if (transformToSelectWrap) {
        transformToSelectWrap.addEventListener('click', () => {
            setTimeout(() => {
                const transformToSelectDropdown = document.querySelectorAll('.select2-container');
                transformToSelectDropdown[3]?.classList.add('select2-container--edited');
            }, 0);
        });
    }
});