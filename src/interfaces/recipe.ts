import { Comments } from './comments';
import { SubCategory } from './subCategory';
import { Difficulty } from './Enum/difficulty';
import { StepByStep } from "./stepByStep";
import { Ratings } from './ratings';
import { IngredientRecipe } from './ingredientRecipe';

export interface Recipe {
    id?: string;
    name: string;
    description: string;
    difficulty: Difficulty;
    serve: string;
    time: number;
    picture: string;
    subCategory?: SubCategory;
    subCategoryId?: string;
    ingredientRecipes: IngredientRecipe[];
    steps: StepByStep[];
    ratings: Ratings[];
    comments: Comments[];
}