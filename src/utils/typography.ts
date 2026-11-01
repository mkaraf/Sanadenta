/**
 * Czech typography: one-letter prepositions and conjunctions (k, s, v, z, o, u, a, i) must not
 * end a line, and a number stays with the word after it ("12 let", "2 roky"). Joins them with a
 * non-breaking space. Safe on strings with inline HTML (it only touches plain-text spaces).
 */
export const czNbsp = (text: string): string =>
  text.replace(/(?<=^|[\s(>])([ksvzouaiKSVZOUAI]) +/g, '$1 ').replace(/(?<=\d) +(?=\p{L})/gu, ' ');
