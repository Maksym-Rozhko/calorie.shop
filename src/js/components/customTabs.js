const customTabs = (btnSelectors, contentSelectors, activeClass) => {
    const btns = document.querySelectorAll(btnSelectors);
    const contents = document.querySelectorAll(contentSelectors);

    const removeBtnsActiveClass = () => btns.forEach(btn => btn.classList.remove(activeClass));
    const removeContentsActiveClass = () => contents.forEach(content => content.classList.add('d-none'));

    if (btns) {
        btns.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                if (btn.dataset.catalog === contents[i].id) {
                    removeBtnsActiveClass();
                    removeContentsActiveClass();
                    btn.classList.add(activeClass);
                    contents[i].classList.remove('d-none');
                }
            });
        });
    }
}

customTabs('.shop .shop-tabs__tab', '.shop .catalog', 'shop-tabs__tab--active');

