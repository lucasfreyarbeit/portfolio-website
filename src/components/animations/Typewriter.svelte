<script>
    import { onMount } from "svelte";

    /** @type {string} Der finale Text */
    export let text = "";

    /** @type {number} Millisekunden pro Zeichen (Standard: zackige 35ms) */
    export let speed = 100;

    /** @type {number} Start-Verzögerung in ms */
    export let delay = 0;

    /** @type {boolean} Ob der Blink-Cursor gezeigt werden soll */
    export let cursor = true;

    /** @type {string} Terminal-Style Cursor (z.B. "_", "█", "|") */
    export let cursorChar = "_";

    /** @type {boolean} Cursor nach Fertigstellung ausblenden */
    export let hideCursorOnDone = false;

    let className = "";
    export { className as class };

    let displayText = "";
    let isDone = false;
    let isStarted = false;

    onMount(() => {
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

            // GPU-/VSync-synchronisierte Render-Loop
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

        return () => {
            clearTimeout(startTimer);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    });
</script>

<!-- Screenreader lesen über aria-label direkt den vollständigen Text -->
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
    margin-left: -4px;
    
    /* Zwingt den Cursor auf die vertikale Mitte/Linie der Buchstaben */
    vertical-align: baseline; 
    
    /* Falls 'vertical-align' alleine noch minimal abweicht: */
    transform: translate3d(0, -0.1em, 0); 
    
    will-change: visibility;
}

    /* Knackiges 0/1-Blinken ohne Zwischen-Fade (Instant Snap) */
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