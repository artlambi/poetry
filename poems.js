// Poem data — the single source of truth for the site.
//
// Loaded by index.html before app.js. After editing this file, run
//   node scripts/generate.js
// to regenerate everything derived from it: the per-poem redirect pages,
// sitemap.xml, llms.txt, POEMS_LANGUAGE_LOG.md, and the noscript + JSON-LD
// sections of index.html.
//
// Markup contract: poem `text` supports plain text and inline <em>…</em>
// only. wrapWords() in app.js rebalances exactly that tag when splitting
// lines into per-word spans; any other tag will be mangled after a poem
// navigation. `summary` is the one-line description shown in llms.txt.

const poems = [
    {
        title: "Le foetus et le squelette",
        slug: "le-foetus-et-le-squelette",
        lang: "fr",
        summary: "Dialogue imaginaire entre un fœtus et un squelette sur la vie, la mort et ce qui se trouve entre les deux.",
        image: "img/foetus-squelette.jpg",
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
        lang: "fr",
        summary: "Poème d'un grand-père à sa petite-fille, célébrant sa naissance et lui souhaitant courage et bonheur.",
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
        lang: "fr",
        summary: "Réflexion sur le cap des trente ans, le parcours de vie, les choix et le bagage accumulé.",
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
        lang: "fr",
        summary: "Hommage humoristique et tendre à la pomme de terre sous toutes ses formes.",
        image: "img/pomme-de-terre.jpg",
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
        lang: "fr",
        summary: "Méditation sur l'humanité, l'amitié et la fraternité oubliées au profit de l'ambition et du nationalisme.",
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
        lang: "fr",
        summary: "Le récit poignant d'une enfant de neuf ans qui ne comprend pas pourquoi ses parents ne reviennent pas.",
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
        lang: "fr",
        summary: "Réflexion sur 200.000 ans d'histoire humaine, entre violence et espoir.",
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
        lang: "it",
        summary: "Poème d'amour et de doute, sur l'attente et l'espoir d'un geste de l'autre.",
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
        lang: "nl",
        summary: "Over een vluchtig moment van geluk en de keuze voor idealisme met zin voor realisme.",
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
        lang: "nl",
        summary: "Overpeinzingen op een bergtop in de Pyreneeën over de chaos van de mensheid.",
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
        lang: "nl",
        summary: "Kort gedicht over verlies, herinnering en wat overblijft na een relatie.",
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
        lang: "nl",
        summary: "Over een traan zonder reden, verdriet om de wereld en de voorbode van vreugde.",
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
        lang: "nl",
        summary: "Meditatie over de oneindigheid van het heelal, de nietigheid van de mens en de kracht van liefde.",
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
        lang: "nl",
        summary: "Een intiem gedicht over de spanning en tederheid die leiden tot een kus.",
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
