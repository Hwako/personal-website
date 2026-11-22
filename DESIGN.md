# Personal website design direction

Soft near-black background (#0b0b0b), light gray text, and restrained hover feedback. Desktop uses a sticky profile column on the left and Projects followed by Experience on the right; mobile stacks them. Keep the photo, exact label AI / Product / Data, USC ’27 · Data Science, and existing bio.

Social navigation is one icon-only row: GitHub, LinkedIn, X, Email, Photography. Accessible labels remain, but no visible names, trailing arrows, or iOS tray. No HW header.

Projects and Experience use the SAME ProjectCard component, 80px resting rows, icon size, typography, category placement, spacing, and unboxed background. Experience uses the role as name and company as category. There are no plus/minus icons, chevrons, section counts, or permanent rectangular card surfaces.

Previews are capped at 240px wide. Motion is a 150ms fade with 2% scale and 4px travel, with no 3D tilt. No large rotation, horizontal flight, or dramatic scaling. Reduced motion uses opacity. Experience uses a text-only preview through the same component. Touch/narrow previews expand inline, and Escape restores trigger focus.

Paevos uses the GREEN deep-marine app icon at public/logos/paevos-green.png. It links to paevos.com and previews the actual homepage. Minara is marked Live on the App Store and links to its verified HAMZA WAKO listing. SignSpace retains the three-image manual carousel with arrows, dots, keyboard and swipe controls. AI Research Agent previews its actual GitHub page. Keep those destinations and content.

Social icons brighten and lift 2px on hover, with 0.96-scale press feedback. Hover transforms are gated by hover-capable input and reduced-motion preferences. The icon row remains unboxed at rest.

The profile photo is circular at every width. The bio includes building across AI/product/data, learning photography, and curiosity about visual and creative work.
