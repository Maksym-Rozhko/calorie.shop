document.addEventListener('DOMContentLoaded', () => {
    window.initCustoms = function() {
        // $('.js-example-basic-single').select2();

        $("#slider-range").slider({
            range: true,
            // step : 0.001,
            min: $('#slider-range').data('range-min'),
            max: $('#slider-range').data('range-max'),
            values: [$('#slider-range').data('range-selected-min'), $('#slider-range').data('range-selected-max')],
            slide: function( event, ui ) {
            $( "#amount" ).val( "" + ui.values[0] + "-" + ui.values[1]);
            }
        });
        $("#amount").val("" + $("#slider-range").slider("values", 0) +
            "-" + $("#slider-range").slider("values", 1));

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

        const customTabs = (btnSelectors, contentSelectors, activeClass) => {
            const btns = document.querySelectorAll(btnSelectors);
            const contents = document.querySelectorAll(contentSelectors);

            const removeBtnsActiveClass = () => btns.forEach(btn => btn.classList.remove(activeClass));
            const removeContentsActiveClass = () => contents.forEach(content => content.classList.add('d-none'));
            const removeWalletTabsActiveContent = () => contents.forEach(content => content.classList.remove('balance__block--show'));

            if (btns) {
                btns.forEach((btn, i) => {
                    btn.addEventListener('click', () => {
                        if (!contents[i]) return;
                        if (btn.dataset.catalog === contents[i].id) {
                            removeBtnsActiveClass();
                            btn.classList.add(activeClass);

                            if (!btn.classList.contains('create-wallet__tabs-btn')) {
                                removeContentsActiveClass();
                                contents[i].classList.remove('d-none');
                            } else {
                                removeWalletTabsActiveContent();
                                contents[i].classList.add('balance__block--show');
                            }
                        }
                    });
                });
            }
        }

        customTabs('.shop .shop-tabs__tab', '.shop .catalog', 'shop-tabs__tab--active');
        customTabs('.wallet .create-wallet__btn', '.wallet .create-wallet__content', 'create-wallet__btn--active');
        customTabs('.wallet .create-wallet__tabs-btn', '.wallet .balance__block', 'create-wallet__tabs-btn--active');

        const seedPhraseList = document.querySelectorAll('.seed-phrase .seed-phrase__list li');
        const seedPhraseBtnCopy = document.querySelector('.seed-phrase .seed-phrase__copy');
        const seedPhraseNextBtn = document.querySelector('.seed-phrase .graph-modal__btn-next');
        const seedPhrasePasswordInput = document.querySelector('.seed-phrase-page .form__input');
        let seedPhraseModalCopy = '';

        if (seedPhraseBtnCopy) {
            seedPhraseBtnCopy.addEventListener('click', () => {
                let seedPhrase = '';
                seedPhrasePasswordInput.value = '';

                seedPhraseList.forEach(li => {
                    seedPhrase += `${li.textContent} `;
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

        if (seedPhraseNextBtn) {
            seedPhraseNextBtn.addEventListener('click', () => {
                seedPhraseModalCopy = '';
                seedPhrasePasswordInput.value = '';
                seedPhraseList.forEach(li => seedPhraseModalCopy += `${li.textContent} `);
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
        let indexPhraseWords = 0;

        if (seedPhraseWords) {
            seedPhraseWords.forEach((word, i) => {
                word.addEventListener('click', () => {
                    if (seedPhraseModalCopy.split(' ')[indexPhraseWords] === word.textContent) {
                        indexPhraseWords++;
                        word.classList.add('word-choosed');
                            seedPhraseWordsChoosedArea.innerHTML += `
                            <span>${word.textContent}</span>
                        `;
                        seedPhraseWordsInput.value += `${word.textContent} `;
                        seedPhraseWords.forEach(word => {word.classList.remove('word-incorrect')});
                    } else {
                        seedPhraseWords.forEach(word => {word.classList.remove('word-incorrect')});
                        word.classList.add('word-incorrect');
                    }


                    if (seedPhraseWordsInput.value === seedPhraseModalCopy) {
                        seedPhraseWordsSubmitBtn.classList.add('submit-active');
                        seedPhraseWordsSubmitBtn.removeAttribute('disabled');
                    } else {
                        seedPhraseWordsSubmitBtn.classList.remove('submit-active');
                        seedPhraseWordsSubmitBtn.setAttribute('disabled', 'disabled');
                    }
                });
            });

            // seedPhraseWordsChoosedArea?.addEventListener('click', e => {
            //     const target = e.target;

            //     if (target.tagName === 'SPAN') {
            //         target.remove();

            //         seedPhraseWords.forEach(word => {
            //             if (word.textContent === target.textContent) {
            //                 word.classList.remove('word-choosed');
            //                 seedPhraseWordsInput.value = seedPhraseWordsInput.value.replace(` ${target.textContent}`, '');

            //                 if (seedPhraseWordsInput.value === seedPhraseModalCopy) {
            //                     seedPhraseWordsSubmitBtn.classList.add('submit-active');
            //                     seedPhraseWordsSubmitBtn.removeAttribute('disabled');
            //                 } else {
            //                     seedPhraseWordsSubmitBtn.classList.remove('submit-active');
            //                     seedPhraseWordsSubmitBtn.setAttribute('disabled', 'disabled');
            //                 }
            //             }
            //         });
            //     }
            // });

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

        const profileEditBtn = document.querySelector('.profile-page .profile-page__edit-btn');
        const profileEditInfoBlock = document.querySelector('.profile-page .profile-stat-info');
        const profileEditFormBlock = document.querySelector('.profile-page .profile-edit-info');
        const profileEditForm= document.querySelector('.profile-page .profile-edit-info .form');

        if (profileEditBtn) {
            profileEditBtn.addEventListener('click', () => {
                profileEditInfoBlock.classList.add('d-none');
                profileEditFormBlock.classList.add('profile-edit-show');
            });
        }

        if (profileEditForm) {
            profileEditForm.addEventListener('submit', () => {
                profileEditInfoBlock.classList.remove('d-none');
                profileEditFormBlock.classList.remove('profile-edit-show');
            });
        }
        const clipboardCopy = (triggerSelector, copySelector) => {
        const btn = document.querySelector(triggerSelector);
        const copy = document.querySelector(copySelector);

        if (btn) {
            btn.addEventListener('click', () => {

                navigator.clipboard.writeText(copy.textContent)
                    .then(() => {
                        btn.classList.add('copied');
                            setTimeout(function () {
                                btn.classList.remove('copied');
                            }, 1500)
                        })
                    });
            }
        }

        clipboardCopy('.account-number .account-number__copy', '.account-number .account-number__code');
        clipboardCopy('.receive .account-number .account-number__copy', '.receive .account-number .account-number__code');


        const chooseNftModalFormInputs = document.querySelectorAll('.choose-nft .balance__items .checkbox');

        function removeCheckedNft() {
            chooseNftModalFormInputs.forEach(item => item.parentElement.classList.remove('item--checked'));
        }

        if (chooseNftModalFormInputs) {
            chooseNftModalFormInputs.forEach(item => {
                item.addEventListener('input', () => {
                    if (item.checked) {
                        removeCheckedNft();
                        item.parentElement.classList.add('item--checked')
                    }
                });
            });
        }

        const transferSwitcherElems = document.querySelectorAll('.transfer__switcher .transfer__switcher-btn');
        const transferSwitcherContnet = document.querySelectorAll('.transfer__selects-wrap .transfer__switcher-content');

        if (transferSwitcherElems) {
            const removeContentsActiveClass = () => transferSwitcherContnet.forEach(content => content.classList.add('d-none'));
            const removeBtnsActiveClass = () => transferSwitcherElems.forEach(btn => btn.classList.remove('transfer__switcher-btn--active'));



            transferSwitcherElems.forEach((btn, i) => {
                btn.addEventListener('click', () => {
                    if (btn.dataset.catalog === transferSwitcherContnet[i].id) {
                        removeBtnsActiveClass();
                        btn.classList.add('transfer__switcher-btn--active');

                        if (!btn.classList.contains('create-wallet__tabs-btn')) {
                            removeContentsActiveClass();
                            transferSwitcherContnet[i].classList.remove('d-none');
                        } else {
                            transferSwitcherContnet[i].classList.add('d-none');
                        }
                    }
                });
            });
        }

        const importItemsInput = document.querySelectorAll('.restore-password .import__item .import__input');
        const importVisibleBtns = document.querySelectorAll('.restore-password .import__visible');
        // const importWalletNextStepBtn = document.querySelector('.restore-password .graph-modal__btn-next');

        if (importItemsInput) {
            // function checkEmptyInput(inputs) {
            //     inputs.forEach(input => input.value !== '' ? importWalletNextStepBtn.removeAttribute('disabled') : importWalletNextStepBtn.setAttribute('disabled', 'disabled'));
            // }

            importItemsInput.forEach((input, i) => {
                input.addEventListener('input', () => {
                    let importPhrase = input.value;

                    importPhrase = importPhrase.split(' ').filter(({ length }) => length);

                    if (importPhrase.length === 12) {
                        for (let index = 0; index < importItemsInput.length; index++) {
                            importItemsInput[index].value = importPhrase[index];
                        }
                    }

                    document.addEventListener('keyup', e => {
                        if (e.code === 'ControlLeft' || e.code === 'MetaLeft' || e.code === 'ControlRight' || e.code === 'MetaRight') {
                            importItemsInput.forEach((input, i) => {
                                input.value = importPhrase[i] ? importPhrase[i] : '';
                            });

                            // checkEmptyInput(importItemsInput);
                        }
                    });
                    // checkEmptyInput(importItemsInput);
                });
            });

            importVisibleBtns.forEach((btn, i) => {
                btn?.addEventListener('click', () => {
                    btn.classList.toggle('import__visible--show');
                    importItemsInput[i].setAttribute('type', `${btn.classList.contains('import__visible--show') ? 'text' : 'password'}`);
                });
            });
        }

        const newPasswordInputs = document.querySelectorAll('.new-password .form__input');
        const newPasswordInput = document.querySelector('.new-password .form__input.input-password');
        const newPasswordConfirmInput = document.querySelector('.new-password .form__input.input-password-confirm');
        const newPasswordDontMatchMessage = document.querySelector('.new-password .form__label--password .form-incorrect');
        const newPasswordSubmitConfirm = document.querySelector('.restore-password .restore-password__confirm-btn');

        if (newPasswordInputs) {

            function checkInputMatches() {
                if (newPasswordInput.value === newPasswordConfirmInput.value) {
                    newPasswordSubmitConfirm.removeAttribute('disabled');
                    newPasswordSubmitConfirm.style.pointerEvents = '';
                    newPasswordDontMatchMessage.style.opacity = '';
                } else {
                    newPasswordSubmitConfirm.setAttribute('disabled', 'disabled');
                    newPasswordSubmitConfirm.style.pointerEvents = 'all';
                    newPasswordDontMatchMessage.style.opacity = '1';
                }
            }

            newPasswordInputs.forEach(input => {
                input.addEventListener('input', () => {
                    checkInputMatches();
                });
            });
        }

        const regCirilic = /[а-яА-ЯёЁ]/g;
        const regOnlyAbc = /[^a-z\s]/gi;
        const inputPasswords = document.querySelectorAll('input[type="password"');
        const inputProfileName = document.querySelectorAll('.profile-page .form__label--name .form__input');

        function banCirilicLetters(inputs) {
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    if (input.value.search(regCirilic) !=  -1) {
                        input.value = input.value.replace(regCirilic, '');
                    }
                });
            });
        }

        function checkOnlyAbc(inputs) {
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    if (input.value.search(regOnlyAbc) !=  -1) {
                        input.value = input.value.replace(regOnlyAbc, '');
                    }
                });
            });
        }


        banCirilicLetters(inputPasswords);
        checkOnlyAbc(inputProfileName);

        const walletAccountCode = document.querySelector('.create-wallet .account-number__code');

        if (walletAccountCode) {
            if (window.innerWidth < 575 && walletAccountCode.textContent.length >= 29) {
                walletAccountCode.textContent = walletAccountCode.textContent.replace(walletAccountCode.textContent.slice(29), '...');
            }
        }
    }

    initCustoms();
});

$(document).on('pjax:complete', function(event) {
    initCustoms();
});
