import { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import { InputImage, TitleDiv, InputDiv } from "../addModal/addModalStyles";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Autocomplete from "@mui/material/Autocomplete";

interface FieldConfig {
    name: string;
    label: string;
    type?: "text" | "number" | "password" | "autocomplete";
    defaultValue?: string | number;
    options?: { label: string; value: string | number }[];
}

interface AddItemServiceProps<T> {
    onAdd: (item: T) => Promise<void>;
    title: string;
    fields: FieldConfig[];
}

type FormValues = Record<string, string | number | undefined>;

export function AddModalWithImage<T>({ onAdd, title, fields }: AddItemServiceProps<T>) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValues, setFormValues] = useState<FormValues>(() =>
        fields.reduce((acc, field) => {
            acc[field.name] = field.defaultValue || "";
            return acc;
        }, {} as FormValues)
    );
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);


    const openModal = () => {setIsModalOpen(true);}
    const closeModal = () => {        
        setIsModalOpen(false);
    
        const resetFormValues = fields.reduce((acc, field) => {
            acc[field.name] = field.defaultValue !== undefined ? field.defaultValue : "";
            return acc;
        }, {} as FormValues);
    
        setFormValues(resetFormValues);
        setImagePreview(null);
        setImageBase64(null);
    
    };
    

    const handleFieldChange = (fieldName: string, value: string | number) => {
        setFormValues((prev) => ({ ...prev, [fieldName]: value }));
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
            const formData = new FormData();
            Object.keys(formValues).forEach((key) => {
                formData.append(key, formValues[key]?.toString() || '');
            });
            if (imageBase64) {
                formData.append("picture", imageBase64);
            }
            await onAdd(formData as unknown as T);
        } catch (error) {
            console.error("Erro ao adicionar item:", error);
        } finally {
            closeModal();
        }
    };

    const AddItemModal = (
        <Dialog
            open={isModalOpen}
            onClose={closeModal}
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
                    onClick={closeModal}
                    sx={{ cursor: "pointer", "&:hover": { color: "rgba(255, 0, 0)" } }}
                />
            </TitleDiv>

            <DialogContent>
                {fields.map((field) => {
                    if (field.type === "autocomplete" && field.options) {
                        return (
                            <Autocomplete
                                disablePortal
                                key={field.name}
                                options={field.options}
                                getOptionLabel={(option) => option.label}
                                onChange={(_, value) =>
                                    handleFieldChange(field.name, value ? value.value : "")
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={field.label}
                                        margin="dense"
                                        fullWidth
                                    />
                                )}
                                value={
                                    field.options.find(
                                        (option) => option.value === formValues[field.name]
                                    ) || null
                                }
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
                        );
                    }

                    return (
                        <TextField
                            key={field.name}
                            autoFocus={fields[0].name === field.name}
                            margin="dense"
                            label={field.label}
                            type={field.type || "text"}
                            fullWidth
                            value={formValues[field.name] ?? ""}
                            onChange={(e) => handleFieldChange(field.name, e.target.value)}
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
                    );
                })}

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

    const setExternalFormValues = (values: Partial<FormValues>) => {
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
