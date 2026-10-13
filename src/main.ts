/**
 * The page's entire JavaScript surface: two behaviours, no framework, no dependencies.
 *
 * Everything else, the FAQ accordions, smooth scrolling, the responsive layout, is HTML and CSS, so
 * the page works with JavaScript disabled, which is the right default for a marketing page.
 */

/**
 * The mobile menu.
 *
 * `aria-expanded` is kept in step with the `data-open` attribute because the visual state and the
 * announced state are read by different people, and only one of them can see the menu. The attribute
 * rather than a class is what the Tailwind variant on `#navMenu` (`max-nav:data-[open]:flex`) reads,
 * so the open state stays a state and the styling stays in the markup.
 */
function setupNav(): void {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  const nav = document.getElementById("nav");
  if (!(toggle instanceof HTMLButtonElement) || !menu || !nav) return;

  const close = (): void => {
    menu.removeAttribute("data-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const open = !menu.hasAttribute("data-open");
    menu.toggleAttribute("data-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Following a link should not leave the menu hanging over the section it scrolled to.
  menu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });

  const onScroll = (): void => {
    nav.toggleAttribute("data-stuck", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/** The copyright year, so the footer cannot go stale. */
function setupYear(): void {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

setupNav();
setupYear();
