const fs = require('fs');
const path = 'c:/Gemilang/mejakantor.web.id/index.html';
let html = fs.readFileSync(path, 'utf8');

// Revert CDNs back to local assets
html = html.replace(/https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap@5\.3\.3\/dist\/css\/bootstrap\.min\.css/g, 'assets/vendor/bootstrap/css/bootstrap.min.css');
html = html.replace(/https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap-icons@1\.11\.3\/font\/bootstrap-icons\.min\.css/g, 'assets/vendor/bootstrap-icons/bootstrap-icons.css');
html = html.replace(/https:\/\/cdn\.jsdelivr\.net\/npm\/aos@2\.3\.4\/dist\/aos\.css/g, 'assets/vendor/aos/aos.css');
html = html.replace(/https:\/\/cdn\.jsdelivr\.net\/npm\/swiper@11\/swiper-bundle\.min\.css/g, 'assets/vendor/swiper/swiper-bundle.min.css');

html = html.replace(/https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap@5\.3\.3\/dist\/js\/bootstrap\.bundle\.min\.js/g, 'assets/vendor/bootstrap/js/bootstrap.bundle.min.js');
html = html.replace(/https:\/\/cdn\.jsdelivr\.net\/npm\/aos@2\.3\.4\/dist\/aos\.js/g, 'assets/vendor/aos/aos.js');
html = html.replace(/https:\/\/cdn\.jsdelivr\.net\/npm\/swiper@11\/swiper-bundle\.min\.js/g, 'assets/vendor/swiper/swiper-bundle.min.js');

// Remove CDN preconnect
html = html.replace(/<link rel="preconnect" href="https:\/\/cdn\.jsdelivr\.net">\n?/g, '');

// Revert deferred CSS because it might be causing LCP delays if GTmetrix waits for the onload JS
function revertDeferCSS(html, cssFile) {
    const regex = new RegExp(`<link rel="preload" as="style" href="${cssFile.replace(/\//g, '\\/')}" onload="this.onload=null;this.rel='stylesheet'">\\s*<noscript><link rel="stylesheet" href="${cssFile.replace(/\//g, '\\/')}"><\\/noscript>`, 'g');
    return html.replace(regex, `<link href="${cssFile}" rel="stylesheet">`);
}

html = revertDeferCSS(html, 'assets/vendor/bootstrap-icons/bootstrap-icons.css');
html = revertDeferCSS(html, 'assets/vendor/aos/aos.css');
html = revertDeferCSS(html, 'assets/vendor/swiper/swiper-bundle.min.css');

// Also revert fonts defer just in case
const fontsRegex = /<link rel="preload" as="style" href="(https:\/\/fonts\.googleapis\.com\/css2\?[^"]+)" onload="this\.onload=null;this\.rel='stylesheet'">\s*<noscript><link rel="stylesheet" href="[^"]+"><\/noscript>/g;
html = html.replace(fontsRegex, '<link href="$1" rel="stylesheet">');

fs.writeFileSync(path, html, 'utf8');
console.log('Reverted CDNs and deferred CSS back to standard.');
