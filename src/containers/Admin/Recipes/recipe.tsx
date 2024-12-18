import { useEffect, useState, useRef } from "react";
import AdminHeader from "../../../components/adminHeader/adminHeader";
import SearchBar from "../../../components/searchBar/searchBar";
import { DivBody, DivList, Table, TableHeader, TableRow, TableCell, TableActionDiv, TableButton, TableHeaderCell, DivSearch } from "../../../styles/ListStyles";
import { apiClient } from "../../../services/apiClient";
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { SearchBarFilter } from "../../../services/searchBar/searchBar";
import AddButon from "../../../components/addButon/addButon";
import { AddModalWithImage } from "./recipeModal";
import type { Recipe } from "../../../interfaces/recipe";
import { Difficulty } from "../../../interfaces/Enum/difficulty";
import { SubCategory } from "../../../interfaces/subCategory";
import { Ingredient } from "../../../interfaces/ingredient";
import { IngredientRecipe } from "../../../interfaces/ingredientRecipe";


function Recipe() {
    const [Recipe, setRecipe] = useState<Recipe[]>([]);
    const [search, setSearch] = useState<string>("");
    const [filteredRecipe, setFilteredRecipe] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    const isDataLoaded = useRef(false);

    const { openModal, AddItemModal, setFormValues, setImagePreview } = AddModalWithImage({
        onAdd: async (FormValue) => {
            if (selectedRecipe) {
                const payload = { ...FormValue };
                delete payload.id;
                if (payload.subCategory && payload.subCategory.id) {
                    payload.subCategoryId = payload.subCategory.id;
                    delete payload.subCategory;
                }
                if (payload.ingredientRecipes && payload.ingredientRecipes.length > 0) {
                    payload.ingredientRecipes = payload.ingredientRecipes.map((ingredient: IngredientRecipe) => ({
                        ingredientId: ingredient.ingredient?.id,
                        unit: ingredient.unit,
                        quantity: ingredient.quantity,
                    }));
                }
                const response = await apiClient.put(`/recipe/update/${selectedRecipe.id}`, payload);
                if (response.status === 200 || response.status === 201) {
                    setRecipe((prev) =>
                        prev.map((item) => (item.id === selectedRecipe.id ? response.data : item))
                    );
                    setFilteredRecipe((prev) =>
                        prev.map((item) => (item.id === selectedRecipe.id ? response.data : item))
                    );
                }
            } else {
            const payload = { ...FormValue };
            delete payload.id;
            console.log(FormValue);
            if (payload.subCategory && payload.subCategory.id) {
                payload.subCategoryId = payload.subCategory.id;
                delete payload.subCategory;
            }
            if (payload.ingredientRecipes && payload.ingredientRecipes.length > 0) {
                payload.ingredientRecipes = payload.ingredientRecipes.map((ingredient: IngredientRecipe) => ({
                    ingredientId: ingredient.ingredient?.id,
                    unit: ingredient.unit,
                    quantity: ingredient.quantity,
                }));
            }
            const response = await apiClient.post("/recipe/create", payload);
            if (response.status === 200 || response.status === 201) {
                setRecipe((prev) => [...prev, response.data]);
                setFilteredRecipe((prev) => [...prev, response.data]);
            }}
            setSelectedRecipe(null);
        },
        title: selectedRecipe ? "Editar Receita" : "Adicionar Receita",
        subCategories,
        ingredients,
    });


    const addPrefixToBase64 = (base64String: string, type: string) => {
        const mimeType = `image/${type}`;
        return `data:${mimeType};base64,${base64String}`;
      };

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

    const handleEdit = async (recipe: Recipe) => {

        await autoCompleteLabel();
        setSelectedRecipe(recipe);
        const updatedIngredientRecipes = await updateIngredientRecipes(recipe.ingredientRecipes, ingredients);
        
        setFormValues({ 
            name: recipe.name,
            difficulty: recipe.difficulty,
            description: recipe.description,
            time: recipe.time,
            serve: recipe.serve,
            picture: recipe.picture,
            subCategory: recipe.subCategory,
            ingredientRecipes: updatedIngredientRecipes,
            steps: recipe.steps,
        });
        if (recipe.picture){
            const fileType = recipe.picture.split(';')[0].split('/')[1];
            setImagePreview(addPrefixToBase64(recipe.picture, fileType));
        }

        openModal();      
    };


    const handleDelete = async (id: string) => {
        try {
            await apiClient.delete(`/recipe/delete/${id}`);
            setRecipe((prev) => prev.filter((item) => item.id !== id));
            setFilteredRecipe((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Erro ao deletar Categorias:", error);
        }
    }

    const handleAddItem = async () => {
        await setSelectedRecipe(null);
        await setFormValues({ 
            id: "",
            name: "",
            difficulty: Difficulty.FACIL,
            description: "",
            time: 0,
            serve: "",
            picture: "",
            subCategory: {
                id: "",
                name: "",
                picture: "",
                ebook: {
                    id: "",
                    title: "",
                    picture: "" }
                },
            ingredientRecipes: [],
            steps: []
        });
        await autoCompleteLabel();
        openModal();
    };

    const autoCompleteLabel = async () => {
        try {
            const Data = await apiClient.get("/subCategory");
            if (Data.status == 200) setSubCategories(Data.data);
        } catch (error) {
            console.error("Erro ao buscar Sub-Categorias:", error);
        }
    };

    useEffect(() => {
        const loadRecipe = async () => {
            try {
                const Data = await apiClient.get("/recipe");
                if (Data.status == 200) {
                    setRecipe(Data.data);
                }
                const DataIngredient = await apiClient.get("/ingredient");
                if (DataIngredient.status == 200) setIngredients(DataIngredient.data);

                isDataLoaded.current = true;
            } catch (error) {
                console.error("Erro ao buscar Categorias:", error);
            }
        };

        loadRecipe();
    }, []);

    useEffect(() => {
        const filtered = SearchBarFilter(Recipe, search, ["name"]);
        setFilteredRecipe(filtered);
    }, [search, Recipe]);


    return (
        <div>
            <AdminHeader titulo="Sub Categorias" />
            <DivBody>
                <DivSearch>
                    <SearchBar 
                        value={search}
                        onSearchChange={(value) => setSearch(value)}
                    />
                    <AddButon onClick={handleAddItem} />
                </DivSearch>

                <DivList>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell>Nome</TableHeaderCell>
                                <TableHeaderCell>Categoria</TableHeaderCell>
                                <TableHeaderCell>Sub Categoria</TableHeaderCell>
                                <TableHeaderCell>Ações</TableHeaderCell>
                            </TableRow>
                        </TableHeader>

                        <tbody>
                            {filteredRecipe.map((Recipe) => (
                                <TableRow key={Recipe.name}>
                                    <TableCell>{Recipe.name}</TableCell>
                                    <TableCell>{Recipe.subCategory?.name}</TableCell>
                                    <TableCell>{Recipe.subCategory?.ebook?.title}</TableCell>
                                    <TableCell>
                                        <TableActionDiv>
                                            <TableButton> 
                                                <EditOutlinedIcon onClick={() => handleEdit(Recipe)}   
                                                    sx={{"&:hover": {
                                                        color: "rgba(243, 114, 39)"}}}
                                                /> 
                                            </TableButton>
                                            <TableButton>
                                                <RemoveCircleOutlineOutlinedIcon
                                                    onClick={() => handleDelete(Recipe.id!)}
                                                    sx={{"&:hover": {
                                                        color: "rgba(255, 0, 0)"}}}
                                                />
                                            </TableButton>
                                        </TableActionDiv>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </Table>
                </DivList>
            </DivBody>
            {AddItemModal}
        </div>
    )
}

export default Recipe;