export const waLink = (number: string, text: string, hi: string, tail: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(`${hi}\n\n${text}\n\n${tail}`)}`;
