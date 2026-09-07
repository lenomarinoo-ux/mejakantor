const fs = require('fs');
const path = 'c:/Gemilang/mejakantor.web.id/index.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Remove AOS from the Hero section to fix LCP delay
// The hero section is from <section id="hero" to </section><!-- /Hero Section -->
const heroStart = html.indexOf('<section id="hero"');
const heroEnd = html.indexOf('</section><!-- /Hero Section -->');
if (heroStart !== -1 && heroEnd !== -1) {
    let heroHTML = html.substring(heroStart, heroEnd);
    // Remove data-aos="..." and data-aos-delay="..."
    heroHTML = heroHTML.replace(/\s*data-aos="[^"]*"/g, '');
    heroHTML = heroHTML.replace(/\s*data-aos-delay="[^"]*"/g, '');
    
    html = html.substring(0, heroStart) + heroHTML + html.substring(heroEnd);
}

// 2. Defer Google Fonts to remove render-blocking
const googleFontsRegex = /<link\s*href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]+"\s*rel="stylesheet">/g;
html = html.replace(googleFontsRegex, (match) => {
    // Extract href
    const hrefMatch = match.match(/href="([^"]+)"/);
    if (hrefMatch) {
        const href = hrefMatch[1];
        return `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="${href}"></noscript>`;
    }
    return match;
});

// Also defer bootstrap.min.css if we want 95+ (but this might cause FOUC. We'll leave bootstrap for now because it handles the layout grid).
// Actually, let's just make sure bootstrap is preloaded if possible, but GTmetrix complains about it being render-blocking. Let's try deferring it. Wait, NO. If we defer bootstrap, the whole page will render without layout initially, causing huge CLS and a broken look. Let's NOT defer bootstrap.

fs.writeFileSync(path, html, 'utf8');
console.log('Hero AOS removed and fonts deferred for instant LCP!');
