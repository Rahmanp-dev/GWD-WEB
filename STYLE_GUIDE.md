# Style Guide: GWD Global

This document outlines the visual design system for the GWD Global "Freelancer Weapon Wheel" project.

## 1. Colors

The color palette is defined in `tailwind.config.ts`.

| Name        | Hex       | Tailwind Class | Usage                               |
|-------------|-----------|----------------|-------------------------------------|
| **Primary** | `#2196F3` | `primary`      | Main CTAs, active links, highlights |
| **BG Gray** | `#F5F5F5` | `bgGray`       | Section backgrounds                 |
| **Hover Gray**| `#DDDDDD` | `hoverGray`    | Hover states for UI elements        |
| **Text Dark** | `#333333` | `text-gray-800`| Main body text                      |
| **Text Light**| `#FFFFFF` | `text-white`   | Text on dark or primary backgrounds |

## 2. Typography

The primary font for this project is **Inter**, loaded via `next/font/google` in `app/layout.tsx`. Alternative sans-serif fonts like Poppins or Montserrat can be swapped in easily.

### Headings

- **h1**: `text-6xl font-bold` (e.g., Main hero title)
- **h2**: `text-4xl font-bold` (e.g., Section titles)
- **h3**: `text-2xl font-semibold` (e.g., Sub-section titles)

### Body Text

- **p**: `text-base` (Standard paragraph text)
- **small**: `text-sm` (Captions, secondary info)

## 3. Spacing

Consistent spacing is managed through Tailwind's spacing scale.

- **Component Padding**: `p-4` or `p-6` is used for card and container padding.
- **Section Padding**: `py-20` or `py-16` provides vertical space between page sections.
- **Gaps**: `gap-6` or `gap-8` is used for grid and flexbox spacing.

## 4. Icons

Icons are provided by the [Lucide-React](https://lucide.dev/) library.

### Usage

- **Standard Size**: `size={24}`
- **Large Size**: `size={48}` (e.g., in the Hero Wheel)
- **Color**: Icons should inherit color via `currentColor` or be set explicitly (e.g., `className="text-primary"`).

Icons should always be accompanied by text or have an appropriate `aria-label` for accessibility when used as interactive elements.

## 5. Components

- **Buttons**:
  - **Primary**: `bg-primary text-white font-bold py-3 px-8 rounded`
  - **Secondary**: `bg-bgGray hover:bg-hoverGray font-semibold py-2 px-4 rounded-full`
- **Cards**: Rounded corners (`rounded-lg`), shadow (`shadow-md`), and consistent padding.
- **Inputs**: `p-3 border rounded` with focus outlines managed by Tailwind. 