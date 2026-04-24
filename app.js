// Tooltip delay management - don't delay subsequent tooltips
let tooltipTimeout = null;

const resetTooltipState = () => {
    document.querySelectorAll('.modal-controls, .poem-nav-buttons').forEach(container => {
        container.classList.remove('instant-tooltips');
    });
};

// Find all elements with tooltips
document.addEventListener('DOMContentLoaded', () => {
    const tooltipElements = document.querySelectorAll('.modal-btn, .modal-nav-btn, .poem-nav-btn');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            // Find the parent container
            const container = element.closest('.modal-controls, .poem-nav-buttons');
            
            if (container) {
                // Add instant class - will take effect for NEXT tooltip
                container.classList.add('instant-tooltips');
            }
            
            // Clear any existing timeout
            if (tooltipTimeout) {
                clearTimeout(tooltipTimeout);
            }
        });
        
        element.addEventListener('mouseleave', () => {
            // Reset the tooltip state after 1 second of no hovers
            tooltipTimeout = setTimeout(resetTooltipState, 1000);
        });
    });
});

const poems = [
    {
        title: "Le foetus et le squelette",
        slug: "le-foetus-et-le-squelette",
        image: "https://artlambi.github.io/poetry/img/foetus-squelette.jpg",
        date: "2020-06-04", // June 4, 2020
        text: `Deux conditions, de deux vies
L'une à commencer, l'autre finie
Le fœtus est, mais pas encore vraiment
Le squelette n'est plus, depuis longtemps

Tout à apprendre d'un côté
L'autre déjà presqu'oublié
Séparés par la vie
Cette drôle d'histoire, jamais choisie

J'imagine une conversation
Entre ces deux faux compagnons
(Le fœtus en italique
L'autre plus classique)

<em>Je vois une lumière, là, à l'horizon !</em>
Ne te fais pas trop d'illusions
<em>Je ne comprends pas</em>
Sois patient et tu verras

<em>Raconte-moi du moins ton vécu</em>
A toi qui n'est qu'au début ?
<em>Je meurs d'apprendre, dis-moi !</em>
Hé, tu parles à un mort, ça va ?

<em>Pardon, j'avais presqu'oublié…</em>
Que je suis presque désossé ?
<em>Pour moi, c'est encore l'obscurité</em>
Moi, je l'ai retrouvée

<em>Que puis-je attendre de la vie ?</em>
Du bonheur, et bien de soucis
<em>Parle-moi de l'amour</em>
Celui d'un jour ou « pour toujours » ?

<em>Cela m'est bien égal</em>
Des joies qui peuvent faire mal
<em>Et des enfants, tu en as, dis ?</em>
Oui, deux, à mon avis…

<em>Tu me sembles un peu douter</em>
Non, non, je ne faisais que rêver
<em>Quoi, tu en voulais plus encore ?</em>
Bien sûr, mais j'avais tort

<em>Réponse bizarre, et je ne suis pas devin</em>
On ne choisit pas son destin
<em>Je ne comprends toujours pas</em>
On donne, on prend, et c'est comme ça

<em>En somme, la vie vaut-elle la peine ?</em>
Pleine de surprises, souvent sereine
<em>C'est quoi ce charabia ? ?</em>
Relis tes questions, et tu verras

<em>As-tu jamais eu peur de mourir ?</em>
Je suis mort armé d'un sourire
<em>Je te comprends de moins en moins</em>
Il faut bien que tout ait une fin

<em>Mais dis-moi donc ce qui m'attend !</em>
Je ne sais pas, cela dépend
<em>De qui, de quoi, par pitié ?</em>
De ceux que tu vas rencontrer

<em>Je ne sais vraiment plus quoi penser</em>
Bienvenu à la fatalité
<em>Une toute dernière question ?</em>
Je t'écoute, vas-y, sans façon

<em>La vie n'est-elle qu'un interlude ?</em>
Bien entendu, c'est une certitude
<em>Le néant avant, le néant après ?</em>
……………………………………… 

Le squelette, sachant
Resta muet`
    },
    {
        title: "Anaïs",
        slug: "anais",
        date: "2020-04-28", // April 28, 2020
        text: `Dire que tu n'as même pas un an…
Toi, fruit de l'amour de tes parents
Jamais sans doute tu ne sauras
Combien j'ai rêvé de toi

Pendant de nombreuses années je me suis dit :
J'aimerais tellement avoir une petite-fille
Et puis voilà, tu es arrivée
Grande, forte, et déjà étonnée

Douce Anaïs, souriante, encore bébé
C'est inévitable, je ne peux que t'aimer
Tes superbes yeux bleus
Reflets des océans et des cieux

Ne sont qu'un seul témoin de ta beauté
Que ton caractère ne fait que renforcer
Ta volonté de vouloir t'élever
De marcher dès demain sur tes deux pieds

Est preuve de vouloir avancer
Prête à découvrir le monde entier
Va ! Va et s'il te plaît jouis
De tous les plaisirs de la vie

Fais face avec courage aux contretemps
Qui ne seront alors que des passants
Et même quand ils seraient trop durs à supporter
Sache que ceux qui t'aiment seront toujours à tes côtés

A tout jamais je serai ton Papy Junior
A tout jamais, même après ma m...`
    },
    {
        title: "30 ans en 30 lignes",
        slug: "30-ans-en-30-lignes",
        date: "2019-03-18", // March 18, 2019
        text: `Avoir trente ans, et réfléchir
Leçons du passé, espoirs et désirs

Es-tu à un peu moins d'un tiers, à la moitié ?
Impossible à prédire, ni à deviner
C'est le parcours qui compte, et ses virages
Les choix à faire. Et le bagage

De plus en plus à faire, à découvrir
En toujours moins de temps
Et en être très conscient
Oui, cela fait parfois souffrir

Une femme à chérir, des enfants à éduquer
L'amour à aimer. L'amitié à partager
Le boulot qui te permet de vivre
Sans que l'ambition ne te rende ivre

Des malchances à gérer
Des peines, inévitables, à accepter
Du bonheur à cultiver
Des rires et des larmes à mêler

Sans cesse aussi se développer
Et être conscient de l'absurdité
Du nationalisme extrême et de certaines religions
Tu ne voudras pas mourir couillon…

Plus tu apprendras, et moins tu sauras
Triste frustration, mais c'est comme ça
Le sprint prendra la place du marathon
Et parfois pourtant tu n'avanceras qu'à tâtons

Vise à pouvoir dire, à la fin :
''Je suis content de mon chemin
C'est fini ? Tant pis et… salut…
Mais quelle tristesse qu'on ne se verra plus...''`
    },
    {
        title: "Ode à la pomme de terre",
        slug: "ode-a-la-pomme-de-terre",
        image: "https://artlambi.github.io/poetry/img/pomme-de-terre.jpg",
        date: "2020-04-28", // April 28, 2020
        text: `Oh Chère Patate

Quand je t'ai vue
Pour la première fois
Tu ne me faisais
Ni chaud ni froid

J'avais encore
Un très jeune âge
Et toi, tu te trouvais
Dans mon potage

Plus tard j'ai commencé 
A te trouver chouette
Succulente même
Sous ta forme de croquette


En tant que 
Pomme vapeur
Tu me mets 
Tout en chaleur


Et non, ce n'est pas 
Dans la friture
Que tu prends ton aspect
 Le plus pur

Quoique, quand tu deviens
 Pomme allumette
Je ne peux qu'admirer
 Ta svelte silhouette

Et quand je te vois 
En chemise
L'extase n'est plus 
Une surprise


Finalement, et je l'affirme 
Sans me gêner
J'adore tellement
 Te faire sauter

As-tu droit 
A un titre de noblesse ?
Bien sûr mon amie
Que penses-tu de… Duchesse ?


Chère Patate,
S'il te plaît
Ne nous laisse jamais tomber
Sinon c'est nous
Qui serions… dans la purée….`
    },
    {
        title: "L'essentiel retrouvé ?",
        slug: "l-essentiel-retrouve",
        date: "2020-05-01", // May 1, 2020
        text: `Humanité, amitié, fraternité :
Voilà l'essentiel, oublié

Les raisons en sont nombreuses
Et, hélas, souvent scabreuses

Carrière, ambitions, argent
Prestige, luxe éblouissant

Nationalisme frénétique
Religions fanatiques

Le grand « je », le grand « nous »
Oubliant le « tu », et le « vous »

Ou pire encore, crachant dessus
Les autres ? Que de superflus…

Ma petite-fille aura bientôt un an
Mais quel avenir l'attend ?

Nous ne pourrons nous voir pour la fêter
Et j'en ai déjà le cœur brisé

Je n'ai jamais prié, n'y trouvant aucun réconfort
Mais pour Anaïs, je veux bien faire un effort

Espérant qu'à la fin de cette misère
Apparaisse enfin un brin de lumière

Qui lui ouvre un nouveau ciel
Qui lui apprend le véritable essentiel

Non pas celui du passé
Mais celui d'une seule humanité

Unie, forte et déterminée
A redécouvrir la vraie fraternité…`
    },
    {
        title: "L'Orpheline de guerre...",
        slug: "l-orpheline-de-guerre",
        date: "2021-07-04", // July 4, 2021
        text: `Je suis un GRAND enfant
J'aurai bientôt NEUF ans !

On me dit : "Tu n'as plus de parents"
Depuis très très longtemps

Je ne comprends pas
Essaie de savoir pourquoi

Des vieux m'ont fait savoir
Que je ne pourrai plus les voir

Il paraît qu'une bombe est tombée
Tout juste dans notre cheminée

Il y avait un grand éclat
Et mes parents n'étaient plus là

Mon petit frère non plus
Lui aussi avait disparu

Je me souviens d'une grosse poussière
Comme si c'était arrivé hier

L'obscurité m'a fait très peur
Des voisins m'ont trouvée en pleurs

Ils m'ont pris dans leurs bras
Pour m'enlever loin de chez moi

Je n'ai toujours pas compris
Pourquoi je me trouve ici

Loin de Maman, loin de Papa
On m'a dit qu'ils sont dans l'au-delà

C'est où, cet endroit ?
Pourquoi n'en reviennent-ils pas ?

Il y a des trains, des voitures, des avions…
Les chemins sont-ils tellement longs ?

Je continue à espérer
Qu'un jour je puisse les retrouver

Ailleurs, très très loin d'ici
Et à y vivre, ensemble, sans soucis

J'aimerais tellement rester enfant
Et grandir en m'amusant…`
    },
    {
        title: "Membre de l'humanité",
        slug: "membre-de-l-humanite",
        date: "2020-05-01", // May 1, 2020
        text: `Membre de l'humanité
Sans n'avoir rien demandé

Sentiments mitigés
Honte et fierté

Être encore primitif
Négatif, positif

A la quête de bonheur
D'amour, de douceur

En quasi éternel conflit
Souvent avec soi-même, sinon avec autrui

200.000 ans d'histoire
Long, peine à y croire

Homme de cro-magnon
C'était hier à peine, non ?

Tout au début
Batailles entre tribus

     Puis boucheries des croisades. Oubliées ?
Des milliers de gorges tranchées

Empire romain ?
Sublime selon certains ?

Soumission et barbarie
Coûtant d'innombrables vies

Siècle de Lumière ?
Suivi de nombreuses guerres

Guerres napoléoniennes, criminelles
Soif de pouvoir personnelle

La guerre de cent ans

Deux grands conflits mondiaux
L'hécatombe, au bas mot

Plus récent, l'horreur du Balcan
Impitoyable, assassinant aveuglement

Parler alors de culture supérieure ?
Soyons modeste, avec pudeur

Combien de morts ?
Qui avait raison, et qui tort ?

Chaque défunt, une tristesse
Famille et amis en détresse

Une centaine de milliards avant nous
A la vie avait pris goût

Et puis, ils en furent déchirés

Ah oui, il y aussi du positif
J'essaie de me souvenir du bon
Mais ce soir….


Homme redéfinit, grâce à un virus ?
Espoir…. N'en disons pas plus…`
    },
    {
        title: "Basta il dolore",
        slug: "basta-il-dolore",
        date: "2021-09-15", // September 15, 2021
        text: `Come dire
A chi non vuole sentire
Le tue parole
Parole d'amore
E di dolore
Hai speranza
Ma anche paura
Un sogno è lì
Ma allo stesso tempo
È lontano da qui
Tu sei sincero
Ma sempre in dubbio
Perché non sai 
E forse non saprai mai
Che ne pensa
Questa bella donna
Mai, una vita insieme ?
O è per sempre
L'ultima illusione ?
Aspetti <em>la sua</em> mano
E guardi la tua 
Con calma
Perché tu, non voglio
Distruggere il sogno...

Spero che un giorno`
    },
    {
        title: "Een moment van diep geluk",
        slug: "een-moment-van-diep-geluk",
        date: "2022-12-30", // December 30, 2022 (newest poem!)
        text: `Kwam het door een glimlach
Die ik even zag?

Of was het een woord, een blik 
Een tel van een ogenblik?

Een gedachte of een beeld
Ooit met iemand gedeeld?

Een parfum met een herinnering 
Een lang vergeten omhelzing?

Een bloem en haar pracht
Een vriend(in) die aan mij dacht?

Kwam het door muziek, of een ander mooi geluid?
Het maakt allemaal niet uit

Wat er echt toe doet:
Het deed me goed

Het helpt niet, te zitten kniezen
Ooit moet je wel kiezen

Niet voor optimisme
Noch voor pessimisme

Die twee vijanden van elkaar
En beiden onbetrouwbaar

Ik kies voor idealisme
Met zin voor realisme

Het is nooit alles kommer noch kwel
Ga! Ga en leef wel.`
    },
    {
        title: "Op de bergtop",
        slug: "op-de-bergtop",
        date: "2021-09-30", // September 30, 2021
        text: `Daar in de Pyreneeën
Met zicht op zeeën

Hoogte en horizon
Niet verblind door zon

Denken op die bergtop
Gedachten in mijn kop

Ik bekijk die bergen
Die chaos verbergen

Ontstaan uit vuur 
Dat heet vandaag natuur

De apocalyps, voorbij
Geen mens, geen god nabij

Het onbegrijpelijke was daar
Maar nog niet klaar

De mensheid werd geboren
De evolutie doorbroken

En dan, sedertdien…
Geen plezier om te zien

Vechten om macht
Om aanzien en pracht

Eerst ging het om stammen
Geweld, niet meer in te dammen

Dan strijdende legioenen
Met domme visioenen

Eenvoud als mens verloren
De andere niet horen

Mens, je bent erg
Ik val van mijn berg…`
    },
    {
        title: "De ring",
        slug: "de-ring",
        date: "2022-05-25", // May 25, 2022
        text: `Ik zoek naar de ring
Die ooit mijn vinger sierde
Wat ik zo lang vierde
En toch verging

Ik zoek naar een reden
Vrees geen waarheid
Denk aan voorbije tijd
Nu lang verleden

Ja, het is voorbij
Sedert jaren al
Toch een 

Wij nooit meer zij aan zij
Maar je gaf mij kind'ren
Twee`
    },
    {
        title: "De traan",
        slug: "de-traan",
        date: "2021-09-12", // September 12, 2021
        text: `Het begon met een traan
Niet meer weten wat gedaan

Raden naar het waarom
Het voelde zo dom

Een echte reden was er niet
Zomaar, plots verdriet

Denken aan het verleden
Te dikwijls geleden?

Toch veel geluk gekend
Liefde, mij wel bekend

Ouders, kinderen, een vriendin
Die ik bovenal bemin

Vrienden, loyaal en trouw
De perfecte, mooie vrouw

Maar de wereld rondom mij?
Klotemaatschappij!

Altijd wel ergens oorlog

En toch blijft hij bestaan
Die verdomde traan

Maar doet ook deugd
De voorbode van vreugd?`
    },
    {
        title: "Zandkorrel",
        slug: "zandkorrel",
        date: "2021-09-23", // September 23, 2021
        text: `Meer sterren 
In het heelal

Dan zandkorrels
In dit dal 

Licht in de hoogte
Voeten op de droogte

Het voelen van eindigheid
Opkijken naar eeuwigheid

Woestijnen, de wereld rond
'Schoonheid'? Ongegrond

Amper leven, het niets
Dwalen, zoeken naar iets

Een oase, en water
Met hoop op een later

Kijk naar omhoog 
Boven die aardse boog

Zie het firmament
Geniet van het moment

Die schitteringen
En schakeringen

Doen dromen van meer
Weer en weer en weer

Maar ook, wat géén ster kan….

Eén zandkorrel volstaat
En maakt van liefde haat….`
    },
    {
        title: "Die kus",
        slug: "die-kus",
        date: "2021-07-04", // July 4, 2021
        text: ` 's Avonds. Duisternis

Of toch niet, er is een kaars 
Zachte muziek ook

Handen zoeken
En vinden handen

Die tedere aanraking
Van vingers
Eén voor één

Ogen zoeken 
En vinden ogen
Een glinstering

Ogen worden spiegels
Geluk ontmoet geluk
Verlangen vindt verlangen

Geen woord, enkel een zucht
Warmte in harten
Angst ook, voor verlies

Die laatste stap nog
Naar Het Verbond

De muziek valt stil
De kaars is uit

Maar wat dan nog? 
Toen kwam hij toch

Die Kus…`
    }
];

// Throttle a handler to one call per animation frame.
// Preserves `this` and the latest event.
function rafThrottle(handler) {
    let ticking = false;
    let lastEvent;
    return function rafThrottled(event) {
        lastEvent = event;
        if (ticking) return;
        ticking = true;
        const self = this;
        requestAnimationFrame(() => {
            handler.call(self, lastEvent);
            ticking = false;
        });
    };
}

const state = {
    currentIndex: 0,
    clickedCard: null,
    originalClickedCard: null,
    savedScrollPosition: 0,
    lastModalScrollTop: 0,
    isScrollingUp: false,
};
const grid = document.getElementById('grid');
const modal = document.getElementById('modal');
const modalPaper = document.getElementById('modalPaper');
const modalControls = document.querySelector('.modal-controls');
const navPrev = document.getElementById('navPrev');
const navNext = document.getElementById('navNext');
const shareBtn = document.getElementById('shareBtn');
const closeBtn = document.getElementById('closeBtn');
const poemNavPrev = document.getElementById('poemNavPrev');
const poemNavNext = document.getElementById('poemNavNext');
const poemNavClose = document.getElementById('poemNavClose');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalImage = document.getElementById('modalImage');
const modalImageContainer = document.getElementById('modalImageContainer');
const illustrationCredit = document.getElementById('illustrationCredit');

// Helper function to wrap words in spans, tagging each with --i for the
// CSS-driven stagger in style.css (.words-in .word).
function wrapWords(text) {
    let i = 0;
    return text.split(/(<br>|\n)/).map(part => {
        if (part === '<br>' || part === '\n') {
            return '<br>';
        }
        return part.split(' ').map(word => {
            if (word.trim()) {
                return `<span class="word" style="--i:${i++}">${word}</span>`;
            }
            return word;
        }).join(' ');
    }).join('');
}

// Trigger the staggered word reveal. The actual timing is in CSS; we just
// toggle .words-in (with a reflow) so re-entry restarts the animation.
function animateWordsIn(container) {
    container.classList.remove('words-in');
    void container.offsetWidth;
    container.classList.add('words-in');
}

// Deep linking helper functions
function getSlug(title) {
    return title
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

function updateHash() {
    try {
        const slug = getSlug(displayPoems[state.currentIndex].title);
        history.replaceState(null, '', '#' + slug);
    } catch (e) {
        // Ignore errors in iframe/restricted contexts
    }
}

function clearHash() {
    try {
        history.replaceState(null, '', window.location.pathname);
    } catch (e) {
        // Ignore errors in iframe/restricted contexts
    }
}

// Share functionality
function getShareUrl() {
    const poem = displayPoems[state.currentIndex];
    const slug = poem.slug || getSlug(poem.title);
    const baseUrl = window.location.origin;
    return `${baseUrl}/${slug}.html`;
}

function copyShareUrl() {
    const url = getShareUrl();

    navigator.clipboard.writeText(url).then(() => {
        if (window._haptics) window._haptics.trigger('success');
        shareBtn.classList.add('copied');

        setTimeout(() => {
            shareBtn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        if (window._haptics) window._haptics.trigger('error');
        console.error('Failed to copy URL:', err);
    });
}

shareBtn.addEventListener('click', copyShareUrl);


const displayPoems = poems;

// Create grid cards
displayPoems.forEach((poem, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'poem-card-wrapper';
    
    const card = document.createElement('div');
    card.className = 'poem-card';
    card.dataset.index = index;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-haspopup', 'dialog');
    card.innerHTML = `
        <h2 class="title">${poem.title}</h2>
        <p class="preview">${poem.text}</p>
    `;
    card.addEventListener('click', function() {
        if (window._haptics) window._haptics.trigger('medium');
        openModal(index, card);
        updateHash();
    });
    
    card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (window._haptics) window._haptics.trigger('medium');
            openModal(index, card);
            updateHash();
        }
    });

    // Cursor-following 3D tilt effect
    card.addEventListener('mousemove', rafThrottle(function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -1.5;
        const rotateY = (x - centerX) / centerX * 1.5;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }));

    card.addEventListener('mouseleave', function() {
        card.style.transform = 'rotateX(0) rotateY(0)';
    });
    
    const hoverTitle = document.createElement('div');
    hoverTitle.className = 'hover-title';
    hoverTitle.textContent = poem.title;
    
    wrapper.appendChild(card);
    wrapper.appendChild(hoverTitle);
    grid.appendChild(wrapper);
});

function openModal(index, card) {
    state.currentIndex = index;
    state.clickedCard = card;
    state.originalClickedCard = card;
    
    const poem = displayPoems[state.currentIndex];
    
    // Set full content immediately (overflow hidden will clip it)
    modalTitle.textContent = poem.title;
    // Convert line breaks to <br> while preserving HTML tags like <em>
    // Don't wrap words initially - they're only wrapped during transitions
    modalText.innerHTML = poem.text.replace(/\n/g, '<br>');
    
    // Set image if available
    if (poem.image) {
        modalImage.src = poem.image;
        modalImage.alt = 'Illustration pour ' + poem.title;
        modalImage.classList.remove('zoomed-out');
        modalImageContainer.style.display = '';
        illustrationCredit.style.display = '';
        illustrationCredit.classList.remove('visible');
    } else {
        modalImage.src = '';
        modalImageContainer.style.display = 'none';
        illustrationCredit.style.display = 'none';
    }
    
    // Save scroll position before hiding body
    state.savedScrollPosition = window.scrollY;
    
    // Hide card
    card.style.opacity = '0';
    
    // Get the clicked card's position
    const rect = card.getBoundingClientRect();
    
    // Set initial position to match the card
    modalPaper.style.transition = 'none';
    modalPaper.classList.remove('fullscreen');
    modalPaper.style.top = rect.top + 'px';
    modalPaper.style.left = rect.left + 'px';
    modalPaper.style.width = rect.width + 'px';
    modalPaper.style.height = rect.height + 'px';
    
    // Force reflow
    modalPaper.offsetHeight;
    
    // Show modal and animate to fullscreen
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    
    // Animate to fullscreen
    modalPaper.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    modalPaper.style.top = '0';
    modalPaper.style.left = '0';
    modalPaper.style.width = '100vw';
    modalPaper.style.height = '100vh';
    modalPaper.style.bottom = '';
    modalPaper.classList.add('fullscreen');
    modal.classList.remove('scrolling-up'); // Ensure nav is hidden on open

    // Reset scroll tracking
    state.lastModalScrollTop = 0;
    modalPaper.scrollTop = 0;

    // Lock body scroll
    document.body.style.top = `-${state.savedScrollPosition}px`;
    document.body.classList.add('modal-open');

    // Update theme-color to match modal background so Safari toolbar is seamless
    var isDark = document.documentElement.classList.contains('dark-mode');
    document.querySelector('meta[name="theme-color"]').setAttribute('content', isDark ? '#202020' : '#ffffff');

    // Focus modal paper for keyboard scrolling
    setTimeout(() => {
        modalPaper.focus();
    }, 100);
}

function closeModal() {
    // Restore theme-color to match page background
    var isDark = document.documentElement.classList.contains('dark-mode');
    document.querySelector('meta[name="theme-color"]').setAttribute('content', isDark ? '#121212' : '#ecebeb');

    // Reset share button state
    shareBtn.classList.remove('copied');

    const isMobile = window.innerWidth <= 768;
    
    if (state.clickedCard) {
        // Reset modal scroll position and remove scrolled class
        modalPaper.scrollTop = 0;
        modalPaper.classList.remove('scrolled');
        modal.classList.remove('scrolling-up');
        modalTitle.classList.remove('sticky', 'visible', 'at-top');
        
        // Hide controls
        modalControls.style.transition = 'opacity 0.15s ease';
        modalControls.style.opacity = '0';
        navPrev.style.transition = 'opacity 0.15s ease';
        navPrev.style.opacity = '0';
        navNext.style.transition = 'opacity 0.15s ease';
        navNext.style.opacity = '0';
        
        const cardContent = modalPaper.querySelector('.card-content');
        
        // ALWAYS clear cardContent padding immediately, regardless of mobile/desktop
        if (cardContent) {
            cardContent.style.paddingTop = '';
        }
        
        // Remove settled so inline styles take effect again for close animation
        if (isMobile) {
            // On mobile: fade out modal, then restore scroll, then show card
            modalPaper.style.transition = 'opacity 0.25s ease';
            modalPaper.style.opacity = '0';
            
            setTimeout(() => {
                // Now restore scroll while modal is invisible
                
                document.body.classList.remove('modal-open');
                document.body.style.top = '';
                window.scrollTo(0, state.savedScrollPosition);
                
                // Reset modal state
                modal.classList.remove('active');
                modal.setAttribute('aria-hidden', 'true');
                if (state.originalClickedCard) state.originalClickedCard.focus({ preventScroll: true });
                modalPaper.classList.remove('fullscreen');
                modalPaper.style.cssText = '';

                if (cardContent) {
                    cardContent.style.cssText = '';
                }
                
                // Show the card
                state.clickedCard.style.opacity = '1';

                // Reset controls
                modalControls.style.cssText = '';
                navPrev.style.cssText = '';
                navNext.style.cssText = '';
            }, 250);
        } else {
            // On desktop: full position animation
            // Unlock scroll and restore position
            
            document.body.classList.remove('modal-open');
            document.body.style.top = '';
            window.scrollTo({ top: state.savedScrollPosition, left: 0, behavior: 'instant' });
            
            // Wait for next frame to ensure scroll is complete
            requestAnimationFrame(() => {
                // Get card position after scroll restoration
                const rect = state.clickedCard.getBoundingClientRect();
                
                // Set current padding inline so it can transition when fullscreen class is removed
                cardContent.style.paddingTop = '100px';
                
                // Force reflow
                cardContent.offsetHeight;
                
                // Now animate padding to 0
                cardContent.style.paddingTop = '0';
                
                // Animate back to card position
                modalPaper.classList.remove('fullscreen');
                modalPaper.style.top = rect.top + 'px';
                modalPaper.style.left = rect.left + 'px';
                modalPaper.style.width = rect.width + 'px';
                modalPaper.style.height = rect.height + 'px';
                
                // Fade out modal paper and show card at the end
                setTimeout(() => {
                    modalPaper.style.opacity = '0';
                    state.clickedCard.style.opacity = '1';
                }, 400);
                
                setTimeout(() => {
                    modal.classList.remove('active');
                    modal.setAttribute('aria-hidden', 'true');
                    if (state.originalClickedCard) state.originalClickedCard.focus({ preventScroll: true });
                    modalPaper.style.cssText = '';
                    cardContent.style.cssText = '';
                    modalControls.style.cssText = '';
                    navPrev.style.cssText = '';
                    navNext.style.cssText = '';
                }, 550);
            });
        }
    } else {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');

        document.body.classList.remove('modal-open');
        document.body.style.top = '';
        window.scrollTo(0, state.savedScrollPosition);
        if (state.originalClickedCard) state.originalClickedCard.focus({ preventScroll: true });
    }
}

closeBtn.addEventListener('click', () => {
    if (window._haptics) window._haptics.trigger('light');
    closeModal();
    setTimeout(clearHash, 550);
});

// Navigation arrows
navPrev.addEventListener('click', () => {
    if (window._haptics) window._haptics.trigger('selection');
    navigatePoem(-1);
});

navNext.addEventListener('click', () => {
    if (window._haptics) window._haptics.trigger('selection');
    navigatePoem(1);
});

// Inline poem navigation buttons
poemNavPrev.addEventListener('click', () => {
    if (window._haptics) window._haptics.trigger('selection');
    navigatePoem(-1);
});

poemNavNext.addEventListener('click', () => {
    if (window._haptics) window._haptics.trigger('selection');
    navigatePoem(1);
});

poemNavClose.addEventListener('click', () => {
    if (window._haptics) window._haptics.trigger('light');
    closeModal();
    setTimeout(clearHash, 550);
});

function navigatePoem(direction) {
    const newIndex = state.currentIndex + direction;
    
    // Wrap around
    const targetIndex = newIndex < 0 ? displayPoems.length - 1 : newIndex >= displayPoems.length ? 0 : newIndex;
    
    const cardContent = modalPaper.querySelector('.card-content');

    // Start exit animation
    cardContent.classList.add('transitioning-out');
    
    // After exit animation completes, update content and start enter animation
    setTimeout(() => {
        // Update content
        const poem = displayPoems[targetIndex];
        state.currentIndex = targetIndex;
        
        modalTitle.textContent = poem.title;
        // Set title opacity to 0 immediately so it doesn't flash
        modalTitle.style.opacity = '0';

        // Wrap words and set initial state (invisible)
        const wrappedText = wrapWords(poem.text.replace(/\n/g, '<br>'));
        modalText.innerHTML = wrappedText;

        // Update image if available
        if (poem.image) {
            modalImage.src = poem.image;
            modalImage.alt = 'Illustration pour ' + poem.title;
            modalImageContainer.style.display = '';
            illustrationCredit.style.display = '';
            illustrationCredit.classList.remove('visible');
        } else {
            modalImage.src = '';
            modalImageContainer.style.display = 'none';
            illustrationCredit.style.display = 'none';
        }
        
        // Reset scroll position
        modalPaper.scrollTop = 0;
        modalPaper.classList.remove('scrolled');
        modalTitle.classList.remove('sticky', 'visible');
        
        // Update hash
        updateHash();
        
        // Restore original card opacity and update state.clickedCard for close animation
        if (state.originalClickedCard) {
            state.originalClickedCard.style.opacity = '1';
        }
        state.clickedCard = document.querySelector(`.poem-card[data-index="${targetIndex}"]`);
        state.clickedCard.style.opacity = '0';
        state.originalClickedCard = state.clickedCard;
        
        // Remove exit animation class and add enter animation class
        cardContent.classList.remove('transitioning-out');
        cardContent.classList.add('transitioning-in');
        
        // Animate words in sequence (CSS-driven stagger; see style.css)
        setTimeout(() => {
            animateWordsIn(modalText);
        }, 100);
        
        // Remove enter animation class after it completes
        setTimeout(() => {
            cardContent.classList.remove('transitioning-in');
            // Reset title opacity
            modalTitle.style.opacity = '';
        }, 1000);
    }, 400);
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        if (window._haptics) window._haptics.trigger('light');
        closeModal();
        setTimeout(clearHash, 550);
    }
});

document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        if (window._haptics) window._haptics.trigger('light');
        closeModal();
        setTimeout(clearHash, 550);
    } else if (e.key === 'Tab') {
        // Trap focus within the modal so Tab can't escape into the (hidden) page.
        const focusable = Array.from(
            modal.querySelectorAll('button:not([disabled])')
        ).filter(el => el.offsetParent !== null);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const idx = focusable.indexOf(document.activeElement);
        if (idx === -1) {
            // Focus is outside the trap (e.g., on modalPaper). Pull it in.
            e.preventDefault();
            (e.shiftKey ? last : first).focus();
        } else if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    } else if (e.key === 'ArrowUp') {
        // Scroll up
        e.preventDefault();
        modalPaper.scrollBy({ top: -40, behavior: 'smooth' });
    } else if (e.key === 'ArrowDown') {
        // Scroll down
        e.preventDefault();
        modalPaper.scrollBy({ top: 40, behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft') {
        // Navigate to previous poem (always works)
        e.preventDefault();
        if (window._haptics) window._haptics.trigger('selection');
        navigatePoem(-1);
    } else if (e.key === 'ArrowRight') {
        // Navigate to next poem (always works)
        e.preventDefault();
        if (window._haptics) window._haptics.trigger('selection');
        navigatePoem(1);
    } else if (e.key === 'PageUp') {
        e.preventDefault();
        modalPaper.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
    } else if (e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        modalPaper.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    } else if (e.key === 'Home') {
        e.preventDefault();
        modalPaper.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (e.key === 'End') {
        e.preventDefault();
        modalPaper.scrollTo({ top: modalPaper.scrollHeight, behavior: 'smooth' });
    }
});

// Forward scroll events from nav areas to modal paper
navPrev.addEventListener('wheel', (e) => {
    if (modal.classList.contains('active')) {
        modalPaper.scrollTop += e.deltaY;
        e.preventDefault();
    }
}, { passive: false });

navNext.addEventListener('wheel', (e) => {
    if (modal.classList.contains('active')) {
        modalPaper.scrollTop += e.deltaY;
        e.preventDefault();
    }
}, { passive: false });

function openPoemByHash() {
    const hash = window.location.hash.slice(1);
    if (hash) {
        // Find in shuffled array
        const index = displayPoems.findIndex(p => (p.slug || getSlug(p.title)) === hash);
        if (index !== -1) {
            const poem = displayPoems[index];
            const card = document.querySelector(`.poem-card[data-index="${index}"]`);
            
            // Update Open Graph and Twitter meta tags
            document.getElementById('og-title').setAttribute('content', poem.title + ' - Christian Lambillotte');
            document.getElementById('og-description').setAttribute('content', poem.text.substring(0, 150) + '...');
            document.getElementById('twitter-title').setAttribute('content', poem.title + ' - Christian Lambillotte');
            document.getElementById('twitter-description').setAttribute('content', poem.text.substring(0, 150) + '...');
            
            if (poem.image) {
                document.getElementById('og-image').setAttribute('content', poem.image);
                document.getElementById('twitter-image').setAttribute('content', poem.image);
            }
            
            if (card) {
                openModal(index, card);
                updateHash();
            }
        }
    }
}

// Check for hash on page load
window.addEventListener('load', openPoemByHash);
window.addEventListener('hashchange', openPoemByHash);

// Update copyright year
const currentYear = new Date().getFullYear();
document.getElementById('year').textContent = currentYear;
document.querySelector('.modal-year').textContent = currentYear;

// Cycle subtitle text with vertical slide
const subtitleTexts = document.querySelectorAll('.subtitle-text');
let currentSubtitle = 0;

const subtitleTimer = setInterval(() => {
    const current = subtitleTexts[currentSubtitle];
    const next = subtitleTexts[(currentSubtitle + 1) % subtitleTexts.length];

    current.classList.remove('active');
    current.classList.add('exit');

    next.classList.remove('exit');
    next.classList.add('active');

    // Reset exit class after transition
    setTimeout(() => {
        current.classList.remove('exit');
    }, 600);

    currentSubtitle = (currentSubtitle + 1) % subtitleTexts.length;
}, 6000);

window.addEventListener('pagehide', () => clearInterval(subtitleTimer));

// Header scroll effect
const pageHeader = document.querySelector('.page-header');
const headerHeight = pageHeader.offsetHeight;

window.addEventListener('scroll', rafThrottle(function() {
    if (window.scrollY > headerHeight * 0.75) {
        pageHeader.classList.add('scrolled');
    } else {
        pageHeader.classList.remove('scrolled');
    }
}));

// Staggered row animation on load
const cardWrappers = document.querySelectorAll('.poem-card-wrapper');
const cardsPerRow = window.innerWidth > 1100 ? 3 : window.innerWidth > 700 ? 2 : 1;

cardWrappers.forEach((wrapper, index) => {
    const row = Math.floor(index / cardsPerRow);
    setTimeout(() => {
        wrapper.classList.add('visible');
    }, 500 + (row * 120));
});

// Bio text scroll animation
const bioText = document.querySelector('.bio-text');
if (bioText) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                bioText.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    observer.observe(bioText);
}

// Bio image zoom effect on scroll (disabled on mobile)
const isMobile = window.matchMedia('(max-width: 768px)').matches;

if (!isMobile) {
    const bioPortraits = document.querySelectorAll('.bio-portrait');
    
    function updateBioImageZoom() {
        bioPortraits.forEach(portrait => {
            const rect = portrait.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate visible percentage
            const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
            const visiblePercent = Math.max(0, visibleHeight / rect.height);
            
            // Map visibility (10% to 100%) to scale (1.1 to 1.0)
            const startVisibility = 0.1;
            const progress = Math.max(0, Math.min(1, (visiblePercent - startVisibility) / (1 - startVisibility)));
            const scale = 1.1 - (progress * 0.1);
            
            portrait.style.setProperty('--bio-image-scale', scale);
        });
    }

    // Update on scroll
    window.addEventListener('scroll', rafThrottle(updateBioImageZoom));
    // Initial update
    updateBioImageZoom();
}

// Modal scroll handler for top fade effect and image zoom
modalPaper.addEventListener('scroll', rafThrottle(function() {
    const currentScrollTop = this.scrollTop;
    state.isScrollingUp = currentScrollTop < state.lastModalScrollTop;
    state.lastModalScrollTop = currentScrollTop;

    if (currentScrollTop > 20) {
        this.classList.add('scrolled');
    } else {
        this.classList.remove('scrolled');
    }

    // Show mobile nav when scrolling up (on mobile only)
    if (window.innerWidth <= 768) {
        if (state.isScrollingUp && currentScrollTop > 100) {
            modal.classList.add('scrolling-up');
        } else {
            modal.classList.remove('scrolling-up');
        }
    }

    // Show sticky title when scrolling up and main title is out of view
    const titleOriginalTop = 100; // padding-top of card-content
    const titleOutOfView = currentScrollTop > titleOriginalTop + 60; // title height ~60px
    
    if (state.isScrollingUp && titleOutOfView) {
        // Scrolling up and title would be out of view - make it sticky
        if (!modalTitle.classList.contains('sticky')) {
            modalTitle.classList.add('sticky');
            // Force reflow so browser registers the initial state
            modalTitle.offsetHeight;
            modalTitle.classList.add('visible');
        }
    } else if (state.isScrollingUp && !titleOutOfView && currentScrollTop > 0) {
        // Still scrolling up but title would be in view - keep sticky
        modalTitle.classList.add('sticky', 'visible');
    } else if (currentScrollTop === 0) {
        // Fully at top - instant remove
        modalTitle.classList.remove('sticky', 'visible');
    } else if (!state.isScrollingUp) {
        // Scrolling down - remove sticky, let it scroll naturally
        modalTitle.classList.remove('sticky', 'visible');
    }
    
    // Image zoom effect - progressive based on visibility
    if (modalImage.src && modalImageContainer.style.display !== 'none') {
        const containerRect = modalImageContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate visible percentage
        const visibleHeight = Math.min(containerRect.bottom, windowHeight) - Math.max(containerRect.top, 0);
        const visiblePercent = Math.max(0, visibleHeight / containerRect.height);
        
        // Map visibility (10% to 100%) to scale (1.1 to 1.0)
        // Below 10% visibility = scale 1.1, at 100% visibility = scale 1.0
        const startVisibility = 0.1;
        const progress = Math.max(0, Math.min(1, (visiblePercent - startVisibility) / (1 - startVisibility)));
        const scale = 1.1 - (progress * 0.1);
        
        modalImage.style.setProperty('--image-scale', scale);
        
        // Show credit when image bottom is at least 25px above viewport bottom (only once)
        if (containerRect.bottom < windowHeight - 25 && !illustrationCredit.classList.contains('visible')) {
            illustrationCredit.classList.add('visible');
        }
    }
}));

// Dark mode toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
        if (window._haptics) window._haptics.trigger('light');
        const html = document.documentElement;
        const isDark = html.classList.contains('dark-mode');

        // Enable smooth transition
        html.classList.add('theme-transition');

        const newColor = isDark ? '#ecebeb' : '#121212';
        if (isDark) {
            html.classList.remove('dark-mode');
            html.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
            window._setFavicon(false);
        } else {
            html.classList.remove('light-mode');
            html.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            window._setFavicon(true);
        }

        // Delay the theme-color update so the address bar starts animating
        // when the page bg has already shifted ~halfway. iOS Safari animates
        // the address bar quickly (~300ms), so without the delay it finishes
        // long before the 500ms page transition — that gap looks like a flicker.
        setTimeout(function() {
            document.querySelector('meta[name="theme-color"]').setAttribute('content', newColor);
        }, 250);

        // Remove transition class after animation completes
        setTimeout(function() {
            html.classList.remove('theme-transition');
        }, 550);
    });
}

