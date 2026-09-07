const fs = require('fs');
const path = 'c:/Gemilang/mejakantor.web.id/index.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Remove loading="lazy" from above-the-fold images
html = html.replace(/<img src="assets\/img\/logo-transparent\.png"([^>]*) loading="lazy"([^>]*)>/, '<img src="assets/img/logo-transparent.png"$1$2>');
html = html.replace(/<img src="assets\/img\/paket\/hero\.webp"([^>]*) loading="lazy"([^>]*)>/, '<img src="assets/img/paket/hero.webp"$1$2>');
// Also handle case where loading="lazy" is before width/height
html = html.replace(/<img src="assets\/img\/logo-transparent\.png" loading="lazy"([^>]*)>/, '<img src="assets/img/logo-transparent.png"$1>');
html = html.replace(/<img src="assets\/img\/paket\/hero\.webp" loading="lazy"([^>]*)>/, '<img src="assets/img/paket/hero.webp"$1>');

// 2. Add preload tags for LCP images
const preloadTags = `
  <!-- Preload LCP Images -->
  <link rel="preload" as="image" href="assets/img/paket/hero.webp">
  <link rel="preload" as="image" href="assets/img/logo-transparent.png">
`;
if (!html.includes('<!-- Preload LCP Images -->')) {
    html = html.replace('<!-- Pagespeed Optimizations -->', preloadTags + '\n  <!-- Pagespeed Optimizations -->');
}

// 3. Defer all scripts
html = html.replace(/<script src="assets\/vendor\/bootstrap\/js\/bootstrap\.bundle\.min\.js"><\/script>/g, '<script defer src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>');
html = html.replace(/<script src="assets\/vendor\/php-email-form\/validate\.js"><\/script>/g, '<script defer src="assets/vendor/php-email-form/validate.js"></script>');
html = html.replace(/<script src="assets\/vendor\/aos\/aos\.js"><\/script>/g, '<script defer src="assets/vendor/aos/aos.js"></script>');
html = html.replace(/<script src="assets\/vendor\/swiper\/swiper-bundle\.min\.js"><\/script>/g, '<script defer src="assets/vendor/swiper/swiper-bundle.min.js"></script>');
html = html.replace(/<script src="assets\/vendor\/purecounter\/purecounter_vanilla\.js"><\/script>/g, '<script defer src="assets/vendor/purecounter/purecounter_vanilla.js"></script>');
html = html.replace(/<script src="assets\/js\/main\.js\?v=([0-9]+)"><\/script>/g, '<script defer src="assets/js/main.js?v=$1"></script>');

fs.writeFileSync(path, html, 'utf8');
console.log('HTML Optimized for LCP and TBT!');
