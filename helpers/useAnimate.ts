import { useInView } from "react-intersection-observer";

/**
 * Custom hook for animating elements upon entering/exiting viewport.
 *
 * @param callback - Function to execute on viewport change
 * @param [options={}] - Optional customization parameters
 * @param [options.triggerOnce] - Whether to trigger callback only once
 * @param [options.rootMargin] - Margin around root for triggering intersection
 * @return ref - The reference to be assigned to the element to be observed
 */
export default function useAnimate(
  callback: (props: {
    inView: boolean;
    entry: IntersectionObserverEntry;
  }) => void,
  options: { triggerOnce?: boolean; rootMargin?: string } = {}
) {
  // Use Intersection Observer hook
  const { ref } = useInView({
    onChange: (inView, entry) => {
      // Stop execution if triggerOnce is false and element is not in view
      if (options.triggerOnce !== false && inView === false) return;
      // Respect user's preference for reduced motion
      if (window.matchMedia(`(prefers-reduced-motion: reduce)`)?.matches)
        return;
      // Execute callback
      callback({ inView, entry });
    },
    triggerOnce: true,
    rootMargin: "0% 0% -20% 0%",
    ...options,
  });
  // Return reference
  return ref;
}
