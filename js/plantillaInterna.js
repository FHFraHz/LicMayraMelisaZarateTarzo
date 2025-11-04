'use strict';

function cargarPlantillaInterna(nombrePagina = null) {
    AJAXHelper.insertarHTMLEnElemento('pages/components/header-inner.html', 'header');
    AJAXHelper.insertarHTMLEnElemento('pages/components/inner-app-nav.html', 'nav');
    if(nombrePagina !== null && typeof(nombrePagina) === 'string') {
        AJAXHelper.insertarHTMLEnElemento(nombrePagina, 'content');
    }
    AJAXHelper.insertarHTMLEnElemento('pages/components/footer.html', 'footer');
}