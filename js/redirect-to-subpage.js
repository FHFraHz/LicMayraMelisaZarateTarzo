'use strict';
try {
    let pathname = window.location.pathname;
    let route = pathname.split('/')[1];
    window.location.replace('/#'+route);
    window.location.reload;
} catch(e) { console.log(e); }