function preloader(preloader) {
    const loader = document.querySelector(preloader);

    if (loader) {
        setTimeout(() => {
            loader.classList.add('preloader--active');
        }, 2000);
    }
};

preloader('.preloader');
