export const createArray = (n: number): number[] =>
  Array.from({ length: n }, (_, i) => i + 1);
