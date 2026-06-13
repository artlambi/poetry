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

// Poem data is loaded from poems.js (included before this script in
// index.html). After editing poems.js, run `node scripts/generate.js`
// to regenerate the files derived from it.

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
    savedScrollPosition: 0,
    lastModalScrollTop: 0,
    isScrollingUp: false,
    isNavigating: false,
    navTimeout: null,
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

// Wrap each word of raw poem text in a span, tagging it with --i for the
// CSS-driven stagger in style.css (.words-in .word). Newlines become <br>.
// <em> spans in the source can cover several words (see the markup contract
// in poems.js); re-balance them per word so each span contains valid,
// self-contained markup. Granularity is the word: a token that mixes italic
// and non-italic characters is wrapped whole.
function wrapWords(text) {
    let i = 0;
    let italic = false;
    return text.split('\n').map(line =>
        line.split(' ').map(word => {
            if (!word.trim()) {
                return word;
            }
            const tags = word.match(/<\/?em>/g) || [];
            const bare = word.replace(/<\/?em>/g, '');
            const wrapItalic = italic || tags.includes('<em>');
            for (const tag of tags) italic = (tag === '<em>');
            const content = wrapItalic ? `<em>${bare}</em>` : bare;
            return `<span class="word" style="--i:${i++}">${content}</span>`;
        }).join(' ')
    ).join('<br>');
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

// Single place that decides a poem's slug (explicit slug, derived fallback).
// Used by the hash writer, the share URL, and the hash-open lookup \u2014 keep
// them consistent or deep links silently stop matching.
function getPoemSlug(poem) {
    return poem.slug || getSlug(poem.title);
}

function updateHash() {
    try {
        const slug = getPoemSlug(displayPoems[state.currentIndex]);
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
    const slug = getPoemSlug(displayPoems[state.currentIndex]);
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

// Cancel a poem navigation that is still in its fade-out window. Without
// this, the pending timeout in navigatePoem fires after the modal is closed
// or reopened: it swaps the modal content, rewrites the hash, and hides the
// target poem's grid card (opacity 0) with nothing left to restore it.
function cancelPendingNavigation() {
    if (state.navTimeout) {
        clearTimeout(state.navTimeout);
        state.navTimeout = null;
    }
    state.isNavigating = false;
    // Drop the fade-out/fade-in classes so their `forwards` animations can't
    // leave the next modal's title and words invisible.
    modalPaper.querySelector('.card-content').classList.remove('transitioning-out', 'transitioning-in');
}

function openModal(index, card) {
    cancelPendingNavigation();
    state.currentIndex = index;
    state.clickedCard = card;

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
    cancelPendingNavigation();

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
                if (state.clickedCard) state.clickedCard.focus({ preventScroll: true });
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
                    if (state.clickedCard) state.clickedCard.focus({ preventScroll: true });
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
        if (state.clickedCard) state.clickedCard.focus({ preventScroll: true });
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
    // Ignore repeat presses until the current poem has faded out; otherwise
    // both calls compute their target from the same (stale) currentIndex.
    if (state.isNavigating) return;
    state.isNavigating = true;

    const newIndex = state.currentIndex + direction;

    // Wrap around
    const targetIndex = newIndex < 0 ? displayPoems.length - 1 : newIndex >= displayPoems.length ? 0 : newIndex;

    const cardContent = modalPaper.querySelector('.card-content');

    // Start exit animation
    cardContent.classList.add('transitioning-out');

    // After exit animation completes, update content and start enter animation.
    // The timeout is stored so openModal/closeModal can cancel it if the user
    // closes or reopens the modal during the fade-out window.
    state.navTimeout = setTimeout(() => {
        state.navTimeout = null;
        // Update content
        const poem = displayPoems[targetIndex];
        state.currentIndex = targetIndex;
        state.isNavigating = false;
        
        modalTitle.textContent = poem.title;
        // Set title opacity to 0 immediately so it doesn't flash
        modalTitle.style.opacity = '0';

        // Wrap words and set initial state (invisible)
        modalText.innerHTML = wrapWords(poem.text);

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
        if (state.clickedCard) {
            state.clickedCard.style.opacity = '1';
        }
        state.clickedCard = document.querySelector(`.poem-card[data-index="${targetIndex}"]`);
        state.clickedCard.style.opacity = '0';
        
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
        const index = displayPoems.findIndex(p => getPoemSlug(p) === hash);
        if (index !== -1) {
            const card = document.querySelector(`.poem-card[data-index="${index}"]`);
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

