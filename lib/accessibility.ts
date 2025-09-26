// Accessibility utilities for the Donare platform

export const ARIA_LABELS = {
  navigation: {
    main: 'Main navigation',
    mobile: 'Mobile navigation menu',
    close: 'Close navigation menu',
    open: 'Open navigation menu',
  },
  buttons: {
    previous: 'Previous slide',
    next: 'Next slide',
    play: 'Play video',
    pause: 'Pause video',
    submit: 'Submit form',
    reset: 'Reset form',
  },
  forms: {
    required: 'Required field',
    optional: 'Optional field',
    error: 'Error message',
    success: 'Success message',
  },
  carousel: {
    region: 'Image carousel',
    slide: 'Slide {current} of {total}',
    indicator: 'Go to slide {number}',
  },
} as const;

export const KEYBOARD_KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  TAB: 'Tab',
  HOME: 'Home',
  END: 'End',
} as const;

// Focus management utilities
export class FocusManager {
  private static focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(', ');

  static getFocusableElements(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll(this.focusableSelectors));
  }

  static trapFocus(container: HTMLElement, event: KeyboardEvent) {
    const focusableElements = this.getFocusableElements(container);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.key === KEYBOARD_KEYS.TAB) {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    }
  }

  static restoreFocus(element: HTMLElement | null) {
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  }
}

// Screen reader utilities
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Color contrast utilities
export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    const rgb = color.match(/\d+/g);
    if (!rgb) return 0;
    
    const [r, g, b] = rgb.map(c => {
      const val = parseInt(c) / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
};

export const meetsWCAGContrast = (color1: string, color2: string, level: 'AA' | 'AAA' = 'AA'): boolean => {
  const ratio = getContrastRatio(color1, color2);
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
};

// Reduced motion utilities
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getAnimationDuration = (defaultDuration: number): number => {
  return prefersReducedMotion() ? 0 : defaultDuration;
};

// Skip link utility
export const createSkipLink = (targetId: string, text: string = 'Skip to main content'): HTMLElement => {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.textContent = text;
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded';
  
  return skipLink;
};

// Form validation accessibility
export const setFieldError = (fieldId: string, errorMessage: string) => {
  const field = document.getElementById(fieldId);
  const errorId = `${fieldId}-error`;
  
  if (field) {
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', errorId);
    
    let errorElement = document.getElementById(errorId);
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.id = errorId;
      errorElement.setAttribute('role', 'alert');
      errorElement.className = 'text-sm text-red-600 mt-1';
      field.parentNode?.appendChild(errorElement);
    }
    
    errorElement.textContent = errorMessage;
  }
};

export const clearFieldError = (fieldId: string) => {
  const field = document.getElementById(fieldId);
  const errorId = `${fieldId}-error`;
  const errorElement = document.getElementById(errorId);
  
  if (field) {
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
  }
  
  if (errorElement) {
    errorElement.remove();
  }
};

// High contrast mode detection
export const isHighContrastMode = (): boolean => {
  return window.matchMedia('(prefers-contrast: high)').matches;
};

// Touch device detection
export const isTouchDevice = (): boolean => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};
