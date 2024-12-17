import { useEffect, useState } from "react"
import SearchBar from "../../../components/searchBar/searchBar";
import { SearchBarFilter } from "../../../services/searchBar/searchBar";
import { DivMain, DivRecipe, RecipeCard, RecipeImage, RecipeInfo } from "./homeStyles";
import { apiClient } from "../../../services/apiClient";
import { Recipe } from "../../../interfaces/recipe";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>("");
    const [recipe, setRecipe] = useState<Recipe[]>([]);
    const [filteredRecipe, setFilteredRecipe] = useState<Recipe[]>([]);

    useEffect(() => {
        const loadRecipe = async () => {
            try {
                const Data = await apiClient.get("/recipe");
                if (Data.status == 200) setRecipe(Data.data);
            } catch (error) {
                console.error("Erro ao buscar receitas:", error);
            }
        };

        loadRecipe();
    }, []);

    useEffect(() => {
            const filtered = SearchBarFilter(recipe, search, ["name"]);
            setFilteredRecipe(filtered);
        }, [search, recipe]);

    const getImageType = (base64: string) => {
        if (base64.startsWith("/9j/")) return "jpeg";
        if (base64.startsWith("iVBORw")) return "png";
        return "jpeg";
    };

    return (
        <DivMain>
            <SearchBar 
                value={search}
                onSearchChange={(value) => setSearch(value)}
            />

            <DivRecipe>
                {filteredRecipe.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        onClick={() => navigate(`/recipe/${recipe.id}`)}
                    >
                        <RecipeImage
                            src={`data:image/${getImageType(recipe.picture)};base64,${recipe.picture}`}
                            alt={recipe.name}
                        />
                        <RecipeInfo>
                            <h2>{recipe.name}</h2>
                        </RecipeInfo>
                    </RecipeCard>
                ))}
            </DivRecipe>
        </DivMain>
    )
}

export default Home