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