'use strict';

var navInserted = false;

async function insertInnerAppNav() {
    if(!navInserted) {
        try {
            let innerAppNav = document.getElementById('inner-app-nav');
            let myResponse = await fetch('pages/components/inner-app-nav.html');
            if(myResponse.ok) {
                if(innerAppNav !== null) {
                    innerAppNav.hidden = true;
                    innerAppNav.ariaHidden = true;
                    innerAppNav.innerHTML = await myResponse.text();
                    innerAppNav.classList.add('anim-entrada-fund','entrada-fund-arriba');
                    innerAppNav.removeAttribute('hidden');
                    innerAppNav.removeAttribute('aria-hidden');
                    navInserted = true;
                }
            }
        } catch(e) { console.log(e); }
    }

    if(navInserted) {
        try {
            document.getElementById('inner-app-nav-start').removeEventListener('click', reloadHome);
        } catch(e) { console.log(e); }
        try {
            document.getElementById('inner-app-nav-start').addEventListener('click', reloadHome);
        } catch(e) { console.log(e); }
    }
}

function reloadHome() {
    removeInnerAppNav();
    window.location.replace('/');
    window.location.reload;
}

function removeInnerAppNav() {
    try {
        let innerAppNav = document.getElementById('inner-app-nav');
        innerAppNav.classList.add('anim-salida-fund', 'salida-fund-arriba');
        setTimeout(() => {
            innerAppNav.innerHTML = '';
            innerAppNav.removeAttribute('class');
            navInserted = false;
        }, 300);
    } catch(e) { console.log(e); }
}