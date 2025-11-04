'use strict';
class AJAXHelper {
    static async insertarHTMLEnElemento(archivoHTML, elementoID) {
        try {
            let promesaArchivoHTML = await fetch(archivoHTML);
            if(promesaArchivoHTML.ok) {
                document.getElementById(elementoID).innerHTML = "";
                document.getElementById(elementoID).innerHTML = await promesaArchivoHTML.text();
            }
        } catch(e) { console.log(e); }
    }
}