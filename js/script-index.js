function toggleMenu() {
    var sidenav = document.querySelector('nav.sidenav');
    var overlay = document.querySelector('.overlay');
    sidenav.classList.toggle('active');
    overlay.classList.toggle('active');
}