export default function BackgroundTransition() {
  if (typeof document === 'undefined') return;

  const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-color]'));
  const body = document.querySelector('body');

  if (!elements || !Array.isArray(elements) || elements.length === 0) return;

  function scrollHandler(target: HTMLElement) {
    if (!body) return;

    const color = target.dataset.color || '';

    body.style.backgroundColor = color;
  }

  elements.map((item, key) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scrollHandler(item);
          }
        });
      },
      { threshold: [0.5] }
    );

    observer.observe(item);
  });
}
