<script>
    /** Props-Deklaration über das $props-Rune (Svelte 5) */
    let {
        text = "",
        speed = 100,
        delay = 0,
        cursor = true,
        cursorChar = "_",
        hideCursorOnDone = false,
        class: className = ""
    } = $props();

    // Reaktiver Zustand mittels $state-Rune
    let displayText = $state("");
    let isDone = $state(false);
    let isStarted = $state(false);

    // Effekthandling und Lebenszyklussteuerung über $effect
    $effect(() => {
        // Zustand bei Parameteränderungen zurücksetzen
        displayText = "";
        isDone = false;
        isStarted = false;

        // Barrierefreiheit: Bei reduzierter Bewegung sofort den gesamten Text anzeigen
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            displayText = text;
            isDone = true;
            isStarted = true;
            return;
        }

        let animationFrameId;
        let lastTime = 0;
        let charIndex = 0;

        const startTimer = setTimeout(() => {
            isStarted = true;

            // VSync-synchronisierte Render-Loop
            function step(time) {
                if (!lastTime) lastTime = time;
                const delta = time - lastTime;

                if (delta >= speed) {
                    if (charIndex < text.length) {
                        charIndex++;
                        displayText = text.slice(0, charIndex);
                        lastTime = time;
                    } else {
                        isDone = true;
                        return; // Animation abgeschlossen
                    }
                }
                animationFrameId = requestAnimationFrame(step);
            }

            animationFrameId = requestAnimationFrame(step);
        }, delay);

        // Bereinigung laufender Timer und Animation-Frames bei Unmount oder Re-Run
        return () => {
            clearTimeout(startTimer);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    });
</script>

<span 
    class={`typewriter-wrapper ${className}`} 
    aria-label={text}
>
    <span aria-hidden="true">{displayText}</span>
    {#if cursor && (!hideCursorOnDone || !isDone)}
        <span 
            class="terminal-cursor" 
            class:blinking={isStarted}
            aria-hidden="true"
        >
            {cursorChar}
        </span>
    {/if}
</span>

<style>
    .typewriter-wrapper {
        display: inline-block;
    }

    .terminal-cursor {
        display: inline-block;
        font-weight: bold;
        margin-left: -10px;
        vertical-align: baseline; 
        transform: translate3d(0, -0.1em, 0); 
        will-change: visibility;
    }

    .terminal-cursor.blinking {
        animation: cursor-snap 0.8s steps(1, start) infinite;
    }

    @keyframes cursor-snap {
        0%, 100% {
            visibility: visible;
        }
        50% {
            visibility: hidden;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .terminal-cursor {
            animation: none !important;
            visibility: visible !important;
        }
    }
</style>