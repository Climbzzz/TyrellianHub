**1. Gridded background**

```css
body::before {
    position: fixed;
    inset: 0;
    opacity: 0.18;
    background-image:
        linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
    background-size: 40px 40px;
    content: '';
}
```

`body::before` creates an invisible extra layer over the page.

- The first gradient creates horizontal lines.
- The second creates vertical lines.
- `background-size: 40px 40px` controls the grid spacing.
- `opacity: 0.18` keeps it subtle.
- `position: fixed` makes the grid stay in place while scrolling.

**2. Decorative line**

```css
header::after {
    position: absolute;
    right: 7%;
    bottom: 0;
    width: 34%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--cyan));
    content: '';
}
```

`header::after` creates another invisible element after the header content.

- `height: 1px` makes it a thin line.
- `width: 34%` controls its length.
- The gradient makes it fade from transparent into cyan.
- `position: absolute` places it at the bottom of the header.

The header needs `position: relative` so the line stays positioned inside the header.

**3. Text hover fade**

```css
nav a {
    color: var(--muted);
    transition: color 180ms ease,
                background 180ms ease,
                transform 180ms ease;
}

nav > ul > li > a:hover {
    color: var(--text);
    background: rgba(115, 242, 222, 0.1);
    transform: translateY(-1px);
}
```

The `transition` tells the browser to animate changes instead of switching instantly.

- `color` fades to a brighter color.
- `background` fades in slightly.
- `transform` lifts the text by one pixel.
- `180ms` controls the speed.
- `ease` makes the motion start and finish smoothly.

The `:hover` selector activates these styles when the mouse is over a navigation link.

**4. Dropdown fade-in**

```css
.dropdown:hover .dropdown-content {
    display: block;
    animation: dropIn 180ms ease both;
}

@keyframes dropIn {
    from {
        opacity: 0;
        transform: translateY(-5px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

This makes the dropdown start slightly above its final position, become visible, and fade in at the same time.

**5. Keeping the dropdown open while moving the mouse**

The submenu is positioned 10 pixels below its label:

```css
.dropdown-content {
    top: calc(100% + 10px);
}
```

That creates a small invisible gap. While the mouse crosses the gap, it is no longer hovering over `.dropdown`, so this rule stops applying:

```css
.dropdown:hover .dropdown-content {
    display: block;
}
```

The submenu then disappears. An invisible pseudo-element fills the gap:

```css
.dropdown-content::after {
    position: absolute;
    top: -10px;
    right: 0;
    left: 0;
    height: 10px;
    content: '';
}
```

The bridge is not visible, but it keeps the hover area connected while the mouse moves from the label into the submenu. Another simple solution would be changing `top` to `100%`, which removes the gap entirely.

**6. Keeping the footer at the bottom**

When a page has very little content, the footer normally appears immediately after the content. A flex column layout pushes it to the bottom of the viewport:

```css
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

main {
    flex: 1;
}
```

Here is what each rule does:

- `display: flex` turns the body into a flex container.
- `flex-direction: column` stacks the navigation, header, main content, and footer vertically.
- `min-height: 100vh` makes the body at least as tall as the browser window. `vh` means viewport height.
- `flex: 1` makes `main` expand and use any leftover space.

Because `main` grows to fill the empty space, the footer is pushed down to the bottom. If the page has more content than the viewport, the page can still scroll normally.

**7. Moving the subject inside a cropped image**

The gallery gives every image the same card shape:

```css
.grid-container img {
    aspect-ratio: 1.15;
    object-fit: cover;
}
```

`object-fit: cover` makes an image fill the card, but it may crop parts of the original image. This is useful for a consistent gallery, but it can crop important details such as someone's head.

`object-position` controls which part of the image remains visible:

```css
.grid-container img:nth-child(8) {
    object-position: center 18%;
}
```

The first value controls the horizontal position:

- `left` or `0%` shows more of the left side.
- `center` or `50%` centers the image horizontally.
- `right` or `100%` shows more of the right side.

The second value controls the vertical position:

- `top` or `0%` keeps the top of the source image visible.
- `center` or `50%` centers the crop vertically.
- Larger values move the source image upward inside the card, revealing more of its lower area and cropping more from the top.

Here, `center 18%` keeps the image centered left-to-right while cropping a little more empty space from above the helmet. The `:nth-child(8)` selector applies the adjustment only to the eighth image.