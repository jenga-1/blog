import {
  favoritesChangedEvent,
  favoritesStorageKey,
} from "@/config/client";

export function getFavorites(): string[] {
  try {
    const raw = localStorage.getItem(favoritesStorageKey);

    if (!raw) {
      return [];
    }

    const value: unknown = JSON.parse(raw);

    return Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites: string[]): void {
  localStorage.setItem(favoritesStorageKey, JSON.stringify(favorites));

  window.dispatchEvent(
    new CustomEvent(favoritesChangedEvent, {
      detail: { favorites },
    }),
  );
}

export function toggleFavorite(postId: string): string[] {
  const favorites = getFavorites();

  const nextFavorites = favorites.includes(postId)
    ? favorites.filter((id) => id !== postId)
    : [...favorites, postId];

  saveFavorites(nextFavorites);

  return nextFavorites;
}
