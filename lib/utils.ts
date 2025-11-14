import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Fusionne proprement plusieurs classes conditionnelles Tailwind.
 * Exemple :
 *   cn("px-4", condition && "bg-blue-500")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formate une date en mode lisible (ex: "12 nov. 2025")
 */
export function formatDate(date: string | Date) {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Tronque une chaîne trop longue (utile pour les aperçus)
 */
export function truncate(str: string, length: number) {
  if (str.length <= length) return str;
  return str.slice(0, length) + '…';
}
