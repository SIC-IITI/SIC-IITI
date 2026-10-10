// Sorts instruments by their admin-set displayOrder (ascending).
// Instruments with no displayOrder go after the ordered ones, and ties
// (or missing values) keep the order the API returned them in.
export function sortInstruments(list) {
  const rank = (i) => {
    const n = Number(i.displayOrder);
    return i.displayOrder === null || i.displayOrder === undefined || i.displayOrder === "" || Number.isNaN(n)
      ? Infinity
      : n;
  };
  return list
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const ra = rank(a.item);
      const rb = rank(b.item);
      if (ra !== rb) return ra === Infinity ? 1 : rb === Infinity ? -1 : ra - rb;
      return a.index - b.index;
    })
    .map(({ item }) => item);
}
