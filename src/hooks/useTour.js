import { useEffect } from 'react'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { tourSteps, tourConfig } from '../lib/tourSteps'

export const useTour = () => {
  useEffect(() => {
    // Inject custom styles
    if (typeof document !== 'undefined') {
      const style = document.createElement('style')
      style.textContent = `
        .custom-driver-popover.driver-popover {
            background: var(--background);
            color: var(--foreground);
            border-radius: 16px;
            border: 1px solid var(--border);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }

        .custom-driver-popover .driver-popover-title {
            color: var(--foreground);
            font-size: 18px;
            font-weight: 700;
        }

        .custom-driver-popover .driver-popover-description {
            color: var(--foreground);
            opacity: 0.8;
            font-size: 14px;
        }

        .custom-driver-popover .driver-popover-close-btn {
            color: var(--foreground);
            opacity: 0.6;
        }

        .custom-driver-popover .driver-popover-close-btn:hover {
            opacity: 1;
            background: rgba(0, 0, 0, 0.05);
        }

        .custom-driver-popover .driver-popover-next-btn {
            background: var(--foreground);
            color: var(--background);
            border-radius: 8px;
            font-weight: 600;
            padding: 8px 16px;
        }

        .custom-driver-popover .driver-popover-next-btn:hover {
            opacity: 0.9;
            background: var(--foreground);
        }

        .custom-driver-popover .driver-popover-arrow-side-bottom.driver-popover-arrow {
            border-bottom-color: var(--background);
        }

        .custom-driver-popover .driver-popover-arrow-side-top.driver-popover-arrow {
            border-top-color: var(--background);
        }

        .custom-driver-popover .driver-popover-arrow-side-left.driver-popover-arrow {
            border-left-color: var(--background);
        }

        .custom-driver-popover .driver-popover-arrow-side-right.driver-popover-arrow {
            border-right-color: var(--background);
        }
    `
      document.head.appendChild(style)
    }

    const hasSeenTour = localStorage.getItem('hasSeenFullTour')
    
    if (!hasSeenTour) {
      const timer = setTimeout(() => {
        const driverObj = driver({
          ...tourConfig,
          steps: tourSteps,
          onDestroyStarted: () => {
            localStorage.setItem('hasSeenFullTour', 'true')
            driverObj.destroy()
          }
        })

        driverObj.drive()
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [])
}