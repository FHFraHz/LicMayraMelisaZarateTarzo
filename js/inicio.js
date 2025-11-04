'use strict';

document.addEventListener('DOMContentLoaded', () => {
    AJAXHelper.insertarHTMLEnElemento('pages/components/header-home.html', 'header');
    AJAXHelper.insertarHTMLEnElemento('pages/inicio.html', 'content');
    AJAXHelper.insertarHTMLEnElemento('pages/components/footer.html', 'footer');
});