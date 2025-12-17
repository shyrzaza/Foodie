// Converted from utils.js to TypeScript
export async function loadRecipes(): Promise<any[]> {
  const recipes: any[] = [];
  try {
    const context = import.meta.glob('../recipes/*.json', { eager: true });
    for (const path in context) {
      recipes.push((context as any)[path]);
    }
  } catch (e) {
    // fallback for environments that don't support import.meta.glob
  }
  return recipes;
}
