#!/usr/bin/env node
// Regenerates everything derived from poems.js — the single source of truth
// for poem data:
//
//   * one redirect page per poem (<slug>.html)
//   * sitemap.xml
//   * llms.txt
//   * POEMS_LANGUAGE_LOG.md
//   * the noscript + JSON-LD sections of index.html (between marker comments)
//
// Usage: node scripts/generate.js
//
// The script is idempotent: running it twice produces identical output.
// It fails loudly if poems.js is malformed or the index.html markers are
// missing, so a broken run can't silently ship partial output.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://www.christianlambillotte.be';
// Bump when content changes; written into sitemap.xml and the language log.
const LASTMOD = '2026-06-12';

const LOCALES = { fr: 'fr_FR', nl: 'nl_NL', it: 'it_IT' };
const LANG_NAMES = { fr: 'French', nl: 'Dutch', it: 'Italian' };

// ---------------------------------------------------------------------------
// Load and validate poem data

const poemsSource = fs.readFileSync(path.join(ROOT, 'poems.js'), 'utf8');
const poems = vm.runInNewContext(poemsSource + ';\npoems;', {});

if (!Array.isArray(poems) || poems.length === 0) {
    throw new Error('poems.js did not yield a poems array');
}
for (const poem of poems) {
    for (const field of ['title', 'slug', 'lang', 'summary', 'text']) {
        if (!poem[field]) throw new Error(`poem "${poem.title || poem.slug}" is missing required field "${field}"`);
    }
    if (!LOCALES[poem.lang]) throw new Error(`poem "${poem.slug}" has unknown lang "${poem.lang}"`);
    const badTag = poem.text.match(/<(?!\/?em>)[^>]*>/);
    if (badTag) throw new Error(`poem "${poem.slug}" contains unsupported markup "${badTag[0]}" — only <em>…</em> is allowed (see poems.js header)`);
}
if (new Set(poems.map(p => p.slug)).size !== poems.length) {
    throw new Error('duplicate slugs in poems.js');
}

// ---------------------------------------------------------------------------
// Helpers

const stripTags = s => s.replace(/<[^>]+>/g, '');
const escapeAttr = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

// Meta description: the first four non-empty lines, tags stripped.
function metaDescription(poem) {
    const lines = stripTags(poem.text).split('\n').map(l => l.trim()).filter(Boolean);
    return lines.slice(0, 4).join(' ') + '...';
}

function writeIfChanged(relPath, content) {
    const abs = path.join(ROOT, relPath);
    if (fs.existsSync(abs) && fs.readFileSync(abs, 'utf8') === content) {
        console.log(`  unchanged  ${relPath}`);
        return;
    }
    fs.writeFileSync(abs, content);
    console.log(`  wrote      ${relPath}`);
}

// Replace the content between <!-- BEGIN GENERATED: name --> and
// <!-- END GENERATED: name -->, preserving the end marker's indentation.
function spliceSection(html, name, replacement) {
    const beginMatch = html.match(new RegExp(`<!-- BEGIN GENERATED: ${name}[^>]*-->`));
    const endMarker = `<!-- END GENERATED: ${name} -->`;
    const endIdx = html.indexOf(endMarker);
    if (!beginMatch || endIdx < 0) throw new Error(`index.html is missing the "${name}" generation markers`);
    const beginIdx = beginMatch.index + beginMatch[0].length;
    if (endIdx < beginIdx) throw new Error(`"${name}" markers are out of order`);
    const indent = html.slice(0, endIdx).match(/( *)$/)[1];
    return html.slice(0, beginIdx) + '\n' + replacement + '\n' + indent + html.slice(endIdx);
}

// ---------------------------------------------------------------------------
// Redirect pages

function redirectPage(poem) {
    const fullTitle = escapeAttr(`${poem.title} - Christian Lambillotte`);
    const desc = escapeAttr(metaDescription(poem));
    return `<!DOCTYPE html>
<html lang="${poem.lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fullTitle}</title>
    <meta name="description" content="${desc}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:title" content="${fullTitle}">
    <meta property="og:description" content="${desc}">
    <meta property="og:url" content="${SITE}/${poem.slug}.html">
    <meta property="og:locale" content="${LOCALES[poem.lang]}">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${fullTitle}">
    <meta name="twitter:description" content="${desc}">

    <!-- Redirect to main site -->
    <meta http-equiv="refresh" content="0;url=/#${poem.slug}">
    <link rel="canonical" href="${SITE}/#${poem.slug}">
</head>
<body>
    <p>Redirecting to <a href="/#${poem.slug}">${poem.title}</a>...</p>
    <script>window.location.replace('/#${poem.slug}');</script>
</body>
</html>
`;
}

// ---------------------------------------------------------------------------
// sitemap.xml

function sitemap() {
    const url = (loc, priority) =>
        `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
    const urls = [
        url(`${SITE}/`, '1.0'),
        ...poems.map(p => url(`${SITE}/${p.slug}.html`, '0.8')),
    ];
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

// ---------------------------------------------------------------------------
// llms.txt

function llmsTxt() {
    const byLang = lang => poems.filter(p => p.lang === lang);
    const fr = byLang('fr'), nl = byLang('nl'), it = byLang('it');
    const list = ps => ps.map(p => `- [${p.title}](${SITE}/${p.slug}.html): ${p.summary}`).join('\n');
    return `# Les poèmes de Christian Lambillotte

> Recueil de poésie de Christian Lambillotte (1957–2026), poète belge amateur de Gand. Ses poèmes, écrits en français, néerlandais et italien, explorent les thèmes de la vie, de l'humanité, de la famille et de la réflexion existentielle. Ses écrits, non publiés de son vivant, sont rassemblés et préservés par ses enfants.

Christian Lambillotte était fils, frère, père, grand-père, scout, franc-maçon, écrivain et poète amateur. Gantois passionné par l'Afrique, à laquelle il a consacré une partie de sa vie professionnelle, il nourrissait un vif intérêt pour les langues et attachait une grande importance à l'amitié, au débat et aux moments simples partagés avec ceux qui l'entouraient.

Le site présente ${poems.length} poèmes répartis en trois langues : ${fr.length} en français, ${nl.length} en néerlandais et ${it.length} en italien. Chaque poème peut être lu en plein écran avec un mode clair et un mode sombre.

## Poèmes en français

${list(fr)}

## Poème en italien

${list(it)}

## Gedichten in het Nederlands

${list(nl)}

## Credits

- Poésie : Christian Lambillotte
- Illustrations & site web : [Arthur Lambillotte](https://artlambi.be)
`;
}

// ---------------------------------------------------------------------------
// POEMS_LANGUAGE_LOG.md

function languageLog() {
    const entries = poems.map((p, i) => {
        const note = p.image ? '\n   - Note: Has illustration' : '';
        return `${i + 1}. **${p.title}**\n   - Language: ${LANG_NAMES[p.lang]} (${p.lang})\n   - Slug: ${p.slug}${note}`;
    }).join('\n\n');
    const counts = ['fr', 'it', 'nl'].map(lang => {
        const positions = poems.map((p, i) => p.lang === lang ? i + 1 : null).filter(Boolean);
        const range = positions.length > 1 ? `positions ${positions[0]}-${positions[positions.length - 1]}` : `position ${positions[0]}`;
        return `- **${LANG_NAMES[lang]} (${lang})**: ${positions.length} poem${positions.length > 1 ? 's' : ''} (${range})`;
    }).join('\n');
    const illustrated = poems.filter(p => p.image).map(p => `"${p.title}"`).join(' and ');
    return `# Poems Language Reference
# Christian Lambillotte Poetry Collection
# GENERATED FILE — edit poems.js and run \`node scripts/generate.js\`
# Last updated: ${LASTMOD}

## Poem List by Position

${entries}

## Summary by Language

${counts}

## Notes

- Poems with illustrations: ${illustrated}
- All redirect pages have locale metadata (${Object.values(LOCALES).join(', ')})
- poems.js is the single source of truth; this log, the redirect pages,
  sitemap.xml, llms.txt, and the noscript/JSON-LD sections of index.html
  are all regenerated from it by scripts/generate.js
`;
}

// ---------------------------------------------------------------------------
// index.html sections

function updateIndexHtml() {
    let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Les poèmes de Christian Lambillotte',
        description: 'Recueil de poèmes de Christian Lambillotte',
        author: { '@type': 'Person', name: 'Christian Lambillotte' },
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: poems.map((p, i) => ({
                '@type': 'CreativeWork',
                position: i + 1,
                name: p.title,
                '@id': '#' + p.slug,
            })),
        },
    };
    const json = JSON.stringify(jsonLd, null, 4).split('\n').map(l => '    ' + l).join('\n');
    html = spliceSection(html, 'json-ld',
        `    <script type="application/ld+json">\n${json}\n    </script>`);

    const articles = poems.map(p =>
        `            <article class="poem-article" id="${p.slug}">\n                <h2>${p.title}</h2>\n                <p>${p.text}</p>\n            </article>`
    ).join('\n');
    html = spliceSection(html, 'noscript-poems', articles);

    writeIfChanged('index.html', html);
}

// ---------------------------------------------------------------------------
// Run

console.log(`Generating from poems.js (${poems.length} poems):`);
for (const poem of poems) {
    writeIfChanged(`${poem.slug}.html`, redirectPage(poem));
}
writeIfChanged('sitemap.xml', sitemap());
writeIfChanged('llms.txt', llmsTxt());
writeIfChanged('POEMS_LANGUAGE_LOG.md', languageLog());
updateIndexHtml();
console.log('Done.');
