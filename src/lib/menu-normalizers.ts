const caloriePhraseRegex =
  /(?:[-–—,]\s*)?\b(\d{2,4})\s*(?:cal(?:ories)?)\b/gi;

const caloriesByName: Record<string, number> = {
  "Classic Chocolate Chip": 320,
  "Double Dark Chocolate": 340,
  "Oatmeal Raisin": 290,
  "Peanut Butter Dream": 330,
  "White Chocolate Macadamia": 350,
  Snickerdoodle: 280,
  "Butter Croissant": 270,
  "Pain au Chocolat": 320,
  "Almond Croissant": 340,
  "Fruit Danish": 310,
  Palmier: 240,
  Eclair: 290,
  "Sourdough Loaf": 120,
  "French Baguette": 110,
  "Whole Wheat Country": 130,
  "Olive Rosemary": 140,
  Brioche: 150,
  Multigrain: 125,
};

export const extractCalories = (text?: string | null): number | null => {
  if (!text) return null;
  const match = text.match(/\b(\d{2,4})\s*(?:cal(?:ories)?)\b/i);
  if (!match) return null;
  return Number.parseInt(match[1], 10) || null;
};

export const stripCaloriesFromDescription = (
  description?: string | null,
): string => {
  if (!description) return "";

  const withoutCalories = description.replace(caloriePhraseRegex, "");

  return withoutCalories
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,!?])/g, "$1")
    .trim();
};

export const deriveCalories = (
  productName: string,
  description?: string | null,
): number => {
  return (
    extractCalories(description) ??
    caloriesByName[productName] ??
    300 // fallback until dashboard stores explicit nutrition
  );
};
