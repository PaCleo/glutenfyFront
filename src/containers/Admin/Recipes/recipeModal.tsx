import { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { InputImage, TitleDiv, InputDiv, DisplayFlexDiv, Title } from "./recipeModalStyles";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Autocomplete from "@mui/material/Autocomplete";
import { Recipe } from "../../../interfaces/recipe";
import { Difficulty } from "../../../interfaces/Enum/difficulty";
import { SubCategory } from "../../../interfaces/subCategory";
import { StepByStep } from "../../../interfaces/stepByStep";
import { Ingredient } from "../../../interfaces/ingredient";
import { IngredientRecipe } from "../../../interfaces/ingredientRecipe";
import { Units } from "../../../interfaces/Enum/units";

export function AddModalWithImage({
    onAdd,
    title,
    subCategories,
    ingredients,
}: {
    onAdd: (recipe: Recipe) => Promise<void>;
    title: string
    subCategories: SubCategory[]
    ingredients: Ingredient[] 
} ) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isStepModalOpen, setIsStepModalOpen] = useState(false);
    const [selectedDifficulty, setSelectedDifficulty] = useState(Difficulty.FACIL);
    const [newIngredient, setNewIngredient] = useState<{
        ingredient: Ingredient,
        unit: Units,
        quantity: number
    }>({
        ingredient: {id: '', name: ''},
        unit: Units.G,
        quantity: 0,
      });
    const [ingredientRecipes, setIngredientRecipes] = useState<IngredientRecipe[]>([]);
    const [formValues, setFormValues] = useState<Recipe>({
        id: "",
        name: "",
        description: "",
        difficulty: selectedDifficulty,
        serve: "",
        time: 0,
        picture: "",
        subCategory: { id: "", name: "", picture: "", ebook: { id: "", title: "", picture: "" } },
        ingredientRecipes: [],
        steps: [],
        ratings: [],
        comments: []
    }
    );
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);


    const openModal = () => {setIsModalOpen(true);}
    const closeModal = () => {        
        setIsModalOpen(false);
        setSelectedDifficulty(Difficulty.FACIL);
        setFormValues({
            id: "",
            name: "",
            description: "",
            difficulty: selectedDifficulty,
            serve: "",
            time: 0,
            picture: "",
            subCategory: { id: "", name: "", picture: "", ebook: { id: "", title: "", picture: "" } },
            ingredientRecipes: [],
            steps: [],
            ratings: [],
            comments: []
        });
        setImagePreview(null);
        setImageBase64(null);
    
    };
    const openStepModal = () => {setIsStepModalOpen(true);};
    const closeStepModal = () => {
        clearEmptySteps();
        setIsStepModalOpen(false);
    };
    

    const handleFieldChange = (fieldName: string, value: string | number) => {
        setFormValues((prev) => ({ ...prev, [fieldName]: value }));
    };

    const handleStepsChange = (updatedSteps: StepByStep[]) => {
        setFormValues((prev) => ({ ...prev, steps: updatedSteps }));
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setImageBase64(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddItem = async () => {
        try {
            const updatedValues = { ...formValues };
            if (imageBase64) {
                updatedValues.picture = imageBase64;
            }
            await onAdd(updatedValues);
        } catch (error) {
            console.error("Erro ao adicionar item:", error);
        } finally {
            closeModal();
        }
    };

    const handleDeleteStep = (index: number) => {
        const updatedSteps = formValues.steps.filter((_, i) => i !== index);
        handleStepsChange(updatedSteps);
    };

    const clearEmptySteps = () => {
        const updatedSteps = formValues.steps.filter((step) => step.description.trim() !== "");
        handleStepsChange(updatedSteps);
    }

    useEffect(() => {
        setFormValues((prev) => 
            {
                if (prev.subCategory && prev.subCategory.id) {
                  return {
                    ...prev,
                    subCategory: {
                      ...prev.subCategory,
                      ebook: {
                        ...prev.subCategory.ebook,
                        title: subCategories.find((sub) => sub.id === prev.subCategory?.id)?.ebook?.title || "",
                      },
                    },
                  };
                } else {
                  return prev;
                }
              });
    }, [formValues.subCategory?.id, subCategories]);
    
      const handleAddIngredient = () => {
        if (newIngredient.ingredient && newIngredient.unit && newIngredient.quantity) {
            setIngredientRecipes([...ingredientRecipes, newIngredient]);
            const updatedIngredients = [...ingredientRecipes, newIngredient];
            setFormValues((prev) => ({
                ...prev,
                ingredientRecipes: updatedIngredients,
            }));
            setNewIngredient({ ingredient: {id: '', name: ''}, unit: Units.G, quantity: 0 });
        } else {
            alert("Por favor, preencha todos os campos!");
        }
    };

    const handleDeleteIngredient = (index: number) => {
        const updatedIngredients = ingredientRecipes.filter((_, i) => i !== index);
        setIngredientRecipes(updatedIngredients);
    };

    const AddItemModal = (
        <Dialog
            open={isModalOpen}
            onClose={closeModal}
            sx={{
                "& .MuiDialog-paper": {
                    borderRadius: "32px",
                    width: "800px",
                    maxWidth: "none"
                },
            }}
        >
            <TitleDiv>
                <DialogTitle
                    sx={{
                        display: "flex",
                        justifyContent: "left",
                        textAlign: "left",
                        fontWeight: "bold",
                        width: "88%",
                    }}
                >
                    {title}
                </DialogTitle>
                <CancelOutlinedIcon
                    onClick={closeModal}
                    sx={{ cursor: "pointer", "&:hover": { color: "rgba(255, 0, 0)" } }}
                />
            </TitleDiv>

            <DialogContent>
                <TextField 
                    label="Titulo"
                    margin="dense"
                    fullWidth
                    value={formValues.name}
                    type="text"
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "rgba(255, 165, 0, 0.8)",
                                borderRadius: "16px",
                            },
                            "&:hover fieldset": { borderColor: "#F37227" },
                            "&.Mui-focused fieldset": { borderColor: "#7FFFD4" },
                        },
                    }}
                />
                <DisplayFlexDiv>
                    {formValues.subCategory && formValues.subCategory.id && (
                        <TextField 
                            label="Categoria"
                            margin="dense"
                            fullWidth
                            value={formValues.subCategory.ebook.title}
                            slotProps={{
                                input: { readOnly: true },
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "rgba(255, 165, 0, 0.8)",
                                        borderRadius: "16px",
                                    },
                                    "&:hover fieldset": { borderColor: "#F37227" },
                                    "&.Mui-focused fieldset": { borderColor: "#7FFFD4" },
                                },
                            }}
                        />
                    )}

                    <Autocomplete
                        disablePortal={true}
                        options={subCategories}
                        getOptionLabel={(option) => option.name}
                        value={
                            subCategories.find((subCategory) => subCategory.id === formValues.subCategory?.id)
                        }
                        onChange={(_, selectedSubCategory) => {
                            if (selectedSubCategory) {
                                setFormValues((prev) => ({
                                    ...prev,
                                    subCategory: selectedSubCategory,
                                }));
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Subcategoria"
                                fullWidth
                                sx={{
                                    "& .MuiAutocomplete-popupIndicator": {
                                        position: "absolute",
                                        width: "32px",
                                        height: "32px",
                                        right: "8px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        "& svg": { fontSize: "20px", color: "#F37227" },
                                    },
                                    "& .MuiAutocomplete-clearIndicator": {
                                        display: "none",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "rgba(255, 165, 0, 0.8)",
                                            borderRadius: "16px",
                                        },
                                        "&:hover fieldset": { borderColor: "#F37227" },
                                        "&.Mui-focused fieldset": { borderColor: "#7FFFD4" },
                                    },
                                }}
                            />
                        )}
                    />
                </DisplayFlexDiv>

                <TextField
                    label="Descrição"
                    margin="dense"
                    fullWidth
                    value={formValues.description}
                    type="text"
                    onChange={(e) => handleFieldChange("description", e.target.value)}
                    multiline
                    minRows={1}
                    maxRows={6}
                    sx={{
                        marginTop: "18px",
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "rgba(255, 165, 0, 0.8)",
                                borderRadius: "16px",
                            },
                            "&:hover fieldset": { borderColor: "#F37227" },
                            "&.Mui-focused fieldset": { borderColor: "#7FFFD4" },
                        },
                    }}
                />

                <DisplayFlexDiv>
                    <TextField
                        label="Tempo de Preparo (minutos)"
                        margin="dense"
                        fullWidth
                        value={formValues.time}
                        type="number"
                        onChange={(e) => handleFieldChange("time", e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "rgba(255, 165, 0, 0.8)",
                                    borderRadius: "16px",
                                },
                                "&:hover fieldset": { borderColor: "#F37227" },
                                "&.Mui-focused fieldset": { borderColor: "#7FFFD4" },
                            },
                        }}
                    />

                    <TextField
                        label="Serve Ate"
                        margin="dense"
                        fullWidth
                        value={formValues.serve}
                        type="text"
                        onChange={(e) => handleFieldChange("serve", e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "rgba(255, 165, 0, 0.8)",
                                    borderRadius: "16px",
                                },
                                "&:hover fieldset": { borderColor: "#F37227" },
                                "&.Mui-focused fieldset": { borderColor: "#7FFFD4" },
                            },
                        }}
                    />

                    <Autocomplete
                        disablePortal={true}
                        options={[Difficulty.FACIL, Difficulty.MEDIO, Difficulty.DIFICIL]}
                        value={formValues.difficulty}
                        onChange={(_, newValue) => newValue !== null && handleFieldChange("difficulty", newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Dificuldade"
                                fullWidth
                                sx={{
                                    "& .MuiAutocomplete-popupIndicator": {
                                        position: "absolute",
                                        width: "32px",
                                        height: "32px",
                                        right: "8px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        "& svg": { fontSize: "20px", color: "#F37227" },
                                    },
                                    "& .MuiAutocomplete-clearIndicator": {
                                        display: "none",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "rgba(255, 165, 0, 0.8)",
                                            borderRadius: "16px",
                                        },
                                        "&:hover fieldset": { borderColor: "#F37227" },
                                        "&.Mui-focused fieldset": { borderColor: "#7FFFD4" },
                                    },
                                }}
                            />
                        )}
                    />
                </DisplayFlexDiv>

                <DisplayFlexDiv>
                    <TitleDiv>
                        <Title>Passos da Receita</Title>
                    </TitleDiv>

                    <Button 
                        onClick={() => {
                            clearEmptySteps()
                            const newStep = { description: "", number: formValues.steps.length + 1 };
                            handleStepsChange([...formValues.steps, newStep]);
                            openStepModal()
                            }}
                            sx={{
                            color: "#FFFFFF",
                            backgroundColor: "#F37227",
                            "&:hover": { backgroundColor: "#7FFFD4" },
                            borderRadius: "12px",
                            marginTop: "16px",
                            }}
                    >
                        Adicionar Etapas
                    </Button>
                </DisplayFlexDiv>
                
                    <Dialog
                        open={isStepModalOpen}
                        onClose={closeStepModal}
                        sx={{
                            "& .MuiDialog-paper": {
                                borderRadius: "32px",
                                width: "500px",
                            },
                        }}
                    >
                        <TitleDiv>
                            <DialogTitle
                                sx={{
                                    display: "flex",
                                    justifyContent: "left",
                                    textAlign: "left",
                                    fontWeight: "bold",
                                    width: "88%",
                                }}
                            >
                                {title}
                            </DialogTitle>
                            <CancelOutlinedIcon
                                onClick={closeStepModal}
                                sx={{ cursor: "pointer", "&:hover": { color: "rgba(255, 0, 0)" } }}
                            />
                        </TitleDiv>

                        <DialogContent>
                        {formValues.steps.map((step, index) => (
                            <div key={index} style={{ marginBottom: "16px" }}>
                                <TextField
                                    label={`Texto da Etapa ${index + 1}`}
                                    margin="dense"
                                    fullWidth
                                    value={step.description}
                                    type="text"
                                    multiline
                                    minRows={1}
                                    maxRows={5}
                                    onChange={(e) => {
                                    const updatedSteps = [...formValues.steps];
                                    updatedSteps[index].description = e.target.value;
                                    handleStepsChange(updatedSteps);
                                    }}
                                    sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                        borderColor: "rgba(255, 165, 0, 0.8)",
                                        borderRadius: "16px",
                                        },
                                        "&:hover fieldset": { borderColor: "#F37227" },
                                        "&.Mui-focused fieldset": { borderColor: "#7FFFD4" },
                                    },
                                    }}
                                />
                                <TextField
                                    label={`Número da Etapa ${index + 1}`}
                                    margin="dense"
                                    fullWidth
                                    value={step.number}
                                    type="number"
                                    onChange={(e) => {
                                    const updatedSteps = [...formValues.steps];
                                    updatedSteps[index].number = Number(e.target.value);
                                    handleStepsChange(updatedSteps);
                                    }}
                                    sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                        borderColor: "rgba(255, 165, 0, 0.8)",
                                        borderRadius: "16px",
                                        },
                                        "&:hover fieldset": { borderColor: "#F37227" },
                                        "&.Mui-focused fieldset": { borderColor: "#7FFFD4" },
                                    },
                                    }}
                                />
                            </div>
                            ))}
                            <Button
                                onClick={() => {
                                closeStepModal();
                                }}
                                sx={{
                                color: "#FFFFFF",
                                backgroundColor: "#F37227",
                                "&:hover": { backgroundColor: "#7FFFD4" },
                                borderRadius: "12px",
                                marginTop: "16px",
                                }}
                            >
                                Cadastrar
                            </Button>
                        </DialogContent>
                    </Dialog>

                    <TableContainer component={Paper}
                    sx={{ marginTop: "20px", borderRadius: "16px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
                        <Table sx={{ tableLayout: "fixed" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "bold", color: "#F37227", width: "30%" }}>Número da Etapa</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#F37227", width: "55%" }}>Descrição</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#F37227", width: "15%" }}>Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {formValues.steps.map((step, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{step.number}</TableCell>
                                        <TableCell
                                            sx={{
                                                textAlign: "left",
                                                paddingLeft: "16px",
                                                wordBreak: "break-word",
                                                whiteSpace: "normal",
                                                overflowWrap: "break-word",
                                                height: "auto"
                                            }}
                                        >
                                            {step.description}
                                        </TableCell>
                                        <TableCell>
                                            <CancelOutlinedIcon
                                                onClick={() =>handleDeleteStep(index)}
                                                sx={{ cursor: "pointer", "&:hover": { color: "rgba(255, 0, 0)" } }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                <DisplayFlexDiv>
                    <Title>Ingredientes</Title>
                </DisplayFlexDiv>

                <DisplayFlexDiv>
                
                    <Autocomplete
                        disablePortal
                        options={ingredients}
                        getOptionLabel={(option) => option.name}
                        value={newIngredient.ingredient}
                        onChange={(_, selectedIngredient) => {
                        setNewIngredient({ ...newIngredient, ingredient: selectedIngredient || { id: '', name: '' } });
                        }}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Ingrediente"
                            fullWidth
                            sx={{
                                "& .MuiAutocomplete-popupIndicator": {
                                    position: "absolute",
                                    width: "32px",
                                    height: "32px",
                                    right: "8px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    "& svg": { fontSize: "20px", color: "#F37227" },
                                },
                                "& .MuiAutocomplete-clearIndicator": {
                                    display: "none",
                                },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "rgba(255, 165, 0, 0.8)",
                                        borderRadius: "16px",
                                    },
                                    "&:hover fieldset": { borderColor: "#F37227" },
                                    "&.Mui-focused fieldset": { borderColor: "#7FFFD4" },
                                },
                            }}
                        />
                        )}
                    />

                    <Autocomplete
                        disablePortal
                        options={[Units.MG, Units.G, Units.KG, Units.ML, Units.L, Units.UN, Units.XIC, Units.CS, Units.CC]}
                        value={newIngredient.unit}
                        onChange={(_, newValue) => {
                            if (newValue) {
                                setNewIngredient({ ...newIngredient, unit: newValue as Units });
                            } else {
                                setNewIngredient({ ...newIngredient, unit: Units.G });
                            }}}
                        
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Unidade"
                            fullWidth
                            sx={{
                                "& .MuiAutocomplete-popupIndicator": {
                                    position: "absolute",
                                    width: "32px",
                                    height: "32px",
                                    right: "8px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    "& svg": { fontSize: "20px", color: "#F37227" },
                                },
                                "& .MuiAutocomplete-clearIndicator": {
                                    display: "none",
                                },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "rgba(255, 165, 0, 0.8)",
                                        borderRadius: "16px",
                                    },
                                    "&:hover fieldset": { borderColor: "#F37227" },
                                    "&.Mui-focused fieldset": { borderColor: "#7FFFD4" },
                                },
                            }}
                        />
                        )}
                    />

                    {/* Campo de Quantidade */}
                    <TextField
                        label="Quantidade"
                        margin="dense"
                        fullWidth
                        value={newIngredient.quantity}
                        onChange={(e) => setNewIngredient({ ...newIngredient, quantity: parseInt(e.target.value) })}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "rgba(255, 165, 0, 0.8)",
                                    borderRadius: "16px",
                                },
                                "&:hover fieldset": { borderColor: "#F37227" },
                                "&.Mui-focused fieldset": { borderColor: "#7FFFD4" },
                            },
                            "& .MuiInputBase-input": {
                                padding: "15px 12px 12px 15px",
                            },
                        }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddIngredient}
                        sx={{
                            color: "#FFFFFF",
                            backgroundColor: "#F37227",
                            "&:hover": { backgroundColor: "#7FFFD4" },
                            borderRadius: "12px",
                            width: "80%",
                            fontSize: "16px",
                            fontFamily: "Montserrat, sans-serif",
                            textTransform: "none",
                            alignItems: "center",
                            height: "50px",
                        }}
                    >
                        Adicionar Ingrediente
                    </Button>
                </DisplayFlexDiv>

                <TableContainer
                        component={Paper}
                        sx={{
                            marginTop: "20px",
                            borderRadius: "16px",
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <Table sx={{ tableLayout: "fixed" }}>
                            <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold", color: "#091747", width: "30%" }}>
                                Ingrediente
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#091747", width: "25%" }}>
                                Unidade
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#091747", width: "25%" }}>
                                Quantidade
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#091747", width: "20%" }}>
                                Ações
                                </TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {formValues.ingredientRecipes.map((item, index) => (
                                <TableRow key={index}>
                                <TableCell
                                    sx={{
                                    textAlign: "left",
                                    wordBreak: "break-word",
                                    whiteSpace: "normal",
                                    overflowWrap: "break-word",
                                    height: "auto",
                                    }}
                                >
                                    {item.ingredient?.name}
                                </TableCell>
                                <TableCell>{item.unit}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>
                                    <CancelOutlinedIcon
                                    onClick={() => handleDeleteIngredient(index)}
                                    sx={{ cursor: "pointer", "&:hover": { color: "rgba(255, 0, 0)" } }}
                                    />
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                <div style={{ marginTop: "16px" }}>
                    {imagePreview && (
                        <div
                            style={{
                                textAlign: "center",
                                marginBottom: "16px",
                            }}
                        >
                            <img
                                src={imagePreview}
                                alt="Pré-visualização"
                                style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                    borderRadius: "16px",
                                }}
                            />
                        </div>
                    )}
                    <label htmlFor="fileInput" style={{ cursor: "pointer", marginBottom: "8px" }}>
                        <InputDiv>
                            Escolher Imagem
                        </InputDiv>
                    </label>
                    <InputImage
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                    />
                    
                </div>
            </DialogContent>
            <DialogActions
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Button
                    onClick={handleAddItem}
                    sx={{
                        color: "#FFFFFF",
                        backgroundColor: "#F37227",
                        "&:hover": { backgroundColor: "#7FFFD4" },
                        borderRadius: "12px",
                        width: "80%",
                        fontSize: "16px",
                        fontFamily: "Montserrat, sans-serif",
                        textTransform: "none",
                        alignItems: "center",
                        height: "50px",
                    }}
                >
                    Cadastrar
                </Button>
            </DialogActions>
        </Dialog>
    );

    const setExternalFormValues = (values: Partial<Recipe>) => {
        setFormValues((prev) => ({ ...prev, ...values }));
    };


    return {
        openModal,
        closeModal,
        AddItemModal,
        setFormValues: setExternalFormValues,
        setImagePreview
    };
}
