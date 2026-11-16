# Bangsal UI Design System

## Design direction
Premium construction and corporate editorial. The system borrows common information architecture patterns from ThemeForest construction and architecture templates—strong hero, service overview, project imagery, company story, proof points, FAQ, conversion CTA, and structured footer—without copying proprietary artwork, source code, or distinctive layouts.

## Tokens
- Ink: #17232d
- Dark surface: #14232b
- Muted text: #687783
- Brand accent: #b87545
- Paper: #ffffff
- Soft surface: #f4f6f5
- Border: #e2e8e5
- Heading font: Manrope
- Body font: DM Sans
- Content max width: 1180px
- Section spacing: fluid clamp-based scale
- Border radii: 8px / 16px / 24px

## Shared components
- Header: logo, desktop navigation, current-page state, contact CTA, native details/summary mobile menu.
- Footer: brand summary, CMS-driven navigation, contact information, social links, copyright note.
- Sections: hero, rich text, image/text, feature grid, FAQ, CTA.
- Listings: responsive service and article cards, metadata, empty states.
- Article: readable editorial measure, heading hierarchy, list and quote styling.

## Responsive behavior
- Wide desktop: two-column hero and image/text, four-column feature grid, three-column listing cards.
- Tablet: compact header with native mobile menu, two-column feature and listing grids.
- Mobile: single-column content and cards, stacked CTA and footer.

## Accessibility
- Semantic header/nav/main/footer, current-page indication, native keyboard-operable details/summary menu, visible focus ring, descriptive image alt text from CMS, reduced-motion support, responsive type scale.
- Editors should provide meaningful alt text for informative images and empty alt text only for decorative images.

## Notes and limitations
- Fonts are loaded from Google Fonts; production deployments should confirm font privacy/performance requirements or self-host licensed font files.
- Mobile menu uses native details/summary and does not require client-side JavaScript.
- Contact CTA remains a mailto link in the current demo content. A production contact form requires a selected form endpoint/provider and spam protection.
- ThemeForest references are inspiration for information architecture and component coverage, not copied assets or code.
