<script>
    import { onMount } from "svelte";

    export let delay = 0;
    export let immediate = false;
    let className = "";
    export { className as class };

    let isVisible = false;
    let container;

    onMount(() => {
        let timer;

        const startAnimation = () => {
            if (delay > 0) {
                timer = setTimeout(() => {
                    isVisible = true;
                }, delay);
            } else {
                isVisible = true;
            }
        };

        if (immediate) {
            startAnimation();
            return () => clearTimeout(timer);
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry && entry.isIntersecting) {
                    startAnimation();
                    if (container) observer.unobserve(container);
                }
            },
            {
                root: null,
                rootMargin: "0px 0px -50px 0px",
                threshold: 0.01,
            }
        );

        if (container) observer.observe(container);

        return () => {
            clearTimeout(timer);
            if (container) observer.unobserve(container);
        };
    });
</script>

<div
    bind:this={container}
    class={`terminal-snap-container ${className}`}
    class:is-visible={isVisible}
>
    <slot />
</div>

<style>
    .terminal-snap-container {
        opacity: 0;
        visibility: hidden;

        /* Hardware-Layer isolieren (Compositor-Only) */
        transform: translate3d(-4px, 6px, 0);
        will-change: transform, opacity;
    }

    .terminal-snap-container.is-visible {
        opacity: 1;
        visibility: visible;
        
        /* Reine Compositor-Animation ohne Layout-Shift */
        animation: render-snap 0.3s cubic-bezier(0.05, 0.85, 0.1, 1) forwards;
    }

    @keyframes render-snap {
        0% {
            opacity: 0;
            transform: translate3d(-4px, 6px, 0);
        }
        /* Snap-Over-Effect rein über Integer/Subpixel-Translates (kein Scale-Blur) */
        50% {
            opacity: 1;
            transform: translate3d(0, -1px, 0);
        }
        100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .terminal-snap-container {
            opacity: 1 !important;
            visibility: visible !important;
            transform: none !important;
            animation: none !important;
            will-change: auto !important;
        }
    }
</style>