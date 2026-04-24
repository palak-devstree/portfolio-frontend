import { useEffect, useRef, useState } from 'react'

/**
 * Animates a number from 0 to `target` once the element enters the viewport.
 * Returns [displayValue, ref] — attach the ref to the element to observe.
 */
export function useCountUp(
  target: number,
  duration = 1400,
  decimals = 0,
): [string, (el: HTMLElement | null) => void] {
  const [value, setValue] = useState(0)
  const [node, setNode] = useState<HTMLElement | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!node || startedRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            const start = performance.now()
            const tick = (now: number) => {
              const elapsed = now - start
              const progress = Math.min(elapsed / duration, 1)
              // easeOutCubic
              const eased = 1 - Math.pow(1 - progress, 3)
              setValue(target * eased)
              if (progress < 1) requestAnimationFrame(tick)
              else setValue(target)
            }
            requestAnimationFrame(tick)
          }
        })
      },
      { threshold: 0.25 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [node, target, duration])

  const formatted =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString()

  return [formatted, setNode]
}
