const WORDS_PER_MINUTE = 200;

export function getReadingTime(content: string): number {
  const sanitizedContent = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/[#>*_\-]/g, " ");

  const words = sanitizedContent.trim().split(/\s+/).filter(Boolean);

  return Math.max(1, Math.ceil(words.length / WORDS_PER_MINUTE));
}
