(function () {
    'use strict';

    /**
     * Royal Auto-Scroll Story Tour
     * Designed for mobile phones and desktop displays.
     * Guides guests smoothly through every chapter of the wedding celebration.
     * Immediately pauses / cancels if the guest chooses to manually scroll or swipe.
     */

    var tourActive = false;
    var tourCancelled = false;
    var tourTimer = null;
    var isProgrammaticScroll = false;
    var activeScrollAnim = null;

    // Touch gesture tracking (to distinguish simple taps from deliberate vertical scroll)
    var touchStartY = null;
    var touchStartX = null;

    function getTargetScrollY(selector, offsetRatio) {
        var el = document.querySelector(selector);
        if (!el) return null;

        var rect = el.getBoundingClientRect();
        var currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
        var elementTop = rect.top + currentScrollY;
        var viewportH = window.innerHeight || 800;

        // Special handling for photo memories stack track
        if (offsetRatio !== undefined && offsetRatio > 0) {
            var track = el.querySelector('[data-stack-track]') || el;
            var trackH = track.offsetHeight || rect.height;
            return Math.max(0, elementTop + (trackH * offsetRatio));
        }

        // If element is smaller than 85% of viewport height, center it vertically on screen
        if (rect.height < viewportH * 0.85) {
            return Math.max(0, Math.round(elementTop - (viewportH - rect.height) / 2));
        }

        // If element is taller than viewport (e.g. scroll, flip calendar), align neatly with breathing room at top
        var topPadding = Math.min(24, Math.round(viewportH * 0.03));
        return Math.max(0, Math.round(elementTop - topPadding));
    }

    function buildTourSteps() {
        var isMobile = window.innerWidth < 768;

        var steps = [
            {
                name: 'Hero Palace Cover',
                selector: '.im-hero-palace',
                duration: 5500 // 5.5s to view initial palace & couple names
            },
            {
                name: 'Wedding Invitation Scroll',
                selector: '.im-wording',
                duration: 10000 // 10s (unrolling shloka, parents & invitation request)
            }
        ];

        if (isMobile) {
            // On mobile phones, show Bride card first, then Groom card
            steps.push({
                name: 'Meet the Bride (Sanjana)',
                selector: '.im-couple-profile__card-reveal:first-child',
                duration: 6500
            });
            steps.push({
                name: 'Meet the Groom (Rahul)',
                selector: '.im-couple-profile__grid > .im-couple-profile__card-reveal:last-child',
                duration: 6500
            });
        } else {
            // On desktop, both Bride & Groom are side-by-side
            steps.push({
                name: 'Meet the Bride & Groom',
                selector: '.im-couple-profile',
                duration: 8500
            });
        }

        steps.push({
            name: 'Temple Doors & Countdown',
            selector: '.im-door-countdown',
            duration: 7000 // 7s to view auspicious days countdown
        });

        steps.push({
            name: 'Wedding Functions Booklet',
            selector: '.im-flipcal',
            duration: 8500 // 8.5s to view events booklet cover & schedule
        });

        steps.push({
            name: 'Sacred Mandap & Venue Ground',
            selector: '.im-venue-map',
            duration: 8000 // 8s to view Le Vivanta, Virar, Mumbai & directions
        });

        steps.push({
            name: 'RSVP Form',
            selector: '#rsvp-section',
            duration: 7500 // 7.5s on RSVP card
        });

        steps.push({
            name: 'Moments of Joy & Laughter Video',
            selector: '#celebration-video',
            duration: 6500 // 6.5s on video showcase
        });

        // Photo Memories chapter (first view + stack progression)
        steps.push({
            name: 'Photo Memories (Cover & First Memory)',
            selector: '.im-gallery-coverflow',
            duration: 5000
        });

        steps.push({
            name: 'Photo Memories (Gallery Stack Reveal)',
            selector: '.im-gallery-coverflow',
            offsetRatio: 0.52, // Smoothly scrolls down into the stack track so photos stack
            duration: 6000
        });

        steps.push({
            name: 'Wedding Quote',
            selector: '.im-wedding-quote',
            duration: 5000
        });

        steps.push({
            name: 'Blessings & Monogram Footer',
            selector: '.im-love-footer',
            duration: 0 // Grand finale
        });

        return steps;
    }

    /**
     * Cross-platform Cubic Smooth Scrolling Engine
     * Reliably operates on iOS Safari, Android Chrome, and Desktop
     * without being interrupted by overflow-x:clip or browser quirks.
     */
    function smoothScrollToY(targetY, callback) {
        if (targetY === null || targetY === undefined) {
            if (callback) callback();
            return;
        }

        var startY = window.pageYOffset || document.documentElement.scrollTop || 0;
        var distance = targetY - startY;

        // If already at or very close to position, finish immediately
        if (Math.abs(distance) < 8) {
            if (callback) callback();
            return;
        }

        if (activeScrollAnim) {
            window.cancelAnimationFrame(activeScrollAnim);
            activeScrollAnim = null;
        }

        isProgrammaticScroll = true;

        // Calculate responsive duration (min 800ms, max 1600ms)
        var duration = Math.min(1600, Math.max(800, Math.abs(distance) * 0.75));
        var startTime = null;

        function animationStep(timestamp) {
            if (!tourActive || tourCancelled) {
                isProgrammaticScroll = false;
                activeScrollAnim = null;
                return;
            }

            if (!startTime) startTime = timestamp;
            var elapsed = timestamp - startTime;
            var progress = Math.min(elapsed / duration, 1);

            // easeInOutCubic curve
            var ease = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            var currentY = Math.round(startY + distance * ease);
            window.scrollTo(0, currentY);

            if (progress < 1) {
                activeScrollAnim = window.requestAnimationFrame(animationStep);
            } else {
                window.scrollTo(0, Math.round(targetY));
                activeScrollAnim = null;

                // 250ms breather guard before releasing programmatic lock
                window.setTimeout(function () {
                    isProgrammaticScroll = false;
                    if (callback) callback();
                }, 250);
            }
        }

        activeScrollAnim = window.requestAnimationFrame(animationStep);
    }

    function stopTour(reason) {
        if (!tourActive && tourCancelled) return;
        tourActive = false;
        tourCancelled = true;
        isProgrammaticScroll = false;

        if (tourTimer) {
            clearTimeout(tourTimer);
            tourTimer = null;
        }

        if (activeScrollAnim) {
            window.cancelAnimationFrame(activeScrollAnim);
            activeScrollAnim = null;
        }

        removeUserInteractionListeners();
    }

    // --- User Interaction Detection (Only real scrolls cancel the tour) ---

    function onTouchStart(e) {
        if (e.touches && e.touches.length > 0) {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
        }
    }

    function onTouchMove(e) {
        if (touchStartY === null || !e.touches || e.touches.length === 0) return;
        var currentY = e.touches[0].clientY;
        var currentX = e.touches[0].clientX;
        var deltaY = Math.abs(currentY - touchStartY);
        var deltaX = Math.abs(currentX - touchStartX);

        // Only stop if the guest deliberately swipes vertically (> 28px)
        if (deltaY > 28 && deltaY > deltaX) {
            stopTour('user-touch-swipe');
        }
    }

    function onTouchEnd() {
        touchStartY = null;
        touchStartX = null;
    }

    function onWheel(e) {
        // Desktop mouse wheel or trackpad scroll
        if (Math.abs(e.deltaY) > 8) {
            stopTour('user-wheel');
        }
    }

    function onKeyDown(e) {
        var scrollKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space', 'Home', 'End'];
        if (scrollKeys.indexOf(e.key) !== -1 || scrollKeys.indexOf(e.code) !== -1) {
            stopTour('user-key');
        }
    }

    function attachUserInteractionListeners() {
        window.addEventListener('touchstart', onTouchStart, { passive: true, capture: true });
        window.addEventListener('touchmove', onTouchMove, { passive: true, capture: true });
        window.addEventListener('touchend', onTouchEnd, { passive: true, capture: true });
        window.addEventListener('wheel', onWheel, { passive: true, capture: true });
        window.addEventListener('keydown', onKeyDown, { passive: true, capture: true });

        // If user manually taps Play on celebration video, yield control to the user
        var celebrationVideo = document.getElementById('celebration-video-player');
        if (celebrationVideo) {
            celebrationVideo.addEventListener('play', function () {
                stopTour('video-playing');
            }, { once: true });
        }
    }

    function removeUserInteractionListeners() {
        window.removeEventListener('touchstart', onTouchStart, { capture: true });
        window.removeEventListener('touchmove', onTouchMove, { capture: true });
        window.removeEventListener('touchend', onTouchEnd, { capture: true });
        window.removeEventListener('wheel', onWheel, { capture: true });
        window.removeEventListener('keydown', onKeyDown, { capture: true });
    }

    function executeStep(stepIndex, tourSteps) {
        if (!tourActive || tourCancelled) return;
        if (stepIndex >= tourSteps.length) {
            stopTour('completed');
            return;
        }

        var step = tourSteps[stepIndex];
        var targetY = getTargetScrollY(step.selector, step.offsetRatio);

        // If target element is missing, advance to next
        if (targetY === null) {
            executeStep(stepIndex + 1, tourSteps);
            return;
        }

        // For the first step (Hero Palace), we are already there; just pause the duration
        if (stepIndex === 0) {
            tourTimer = window.setTimeout(function () {
                if (!tourActive || tourCancelled) return;
                executeStep(stepIndex + 1, tourSteps);
            }, step.duration);
            return;
        }

        // Smooth scroll to the target section
        smoothScrollToY(targetY, function () {
            if (!tourActive || tourCancelled) return;

            if (step.duration > 0) {
                tourTimer = window.setTimeout(function () {
                    if (!tourActive || tourCancelled) return;
                    executeStep(stepIndex + 1, tourSteps);
                }, step.duration);
            } else {
                stopTour('completed');
            }
        });
    }

    function startAutoTour() {
        if (tourActive || tourCancelled) return;

        // If the guest has already scrolled significantly down, do not interrupt
        var currentScroll = window.pageYOffset || document.documentElement.scrollTop || 0;
        if (currentScroll > 260) {
            tourCancelled = true;
            return;
        }

        tourActive = true;
        attachUserInteractionListeners();
        var tourSteps = buildTourSteps();
        executeStep(0, tourSteps);
    }

    function init() {
        var cover = document.querySelector('.im-cover-video, .im-cover-gate, .im-cover-call');

        // Listen for cover-opened event
        document.addEventListener('iw:cover-opened', function () {
            window.setTimeout(startAutoTour, 700);
        }, { once: true });

        // If no cover is active or visible, start after slight breather
        if (!cover || cover.style.display === 'none' || cover.classList.contains('is-closing')) {
            window.setTimeout(startAutoTour, 1200);
        } else {
            // Observer to catch cover disappearance on mobile
            if (window.MutationObserver) {
                var observer = new MutationObserver(function (mutations, obs) {
                    if (cover.style.display === 'none' || !document.body.contains(cover)) {
                        obs.disconnect();
                        window.setTimeout(startAutoTour, 700);
                    }
                });
                observer.observe(cover, { attributes: true, attributeFilter: ['style', 'class'] });
            }

            // Safety fallback: if 14s pass and user is at top, initiate
            window.setTimeout(function () {
                if (!tourActive && !tourCancelled) {
                    var isHidden = !cover || cover.style.display === 'none' || !document.body.contains(cover);
                    if (isHidden || (window.pageYOffset || document.documentElement.scrollTop || 0) < 50) {
                        startAutoTour();
                    }
                }
            }, 14000);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
