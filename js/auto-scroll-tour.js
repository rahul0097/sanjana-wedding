(function () {
    'use strict';

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    var TOUR_STEPS = [
        {
            name: 'Hero Palace Cover',
            selector: '.im-hero-palace',
            duration: 5000 // 5 seconds on initial hero palace scene
        },
        {
            name: 'Wedding Invitation Scroll',
            selector: '.im-wording',
            duration: 11000 // 11 seconds (2s unroll animation + 9s reading time)
        },
        {
            name: 'Meet the Bride & Groom',
            selector: '.im-couple-profile',
            duration: 8000 // 8 seconds to view couple profiles
        },
        {
            name: 'Temple Doors & Countdown',
            selector: '.im-door-countdown',
            duration: 7000 // 7 seconds to view countdown timer
        },
        {
            name: 'Photo Memories',
            selector: '.im-gallery-coverflow',
            duration: 7000 // 7 seconds to enjoy photo cards
        },
        {
            name: 'Wedding Functions Booklet',
            selector: '.im-flipcal',
            duration: 8000 // 8 seconds to view wedding events booklet
        },
        {
            name: 'Venue & Directions',
            selector: '.im-venue-map',
            duration: 8000 // 8 seconds to view venue & map
        },
        {
            name: 'RSVP Form',
            selector: '#rsvp-section',
            duration: 7000 // 7 seconds on RSVP section
        },
        {
            name: 'Moments of Joy & Laughter Video',
            selector: '#celebration-video',
            duration: 6000 // 6 seconds on video teaser (stops if user plays)
        },
        {
            name: 'Wedding Quote & Blessings',
            selector: '.im-wedding-quote',
            duration: 0 // Reaches finale and completes
        }
    ];

    var tourActive = false;
    var tourCancelled = false;
    var tourTimer = null;
    var isProgrammaticScroll = false;

    function stopTour(reason) {
        if (!tourActive && tourCancelled) return;
        tourActive = false;
        tourCancelled = true;
        if (tourTimer) {
            clearTimeout(tourTimer);
            tourTimer = null;
        }
        removeUserInteractionListeners();
    }

    function onUserInteraction(e) {
        // If the interaction is user-initiated (wheel, touch, keyboard, pointer)
        if (!isProgrammaticScroll) {
            stopTour('user-' + e.type);
        }
    }

    function attachUserInteractionListeners() {
        var events = ['wheel', 'touchstart', 'touchmove', 'keydown', 'mousedown'];
        events.forEach(function (evt) {
            window.addEventListener(evt, onUserInteraction, { passive: true, capture: true });
        });
    }

    function removeUserInteractionListeners() {
        var events = ['wheel', 'touchstart', 'touchmove', 'keydown', 'mousedown'];
        events.forEach(function (evt) {
            window.removeEventListener(evt, onUserInteraction, { capture: true });
        });
    }

    function smoothScrollTo(element, callback) {
        if (!element) {
            if (callback) callback();
            return;
        }

        isProgrammaticScroll = true;

        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Clear programmatic scroll guard after smooth scroll animation completes (~1.2s)
        window.setTimeout(function () {
            isProgrammaticScroll = false;
            if (callback) callback();
        }, 1200);
    }

    function executeStep(stepIndex) {
        if (!tourActive || tourCancelled) return;
        if (stepIndex >= TOUR_STEPS.length) {
            stopTour('completed');
            return;
        }

        var step = TOUR_STEPS[stepIndex];
        var el = document.querySelector(step.selector);

        // If target element doesn't exist, skip to next
        if (!el) {
            executeStep(stepIndex + 1);
            return;
        }

        // For the first step (Hero Palace), we are already there; just pause the duration
        if (stepIndex === 0) {
            tourTimer = window.setTimeout(function () {
                if (!tourActive || tourCancelled) return;
                executeStep(stepIndex + 1);
            }, step.duration);
            return;
        }

        // For subsequent steps, smooth scroll to the target section
        smoothScrollTo(el, function () {
            if (!tourActive || tourCancelled) return;
            if (step.duration > 0) {
                tourTimer = window.setTimeout(function () {
                    if (!tourActive || tourCancelled) return;
                    executeStep(stepIndex + 1);
                }, step.duration);
            } else {
                stopTour('completed');
            }
        });
    }

    function startAutoTour() {
        if (tourActive || tourCancelled) return;

        // If the user has already scrolled down, do not start auto-tour
        var currentScroll = window.pageYOffset || document.documentElement.scrollTop || 0;
        if (currentScroll > 150) {
            tourCancelled = true;
            return;
        }

        tourActive = true;
        attachUserInteractionListeners();
        executeStep(0);
    }

    function init() {
        var hasCover = document.querySelector('.im-cover-gate, .im-cover-video, .im-cover-call');
        if (hasCover && !hasCover.classList.contains('is-closing')) {
            document.addEventListener('iw:cover-opened', function () {
                // Wait 500ms after cover completely finishes opening, then initiate tour
                window.setTimeout(startAutoTour, 500);
            }, { once: true });
        } else {
            // Already opened or no cover screen
            window.setTimeout(startAutoTour, 1000);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
