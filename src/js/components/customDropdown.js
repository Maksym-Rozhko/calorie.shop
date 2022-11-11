const customDropdown = (triggerSelector, activeClass) => {
    const btn = document.querySelector(triggerSelector);

    if (btn) {
        btn.addEventListener('click', () => {
            btn.nextElementSibling.classList.toggle('d-none');
            btn.parentElement.classList.toggle(activeClass);
        });
    }
}

customDropdown('.profile .profile__wrap', 'profile--show');

