# Northern Industrial Design System: Color & Typography Guide

## Design Philosophy

This design system is engineered to bridge the gap between high-performance web accessibility and a grounded, tactile aesthetic. Inspired by northern boreal forests and industrial loft environments, the palette balances muted, mysterious greens with deep birch/walnut tones and stark, technical charcoals.

By pairing **Material 3 Expressive layout principles** (bold weights, high-contrast scale, generous rounded containers) with **editorial serif highlights** and **precision monospace metadata**, the interface feels both human and engineered.

---

## Typography System & Hierarchy

### 1. Primary Sans-Serif: Inter (Variable)

- **Font Family:** `'Inter Variable', sans-serif`
- **Primary Use:** Body text, UI labels, buttons, form inputs, and primary heading structure.
- **Weights:** Light (`300`), Regular (`400`), Medium (`500`), Bold (`700`), Black (`900`).
- **Characteristics:** High x-height, neutral grotesk forms, optical sizing (`opsz`) for crisp rendering at both 12px and 72px.

### 2. Editorial Accent Serif: Instrument Serif

- **Font Family:** `'Instrument Serif', Georgia, serif`
- **Primary Use:** Italic accent phrases in titles, pull quotes, hero section highlights, and editorial callouts.
- **Styling:** Always paired with `italic` styling and used selectively (1–3 words per major heading).
- **Fallback Alternative:** `Newsreader` (Variable Italic).

### 3. Technical Monospace: JetBrains Mono (Variable)

- **Font Family:** `'JetBrains Mono Variable', monospace`
- **Primary Use:** Tech tags, system metadata, timestamps, code snippets, and section index numbers (`01 //`).
- **Weights:** Regular (`400`), Semibold (`600`), Bold (`700`).

### 4. Accessibility Fallback: OpenDyslexic

- **Font Family:** `'OpenDyslexic', sans-serif`
- **Primary Use:** Optional user preference override toggled via UI settings for improved readability.

### 5. Type Scale & Usage Matrix

| Scale Role       | Font Family      | Size / Line Height          | Weight            | Usage                       |
| :--------------- | :--------------- | :-------------------------- | :---------------- | :-------------------------- |
| Display Hero     | Inter            | `3.5rem` (`56px`) / `1.1`   | Black (`900`)     | Hero primary headlines      |
| Editorial Accent | Instrument Serif | `3.75rem` (`60px`) / `1.1`  | Italic (`400`)    | Highlight words inside Hero |
| Heading 1 (H1)   | Inter            | `2.5rem` (`40px`) / `1.2`   | Extrabold (`800`) | Main section titles         |
| Heading 2 (H2)   | Inter            | `2.0rem` (`32px`) / `1.25`  | Bold (`700`)      | Card titles, project names  |
| Heading 3 (H3)   | Inter            | `1.5rem` (`24px`) / `1.3`   | Semibold (`600`)  | Subsections, modal titles   |
| Body Text        | Inter            | `1.0rem` (`16px`) / `1.6`   | Regular (`400`)   | Main paragraph content      |
| Monospace Label  | JetBrains Mono   | `0.875rem` (`14px`) / `1.4` | Medium (`500`)    | Badges, tech stack, dates   |
| Micro Meta       | JetBrains Mono   | `0.75rem` (`12px`) / `1.4`  | Regular (`400`)   | Captions, CAD rulers        |

---

## Dark Theme (Primary Canvas)

Optimized for low eye strain while maintaining a crisp, technical aesthetic that matches black peripherals and dark wood.

### Dark Theme Backgrounds & Surfaces

- **Base Background (`--color-bg-base`):** `#0D0F0E` (Void Green-Grey)
  - _Purpose:_ Main website canvas. Near-black with a microscopic green tint.
- **Surface / Card Layer (`--color-bg-surface`):** `#171A18` (Industrial Charcoal)
  - _Purpose:_ Bento cards, elevated modules, and form containers.
- **Border / Divider (`--color-border-subtle`):** `#2A302D` (Muted Steel)
  - _Purpose:_ Hairline borders (1px) for card outlines and subtle dividers.

### Dark Theme Typography

- **Text Primary (`--color-text-primary`):** `#E8E9E6` (Birch White)
  - _Purpose:_ Headings, readable body text, and main interactive labels.
  - _Accessibility:_ Exceeds WCAG AAA contrast against Base and Surface backgrounds.
- **Text Muted (`--color-text-muted`):** `#86918A` (Moss Grey)
  - _Purpose:_ Monospace labels, timestamps, tech stack tags, and secondary text.
  - _Accessibility:_ Passes WCAG AA for meta text.

### Dark Theme Accents & Highlights

- **Primary Accent (`--color-accent-primary`):** `#4E735B` (Northern Pine)
  - _Purpose:_ Primary buttons, active state indicators, key focus highlights.
- **Secondary Accent (`--color-accent-secondary`):** `#8C6E53` (Dark Birch / Raw Wood)
  - _Purpose:_ Editorial italic text accents, warm tag badges, secondary highlights.

---

## Light Theme (Paper Blueprint Canvas)

A high-contrast, paper-like counterpart that feels like a technical architectural blueprint printed on natural stock.

### Light Theme Backgrounds & Surfaces

- **Base Background (`--color-bg-base`):** `#F5F6F4` (Technical Paper)
  - _Purpose:_ Cool off-white canvas engineered to eliminate eye glare.
- **Surface / Card Layer (`--color-bg-surface`):** `#FFFFFF` (Pure White)
  - _Purpose:_ Elevated project cards, floating headers, input backgrounds.
- **Border / Divider (`--color-border-subtle`):** `#D6DCD8` (Drafting Silver)
  - _Purpose:_ Clean bounding boxes and container borders.

### Light Theme Typography

- **Text Primary (`--color-text-primary`):** `#131614` (Deep Ink)
  - _Purpose:_ Maximum readability for body copy and headings.
- **Text Muted (`--color-text-muted`):** `#606964` (Faded Ink)
  - _Purpose:_ Subtle meta-information, dates, and secondary labels.

### Light Theme Accents & Highlights

- **Primary Accent (`--color-accent-primary`):** `#32523E` (Deep Boreal)
  - _Purpose:_ Primary interactive buttons and focus states (darkened for light mode contrast).
- **Secondary Accent (`--color-accent-secondary`):** `#70533C` (Treated Walnut)
  - _Purpose:_ Warm editorial accents, secondary button hover states, tag highlights.

---

## Contrast & Accessibility Metrics

To guarantee **100/100 Lighthouse Accessibility** scores:

1. **Button Text Pairing:**
   - **Dark Mode:** `#4E735B` background requires `#E8E9E6` or `#FFFFFF` text (Contrast ~4.5:1).
   - **Light Mode:** `#32523E` background requires `#FFFFFF` text (Contrast ~8.0:1).
2. **Focus Rings:**
   - Apply a 2px offset ring using `var(--color-accent-primary)` on `:focus-visible` states for keyboard navigation.
3. **Editorial Serif Contrast:**
   - When using `Instrument Serif` with `var(--color-accent-secondary)`, ensure font size is at least `1.25rem` (`20px`) or larger to satisfy WCAG AA contrast for decorative text.

---

## Complete CSS Implementation Prompt

Use the prompt below to generate your complete global CSS rules and CSS custom properties:

```text
I am implementing a design system combining Material 3 Expressive principles with a Northern Industrial palette.
Please generate CSS for my `variables.css` and `global.css` files.

Color Custom Properties:
Dark Theme ([data-theme='dark']):
- --color-bg-base: #0D0F0E
- --color-bg-surface: #171A18
- --color-border-subtle: #2A302D
- --color-text-primary: #E8E9E6
- --color-text-muted: #86918A
- --color-accent-primary: #4E735B
- --color-accent-secondary: #8C6E53

Light Theme (:root):
- --color-bg-base: #F5F6F4
- --color-bg-surface: #FFFFFF
- --color-border-subtle: #D6DCD8
- --color-text-primary: #131614
- --color-text-muted: #606964
- --color-accent-primary: #32523E
- --color-accent-secondary: #70533C

Font Custom Properties:
- --font-sans: 'Inter Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
- --font-serif: 'Instrument Serif', Georgia, serif;
- --font-mono: 'JetBrains Mono Variable', monospace;
- --font-dyslexic: 'OpenDyslexic', sans-serif;

Setup Rules:
1. Apply standard transition (0.3s ease) for background-color, border-color, and color.
2. Define base typography styles: `body` uses `--font-sans`, code/tags use `--font-mono`, `.font-serif` utility class applies `--font-serif`.
3. Provide smooth font-loading definitions for `@font-face` or Google Font imports.
```
