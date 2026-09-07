const fs = require('fs');
const path = 'c:/Gemilang/mejakantor.web.id/index.html';
let html = fs.readFileSync(path, 'utf8');

// Replace CSS
html = html.replace(/assets\/vendor\/bootstrap\/css\/bootstrap\.min\.css/g, 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
html = html.replace(/assets\/vendor\/bootstrap-icons\/bootstrap-icons\.css/g, 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css');
html = html.replace(/assets\/vendor\/aos\/aos\.css/g, 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css');
html = html.replace(/assets\/vendor\/swiper\/swiper-bundle\.min\.css/g, 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');

// Replace JS
html = html.replace(/assets\/vendor\/bootstrap\/js\/bootstrap\.bundle\.min\.js/g, 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js');
html = html.replace(/assets\/vendor\/aos\/aos\.js/g, 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js');
html = html.replace(/assets\/vendor\/swiper\/swiper-bundle\.min\.js/g, 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

// Add preconnect for CDN
if (!html.includes('https://cdn.jsdelivr.net')) {
    html = html.replace('<!-- Pagespeed Optimizations -->', '<!-- Pagespeed Optimizations -->\n  <link rel="preconnect" href="https://cdn.jsdelivr.net">');
}

fs.writeFileSync(path, html, 'utf8');
console.log('Vendor assets updated to CDN links!');
