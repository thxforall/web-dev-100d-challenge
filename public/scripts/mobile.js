const mobileMenuBtnElement = document.querySelector('.mobile-menu-btn');
const mobileMenuElement = document.querySelector('.mobile-menu');

const mobileMenuBtnToggleHandler = () => {
    mobileMenuElement.classList.toggle('open');
};

mobileMenuBtnElement.addEventListener('click', mobileMenuBtnToggleHandler);
