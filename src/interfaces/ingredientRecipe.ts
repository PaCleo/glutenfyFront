import { Ingredient } from './ingredient';
import { Units } from "./Enum/units"

export interface IngredientRecipe {
    id?: string
    quantity: number
    unit: Units;
    ingredient?: Ingredient
    ingredientId?: string
}