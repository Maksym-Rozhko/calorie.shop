const customDropdown = (triggerSelector, activeClass) => {
    const btn = document.querySelector(triggerSelector);

    if (btn) {
        btn.addEventListener('click', () => {
            btn.nextElementSibling.classList.toggle('d-none');
            btn.parentElement.classList.toggle(activeClass);
        });
    }

    window.addEventListener('click', ({ target }) => {
        if (!target.closest(triggerSelector)) {
            btn.nextElementSibling.classList.add('d-none');
            btn.parentElement.classList.remove(activeClass);
        }
    });
}

customDropdown('.profile .profile__wrap', 'profile--show');

