const fs = require('fs');

// 1. Minify CSS
const cssPath = 'c:/Gemilang/mejakantor.web.id/assets/css/main.css';
let css = fs.readFileSync(cssPath, 'utf8');
// Simple minifier: remove comments, remove newlines, remove extra spaces
css = css.replace(/\/\*[\s\S]*?\*\//g, '');
css = css.replace(/\s+/g, ' ');
css = css.replace(/\s*([{}:;,])\s*/g, '$1');
fs.writeFileSync(cssPath, css.trim(), 'utf8');

// 2. Further HTML optimizations
const htmlPath = 'c:/Gemilang/mejakantor.web.id/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Add fetchpriority="high" to preloads
html = html.replace(/<link rel="preload" as="image" href="assets\/img\/paket\/hero\.webp">/g, '<link rel="preload" as="image" href="assets/img/paket/hero.webp" fetchpriority="high">');

// Add fetchpriority="high" to hero image
html = html.replace(/<img src="assets\/img\/paket\/hero\.webp" width="800" height="600"  alt="Suasana Meja Kantor"/g, '<img src="assets/img/paket/hero.webp" width="800" height="600" fetchpriority="high" alt="Suasana Meja Kantor"');

// Defer non-critical CSS
function deferCSS(html, cssFile) {
    const regex = new RegExp(`<link href="${cssFile}" rel="stylesheet">`, 'g');
    const deferred = `<link rel="preload" as="style" href="${cssFile}" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="${cssFile}"></noscript>`;
    return html.replace(regex, deferred);
}

html = deferCSS(html, 'assets/vendor/bootstrap-icons/bootstrap-icons.css');
html = deferCSS(html, 'assets/vendor/aos/aos.css');
html = deferCSS(html, 'assets/vendor/swiper/swiper-bundle.min.css');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Advanced optimizations applied: CSS minified, fetchpriority added, CSS deferred.');
