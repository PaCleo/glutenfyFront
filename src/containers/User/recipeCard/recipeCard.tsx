import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../../../services/apiClient";
import { Recipe } from "../../../interfaces/recipe";
import { Ingredient } from "../../../interfaces/ingredient";
import { IngredientRecipe } from "../../../interfaces/ingredientRecipe";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import {
    RecipeContainer,
    RecipeTitle,
    RecipeHeader,
    RecipeImage,
    RecipeInfo,
    RecipeDescription,
    RecipeIngredients,
    RecipeSteps,
    StepCard,
    StepNumber,
    StepDescription,
    StepsList
} from "./recipeCardStyles";

export function RecipeCard() {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await apiClient.get(`/recipe/${id}`);
                if (response.status === 200)setRecipe(response.data);

                const DataIngredient = await apiClient.get("/ingredient");
                if (DataIngredient.status == 200){
                    if (response.data) {
                        const updatedIngredientRecipe = await updateIngredientRecipes(
                            response.data.ingredientRecipes,
                            DataIngredient.data
                        );
                        setRecipe((prev) => prev ? ({
                            ...prev,
                            ingredientRecipes: updatedIngredientRecipe
                        }) : null);
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar detalhes da receita:", error);
            }
        };

        fetchRecipe();
    }, [id]);

    const updateIngredientRecipes = async (ingredientRecipes: IngredientRecipe[], ingredients: Ingredient[]) => {
        return Promise.all(
            ingredientRecipes.map(async (ingredientRecipe) => {
                const foundIngredient = ingredients.find((ingredient) =>
                    ingredient.ingredientRecipes?.some((recipe) => recipe.id === ingredientRecipe.id)
                );
                console.log(foundIngredient);
                return {
                    ...ingredientRecipe,
                    ingredient: {
                        name: foundIngredient?.name || "Desconhecido",
                        id: foundIngredient?.id || "",
                    },
                };
            })
        );
    };

    if (!recipe) {
        return <p>Carregando...</p>;
    }

    return (
        <RecipeContainer>
            {/* Título */}
            <RecipeTitle>{recipe.name}</RecipeTitle>

            {/* Seção de detalhes ao lado da imagem */}
            <RecipeHeader>
                <RecipeImage
                    src={`data:image/jpeg;base64,${recipe.picture}`}
                    alt={recipe.name}
                />
                <RecipeInfo>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <AccessTimeOutlinedIcon sx={{ color: "#F37227" }} />
                        <span>{recipe.time} horas</span>
                    </div>
                    <p><strong>Dificuldade:</strong> {recipe.difficulty}</p>
                    <p><strong>Serve:</strong> {recipe.serve}</p>
                </RecipeInfo>
            </RecipeHeader>

            {/* Apresentação */}
            <RecipeDescription>
                <h2>Apresentação</h2>
                <div className="highlight"></div>
                <p>{recipe.description}</p>
            </RecipeDescription>

            {/* Ingredientes */}
            <RecipeIngredients>
                <h2>Ingredientes</h2>
                <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                    {recipe.ingredientRecipes.map((ingredient, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <RestaurantMenuOutlinedIcon sx={{ color: "#F37227", marginRight: '5px' }} />
                            {ingredient.ingredient?.name}
                            {ingredient.unit && `: (${ingredient.quantity} ${ingredient.unit})`}
                        </li>
                    ))}
                </ul>
            </RecipeIngredients>

            {/* Passo a passo */}
            <RecipeSteps>
                <h2>Preparo</h2>
                <div className="highlight"></div>
                <StepsList>
                    {recipe.steps.sort((a, b) => a.number - b.number).map((step) => (
                        <StepCard key={step.number}>
                            <StepNumber>{step.number}</StepNumber>
                            <StepDescription>{step.description}</StepDescription>
                        </StepCard>
                    ))}
                </StepsList>
            </RecipeSteps>
        </RecipeContainer>
    );
}