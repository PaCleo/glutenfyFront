import { IngredientRecipe } from './ingredientRecipe';

export interface Ingredient {
    id: string;
    name: string;
    ingredientRecipes?: IngredientRecipe[]
}