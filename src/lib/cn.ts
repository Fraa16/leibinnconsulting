import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge conditional class names, with later Tailwind utilities winning over
 * earlier conflicting ones (`cn('p-4', 'p-6')` → `'p-6'`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
