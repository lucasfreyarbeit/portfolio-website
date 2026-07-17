<script>
    import { spring } from 'svelte/motion';

    // Federn für die Pupillen der Augen (x, y) und den Mund
    const leftEye = spring({ x: 0, y: 0 }, { stiffness: 0.08, damping: 0.4 });
    const rightEye = spring({ x: 0, y: 0 }, { stiffness: 0.08, damping: 0.4 });
    const mouth = spring({ x: 0, y: 0, rotate: 0 }, { stiffness: 0.06, damping: 0.45 });

    let svgElement;

    function handleMouseMove(event) {
        if (!svgElement) return;

        const rect = svgElement.getBoundingClientRect();
        
        // Mittelpunkte der Augen (relativ zum Viewport)
        const leftEyeCenter = { x: rect.left + rect.width * 0.25, y: rect.top + rect.height * 0.4 };
        const rightEyeCenter = { x: rect.left + rect.width * 0.75, y: rect.top + rect.height * 0.4 };
        const mouthCenter = { x: rect.left + rect.width * 0.5, y: rect.top + rect.height * 0.7 };

        // 1. LINKES AUGE BERECHNEN
        const lDeltaX = event.clientX - leftEyeCenter.x;
        const lDeltaY = event.clientY - leftEyeCenter.y;
        const lAngle = Math.atan2(lDeltaY, lDeltaX);
        const lDist = Math.min(Math.sqrt(lDeltaX * lDeltaX + lDeltaY * lDeltaY) * 0.06, 6); // Mehr Spielraum zum Schauen (6px)

        leftEye.set({ x: Math.cos(lAngle) * lDist, y: Math.sin(lAngle) * lDist });

        // 2. RECHTES AUGE BERECHNEN
        const rDeltaX = event.clientX - rightEyeCenter.x;
        const rDeltaY = event.clientY - rightEyeCenter.y;
        const rAngle = Math.atan2(rDeltaY, rDeltaX);
        const rDist = Math.min(Math.sqrt(rDeltaX * rDeltaX + rDeltaY * rDeltaY) * 0.06, 6);

        rightEye.set({ x: Math.cos(rAngle) * rDist, y: Math.sin(rAngle) * rDist });

        // 3. MUND BERECHNEN
        const mDeltaX = event.clientX - mouthCenter.x;
        const mDeltaY = event.clientY - mouthCenter.y;
        const mAngle = Math.atan2(mDeltaY, mDeltaX);
        const mDist = Math.min(Math.sqrt(mDeltaX * mDeltaX + mDeltaY * mDeltaY) * 0.02, 3);

        mouth.set({ 
            x: Math.cos(mAngle) * mDist, 
            y: Math.sin(mAngle) * mDist,
            rotate: Math.cos(mAngle) * mDist * 1.5
        });
    }

    function handleMouseLeave() {
        leftEye.set({ x: 0, y: 0 });
        rightEye.set({ x: 0, y: 0 });
        mouth.set({ x: 0, y: 0, rotate: 0 });
    }
</script>

<div 
    class="temp-container" 
    on:mousemove={handleMouseMove}
    on:mouseleave={handleMouseLeave}
    role="region"
>
    <h1 class="temp-title">
        Willkommen 
        <svg 
            bind:this={svgElement}
            class="smiley-svg idle-float" 
            viewBox="0 0 120 70" 
            xmlns="http://w3.org"
        >
            <!-- Linkes Auge: Deutlich fetterer Radius -->
            <g class="eye-group">
                <circle cx="30" cy="30" r="10" fill="none" />
                <circle cx={30 + $leftEye.x} cy={30 + $leftEye.y} r="9.5" fill="#282828" />
            </g>

            <!-- Rechtes Auge: Deutlich fetterer Radius -->
            <g class="eye-group">
                <circle cx="90" cy="30" r="10" fill="none" />
                <circle cx={90 + $rightEye.x} cy={30 + $rightEye.y} r="9.5" fill="#282828" />
            </g>

            <!-- Der Mund: Höhere Dicke (stroke-width="8.5") für kräftigen Look -->
            <path 
                d="M 45,46 C 45,60 75,60 75,46" 
                fill="none" 
                stroke="#282828" 
                stroke-width="8.5" 
                stroke-linecap="round"
                style="transform: translate({$mouth.x}px, {$mouth.y}px) rotate({$mouth.rotate}deg); transform-origin: 60px 46px;"
            />
        </svg>
    </h1>
    <p class="temp-text">
        Diese Website befindet sich derzeit noch in der Entwicklung.
        Bitte noch um etwas Geduld.
    </p>
</div>

<style>
.temp-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    padding: 3rem;
    text-align: center;
    cursor: default;
    user-select: none;
}

.temp-title {
    display: inline-flex;
    align-items: center;
    gap: 1.5rem; /* Etwas mehr Abstand für das dickere SVG */
    font-family: "Roboto Mono", monospace;
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    color: #282828;
    letter-spacing: -0.02em;
}

.smiley-svg {
    display: inline-block;
    height: 3.8rem; /* Minimal vergrößert, damit es optisch zur fetten Schrift passt */
    width: auto;
    vertical-align: middle;
    will-change: transform;
}

.idle-float {
    animation: gentleFloat 4s ease-in-out infinite;
}

@keyframes gentleFloat {
    0% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
    100% { transform: translateY(0); }
}

.temp-text {
    font-family: "Inter", sans-serif;
    font-size: 1.4rem;
    line-height: 1.8;
    color: #515151;
    max-width: 600px;
}
</style>
