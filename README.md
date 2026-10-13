# ape-design.com

Portfolio website of Alejandro Peña Campos, built from the Figma file "ape-design-website" (About page, three case studies, menu overlay; Desktop 1440, Tablet 768, Mobile 390).

## See it on your computer

Double click `index.html`. It opens in your browser and works offline. No installation needed.

## Change things

| I want to change | Open this file | Look for |
|---|---|---|
| Text on the About page | `index.html` | The section comments: HERO, CAPABILITIES, CLIENTS, SELECTED WORK, APPROACH & PROCESS, CONTACT SECTION |
| Text on a case study | `video-up.html`, `petit-bambou.html`, `demajo.html` | INTRO, OVERVIEW, WORK, NEXT PROJECT |
| Header, menu, contact links, footer | every `.html` file | SITE HEADER, MENU OVERLAY, CONTACT SECTION, SITE FOOTER (keep them identical on every page) |
| Colors, fonts, type sizes, spacing | `assets/css/tokens.css` | Same names as the Figma variables (`--type-heading-l`, `--space-3xl`, `--brand-scarlet-fire`...) |
| The look of one part | `assets/css/components.css` | The banner with that name, for example "Gallery tile" |
| Animations | `assets/css/motion.css` | The motion plan at the top |

**Swap an image:** put the new file in `assets/img/` with the same name, or change the file name in the page. Export at 2x from Figma, save as WebP, keep each image under 200 KB (squoosh.app does this).

**Turn off an animation on one element:** remove `data-reveal` from it.

**Switch the display font to The Henston:** put the `.woff2` file in `assets/fonts/`, copy the Fraunces `@font-face` block at the top of `assets/css/tokens.css`, change the name and file, then set `--font-display` to `"The Henston"`. Every heading updates.

## Still to provide

- **Dribbble link:** the Contact section points to `https://dribbble.com/`. Replace it with your profile URL in every page (search for `dribbble.com`).
- **Playground:** shown in the menu as "coming soon" (greyed out) until the page exists.
- **DE and ES:** the language menu lists them as "coming soon"; only English content exists.
- **Rive portrait:** the hero uses the static portrait from Figma. When the `.riv` file is ready it goes in the same slot (`hero-portrait` in `index.html`).

## Put it online (Cloudflare Pages, free)

1. Log in at dash.cloudflare.com, open **Workers & Pages**, click **Create**, then **Pages**, then **Connect to Git**.
2. Pick the GitHub repository `apethreed/ape-design`.
3. Framework preset: **None**. Leave **Build command** empty and leave the output directory as the root of the repository. Click **Save and Deploy**.
4. In the project, open **Custom domains** and add `ape-design.com`. Cloudflare shows the DNS record to confirm.

From then on, every change pushed to the repository goes live by itself in about a minute.

## Folder map

```
index.html            About (home page)
video-up.html         Case study
petit-bambou.html     Case study
demajo.html           Case study
404.html              Page not found
assets/css/           styles (start with tokens.css)
assets/js/            menu, language menu, scroll reveals
assets/img/           images, logo, icons, share image
assets/fonts/         self hosted fonts (Fraunces stand in, Inter)
```
