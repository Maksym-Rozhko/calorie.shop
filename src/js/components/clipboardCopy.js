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
