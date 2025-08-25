'use strict';

const routes = {
    '/': {
        'file': 'pages/inicio.html',
        'scripts': [
            {'src': 'js/pages/inicio.js', 'type': 'text/javascript'}
        ],
    },
    '#educacion-especial': {
        'file': 'pages/edu-esp.html',
        'scripts': [
            {'src': 'js/pages/edu-esp.js', 'type': 'text/javascript'}
        ],
        // 'styles': ['css/pages/about.css']
    },
    '#evaluacion-y-tratamiento': {
        'file': 'pages/eval-tratamiento.html',
        'scripts': [
            {'src': 'js/pages/eval-tratamiento.js', 'type': 'text/javascript'}
        ],
        // 'styles': ['css/pages/about.css']
    },
    '#material-descargable': {
        'file': 'pages/material-descarga.html',
        'scripts': [
            {'src': 'js/pages/material-descarga.js', 'type': 'text/javascript'}
        ],
        // 'styles': ['css/pages/about.css']
    },
    '#orientacion-vocacional': {
        'file': 'pages/orienta-vocacion.html',
        'scripts': [
            {'src': 'js/pages/orienta-vocacion.js', 'type': 'text/javascript'}
        ],
        // 'styles': ['css/pages/about.css']
    },
    '#psicopedagogia-laboral': {
        'file': 'pages/ppdgg-laboral.html',
        'scripts': [
            {'src': 'js/pages/ppdgg-laboral.js', 'type': 'text/javascript'}
        ],
        // 'styles': ['css/pages/about.css']
    },
    '#tutorias-psicopedagogicas': {
        'file': 'pages/tuto-ppdgg.html',
        'scripts': [
            {'src': 'js/pages/tuto-ppdgg.js', 'type': 'text/javascript'}
        ],
        // 'styles': ['css/pages/about.css']
    }
};

async function initializeRouter() {
    window.addEventListener('popstate', router);
    addLinkEventListeners();
    await router();
}

function addLinkEventListeners() {
    try {
        document.body.addEventListener('click', (event) => {
            let target = event.target.closest('a.router-link');
            if((target) && (window.location.hash)) {
                event.preventDefault();
                /* COMPLEJIZAR MEJOR DESPUÉS */
                document.getElementById('app').classList.add('anim-salida-fund', 'salida-fund-arriba');
                setTimeout(() => {
                    document.getElementById('app').innerHTML = '';
                    document.getElementById('app').classList.remove('anim-salida-fund', 'salida-fund-arriba');
                    navigateTo(target.href);
                }, 300);
            }
        });
    } catch(e) {
        console.log(e);
    }
}

function navigateTo(url) {
    history.pushState(null, null, url);
    router();
}

async function router() {
    let route = routes[window.location.hash] || routes[window.location.pathname] || 'pages/404.html';
    // console.log(route);
    try {
        await renderPage(route);
        // addLinkEventListeners();
    } catch(e) { throwHTTPStatus(500, 'Internal Server Error'); }
}

async function renderPage(route) {
    let response = await fetch(route.file);
    if(response.ok) {
        let text = await response.text();
        document.getElementById('app').innerHTML = text;
        if(route.styles)
            insertStyles(route.styles);
        if(route.scripts)
            insertScripts(route.scripts);
    }
    else
        renderHTTPStatus(response.status, response.statusText);
}
function insertScripts(scripts) {
    scripts.forEach((script) => {
        let scriptElement = document.createElement('script');
        scriptElement.src = script.src;
        scriptElement.type = script.type ?? 'text/javascript';
        document.getElementById('app').appendChild(scriptElement);
    });
}
function insertStyles(styles) {
    document.getElementById('page-styles').innerHTML = '';
    styles.forEach((style) => {
        try {
            let linkCss = document.createElement('link');
            linkCss.setAttribute('rel', 'stylesheet');
            linkCss.setAttribute('type', 'text/css');
            linkCss.setAttribute('href', style);
            document.getElementById('page-styles').appendChild(linkCss);
        } catch(e) { console.log(e); }
    });
}
function throwHTTPStatus(statusCode, statusText = '') {   
    document.body.innerHTML = '<h1>'+statusCode+' '+statusText+'</h1>';
}
async function renderHTTPStatus(statusCode, statusText = '') {
    try {
        let response = await fetch('pages/http_response.html');
        if(response.ok) {
            document.getElementById('main').innerHTML = response.text();
            document.getElementById('response').innerHTML = statusCode+" "+statusText;
        }
    } catch(e) { throwHTTPStatus(500, 'Internal Server Error'); }
}