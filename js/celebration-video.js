(function () {
    'use strict';

    function initCelebrationVideo() {
        var box = document.getElementById('celebration-video-box');
        var video = document.getElementById('celebration-video-player');
        if (!box || !video) return;

        var playOverlay = document.getElementById('celebration-play-overlay');
        var ctrlPlay = document.getElementById('celebration-ctrl-play');
        var iconPlay = document.getElementById('celebration-icon-play');
        var iconPause = document.getElementById('celebration-icon-pause');
        var progressBar = document.getElementById('celebration-progress-bar');
        var progressFill = document.getElementById('celebration-progress-fill');
        var timeLabel = document.getElementById('celebration-time');
        var ctrlMute = document.getElementById('celebration-ctrl-mute');
        var iconUnmuted = document.getElementById('celebration-icon-unmuted');
        var iconMuted = document.getElementById('celebration-icon-muted');
        var ctrlFullscreen = document.getElementById('celebration-ctrl-fullscreen');

        var bgMusicWasPlaying = false;

        function pauseMainMusic() {
            var mainAudio = document.querySelector('.im-music-toggle__audio');
            var mainToggle = document.querySelector('.im-music-toggle');
            if (mainAudio && !mainAudio.paused) {
                bgMusicWasPlaying = true;
                mainAudio.pause();
                if (mainToggle) {
                    mainToggle.classList.remove('im-music-toggle--playing');
                }
                var btn = document.querySelector('.im-music-toggle__btn');
                if (btn) {
                    btn.setAttribute('aria-label', 'Play background music');
                }
            }
        }

        function resumeMainMusic() {
            if (!bgMusicWasPlaying) return;
            var mainAudio = document.querySelector('.im-music-toggle__audio');
            var mainToggle = document.querySelector('.im-music-toggle');
            if (mainAudio && mainAudio.paused) {
                mainAudio.play().then(function () {
                    if (mainToggle) {
                        mainToggle.classList.add('im-music-toggle--playing');
                    }
                    var btn = document.querySelector('.im-music-toggle__btn');
                    if (btn) {
                        btn.setAttribute('aria-label', 'Pause background music');
                    }
                }).catch(function (err) {
                    console.log('Background music resume notice:', err);
                });
            }
            bgMusicWasPlaying = false;
        }

        function togglePlay() {
            if (video.paused || video.ended) {
                video.play();
            } else {
                video.pause();
            }
        }

        function updatePlayState() {
            if (video.paused) {
                box.classList.remove('is-playing');
                if (iconPlay) iconPlay.style.display = 'block';
                if (iconPause) iconPause.style.display = 'none';
                resumeMainMusic();
            } else {
                box.classList.add('is-playing');
                if (iconPlay) iconPlay.style.display = 'none';
                if (iconPause) iconPause.style.display = 'block';
                pauseMainMusic();
            }
        }

        function formatTime(seconds) {
            if (isNaN(seconds)) return '0:00';
            var mins = Math.floor(seconds / 60);
            var secs = Math.floor(seconds % 60);
            return mins + ':' + (secs < 10 ? '0' : '') + secs;
        }

        if (playOverlay) {
            playOverlay.addEventListener('click', togglePlay);
        }
        if (ctrlPlay) {
            ctrlPlay.addEventListener('click', function (e) {
                e.stopPropagation();
                togglePlay();
            });
        }
        video.addEventListener('click', togglePlay);
        video.addEventListener('play', updatePlayState);
        video.addEventListener('pause', updatePlayState);
        video.addEventListener('ended', function () {
            updatePlayState();
            resumeMainMusic();
        });

        video.addEventListener('timeupdate', function () {
            if (video.duration) {
                var pct = (video.currentTime / video.duration) * 100;
                if (progressFill) progressFill.style.width = pct + '%';
                if (timeLabel) timeLabel.textContent = formatTime(video.currentTime) + ' / ' + formatTime(video.duration);
            }
        });

        if (progressBar) {
            progressBar.addEventListener('click', function (e) {
                e.stopPropagation();
                var rect = progressBar.getBoundingClientRect();
                var pos = (e.clientX - rect.left) / rect.width;
                if (video.duration) {
                    video.currentTime = pos * video.duration;
                }
            });
        }

        if (ctrlMute) {
            ctrlMute.addEventListener('click', function (e) {
                e.stopPropagation();
                video.muted = !video.muted;
                if (video.muted) {
                    if (iconUnmuted) iconUnmuted.style.display = 'none';
                    if (iconMuted) iconMuted.style.display = 'block';
                } else {
                    if (iconUnmuted) iconUnmuted.style.display = 'block';
                    if (iconMuted) iconMuted.style.display = 'none';
                }
            });
        }

        if (ctrlFullscreen) {
            ctrlFullscreen.addEventListener('click', function (e) {
                e.stopPropagation();
                if (!document.fullscreenElement) {
                    if (box.requestFullscreen) {
                        box.requestFullscreen();
                    } else if (video.webkitEnterFullscreen) {
                        video.webkitEnterFullscreen();
                    }
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    }
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCelebrationVideo);
    } else {
        initCelebrationVideo();
    }
})();
