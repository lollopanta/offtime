# OFFTIME Design System

The OFFTIME interface is a dark, premium e-commerce system: product and choice are always clearer than the decoration around them. The brand is expressive, but the UI should remain restrained, tactile, and easy to read.

## Source of truth

- Global tokens live in `src/index.css`.
- The living visual reference is available at `/design-system`.
- Use shadcn/Base UI primitives from `src/components/ui`; style them through semantic tokens rather than one-off color values.

## Brand palette

| Token                   | Value     | Intended use                                       |
| ----------------------- | --------- | -------------------------------------------------- |
| `--offtime-blue`        | `#4658AD` | Primary brand and filled action color              |
| `--offtime-blue-bright` | `#7185FF` | Focus, hover, selected states and small highlights |
| `--offtime-pink`        | `#EF75AA` | Secondary brand accent                             |
| `--offtime-pink-bright` | `#FF9BC4` | Highlighted text and small moments of delight      |
| `--offtime-violet`      | `#8B68D7` | Editorial accent sampled from the logo             |
| `--surface-0`           | `#08090D` | Application background                             |
| `--surface-1`           | `#101218` | Default card/surface                               |
| `--surface-2`           | `#181B24` | Raised surface                                     |
| `--surface-3`           | `#222633` | Secondary action or higher contrast surface        |

Use deep blue for the single next action in a decision. Bright blue belongs to focus, hover, selected states and small highlights—not large fills. Use pink for releases and personality, and violet for occasional editorial depth.

## Typography

- **Display and UI:** `Geist Variable`. Display headings use `--font-offtime-display` with tight tracking and balanced wrapping.
- **Metadata:** `--font-offtime-mono` for game names, SKUs, set codes, dates, language, inventory, and token names.
- **Prices:** UI/sans typography with tabular numerals. Prices are commercial hierarchy, not metadata.
- Use primary text (`--text-primary`) for reading and `--text-secondary` for supporting copy. Avoid low-contrast gray-on-dark text.
- Keep display headings short and wide; do not create narrow, multi-line headline blocks.

## Shape, space, and depth

- Radius: `--radius-small` is `8px`, `--radius-medium` is `12px`, and `--radius-editorial` is `18px`.
- Use small for compact menu items, medium for controls and inputs, and editorial for cards, campaign media and major surfaces. Do not introduce one-off radii.
- Container: `--container-width` is `76rem`.
- Spacing follows a 4px rhythm: `--space-1`, `--space-2`, `--space-3`, `--space-4`, `--space-6`, `--space-8`, `--space-12`, `--space-16`, and `--space-24`.
- Surfaces have a subtle white-tinted border and layered dark shadow. Favor separation through surface depth and typography rather than heavy borders.

## Components

- Use `Button` variants semantically: `default` for the primary decision, `secondary` for contextual actions, and `ghost` for low-emphasis actions.
- Inputs use `InputGroup` when an icon, keyboard hint, or attached action is needed. Every input requires a real label, meaningful `name`, appropriate `type`, and an ellipsis-ending placeholder.
- Use `Badge` for statuses. Every status must include written meaning; color is never the only cue.
- Prefer `Separator`, `Accordion`, and `Carousel` primitives over custom equivalents.
- Desktop can be compact, but touch targets are at least `44px` on mobile.

## Interaction and accessibility

- Every interactive control has a visible blue `:focus-visible` treatment.
- Use links for navigation and buttons for actions. Do not attach navigation to non-semantic elements.
- Respect `prefers-reduced-motion`. Motion is limited to opacity and transform, with explicit transition properties—never `transition: all`.
- Keep the skip link, semantic heading hierarchy, `scroll-mt-*` anchor targets, image dimensions, and `alt` text intact.
- The base dark theme sets `color-scheme: dark` and a matching browser theme color.

## Implementation checklist

1. Start with semantic Tailwind classes such as `bg-primary`, `bg-surface-1`, `text-muted-foreground`, and `border-border`.
2. Add a new token in `src/index.css` when a value is needed more than once; do not scatter raw colors.
3. Test default, hover, keyboard focus, disabled, long-content, and mobile states in `/design-system` before reusing a pattern.
4. Run `pnpm run typecheck` and `pnpm run build` before handoff.
