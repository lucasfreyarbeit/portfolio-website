<script>
    import { onMount } from "svelte";

    export let delay = 0;
    export let immediate = false; 
    let className = "";
    export { className as class };

    let isVisible = false;
    let container;

    onMount(() => {
        // Fall 1: Hero-Elemente direkt beim Laden animieren
        if (immediate) {
            const timer = setTimeout(() => {
                isVisible = true;
            }, delay);

            return () => clearTimeout(timer);
        }

        // Fall 2: Normale Elemente beim Scrollen animieren
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    isVisible = true;
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: "0px 0px -5% 0px",
            threshold: 0
        });

        if (container) {
            observer.observe(container);
        }

        return () => {
            if (container) {
                observer.unobserve(container);
            }
        };
    });
</script>

<div
    bind:this={container}
    class={`scroll-reveal ${className}`}
    class:is-active={isVisible}
    style={`transition-delay: ${immediate ? '0ms' : `${delay}ms`};`}
>
    <slot />
</div>

<style>
    .scroll-reveal {
        opacity: 0;
        transform: translateY(30px);

        transition:
            opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);

        will-change: opacity, transform;
    }

    .scroll-reveal.is-active {
        opacity: 1;
        transform: translateY(0);
    }
</style>