export function formatData(data) {
  return {
    ...data[0],
    liked: false,
    rating: 0,
    preferences: {},
  };
}

export const areNamesMatching = (first, second) =>
  first.name.toLowerCase() === second.name.toLowerCase();
