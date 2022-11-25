function preloader(preloader) {
    const loader = document.querySelector(preloader);

    if (loader) {
        setTimeout(() => {
            loader.classList.add('preloader--active');
        }, 2000);
        setTimeout(() => {
            loader.classList.add('remove');
        }, 4500);
        setTimeout(() => {
            loader.remove();
        }, 6500);
    }
};

preloader('.preloader');