import { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import { TitleDiv } from "./addModalStyles";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

interface FieldConfig {
    name: string;
    label: string;
    type?: "text" | "number" | "password";
    defaultValue?: string | number;
}

interface AddItemServiceProps<T> {
    onAdd: (item: T) => Promise<void>;
    title: string;
    fields: FieldConfig[];
}

type FormValues = Record<string, string | number | undefined>;

export function AddModal<T>({ onAdd, title, fields }: AddItemServiceProps<T>) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValues, setFormValues] = useState<FormValues>(() =>
        fields.reduce((acc, field) => {
            acc[field.name] = field.defaultValue || "";
            return acc;
        }, {} as FormValues)
    );

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
    
        const resetFormValues = fields.reduce((acc, field) => {
            acc[field.name] = field.defaultValue !== undefined ? field.defaultValue : "";
            return acc;
        }, {} as FormValues);
    
        setFormValues(resetFormValues);
    };

    const handleFieldChange = (fieldName: string, value: string | number) => {
        setFormValues((prev) => ({ ...prev, [fieldName]: value }));
    };

    const handleAddItem = async () => {
        try {
            await onAdd(formValues as T); // Passa o objeto inteiro
        } catch (error) {
            console.error("Erro ao adicionar item:", error);
        } finally {
            closeModal();
        }
    };

    const AddItemModal = (
        <Dialog open={isModalOpen} onClose={closeModal}
        sx={{
            "& .MuiDialog-paper": {
                borderRadius: "32px",
                width: "500px",
            },
        }}
        >   
            <TitleDiv>
                <DialogTitle sx={{
                    display: "flex",
                    justifyContent: "left",
                    textAlign: "left",
                    fontWeight: "bold",
                    width: "88%",
                }}>
                    {title}
                </DialogTitle>
                <CancelOutlinedIcon onClick={closeModal} sx={{ cursor: "pointer", "&:hover": { color: "rgba(255, 0, 0)" } }} />
            </TitleDiv>

            <DialogContent>
            {fields.map((field) => (
                    <TextField
                        key={field.name}
                        autoFocus={fields[0].name === field.name}
                        margin="dense"
                        label={field.label}
                        type={field.type || "text"}
                        fullWidth
                        value={formValues[field.name]}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "rgba(255, 165, 0, 0.8)",
                                    borderRadius: "16px",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#F37227",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#7FFFD4",
                                },
                            },
                        }}
                    />
                ))}
            </DialogContent>
            <DialogActions
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Button onClick={handleAddItem} sx={{
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
                }}>
                    Cadastrar
                </Button>
            </DialogActions>
        </Dialog>
    );

    const setExternalFormValues = (values: Partial<FormValues>) => {
        setFormValues((prev) => ({ ...prev, ...values }));
    };

    return { openModal, closeModal, AddItemModal, setFormValues: setExternalFormValues };
}
