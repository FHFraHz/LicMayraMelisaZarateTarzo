'use strict';
function pruebaHolaDesdePagename(pagename) {
    document.getElementById('pagename').innerHTML = pagename;
    alert(`Hola desde ${pagename}.html`);
}