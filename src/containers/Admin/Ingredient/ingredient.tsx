import { useEffect, useState } from "react";
import AdminHeader from "../../../components/adminHeader/adminHeader";
import SearchBar from "../../../components/searchBar/searchBar";
import { DivBody, DivList, Table, TableHeader, TableRow, TableCell, TableActionDiv, TableButton, TableHeaderCell, DivSearch } from "../../../styles/ListStyles";
import { apiClient } from "../../../services/apiClient";
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { SearchBarFilter } from "../../../services/searchBar/searchBar";
import AddButon from "../../../components/addButon/addButon";
import { AddModal } from "../../../components/addModal/addModal";
import type { Ingredient } from "../../../interfaces/ingredient";

function Ingredient() {
    const [Ingredient, setIngredient] = useState<Ingredient[]>([]);
    const [search, setSearch] = useState<string>("");
    const [filteredIngredient, setFilteredIngredient] = useState<Ingredient[]>([]);
    const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);


    const { openModal, AddItemModal, setFormValues } = AddModal<Ingredient>({
        onAdd: async (FormValue) => {
            if (selectedIngredient) {
                const response = await apiClient.put(`/ingredient/update/${selectedIngredient.id}`, FormValue);
                if (response.status === 200 || response.status === 201) {
                    setIngredient((prev) =>
                        prev.map((item) => (item.id === selectedIngredient.id ? response.data : item))
                    );
                    setFilteredIngredient((prev) =>
                        prev.map((item) => (item.id === selectedIngredient.id ? response.data : item))
                    );
                }
            } else {
            const response = await apiClient.post("/ingredient/create", FormValue);
            if (response.status === 200 || response.status === 201) {
                setIngredient((prev) => [...prev, response.data]);
                setFilteredIngredient((prev) => [...prev, response.data]);
            }}
            setSelectedIngredient(null);
        },
        title: selectedIngredient ? "Editar ingrediente" : "Adicionar ingrediente",
        fields: [
            { name: "name", label: "Nome", type: "text" },
        ]
    });

    const handleAddItem = async () => {
        await setSelectedIngredient(null);
        openModal();
    };

    const handleEdit = (ingredient: Ingredient) => {
        setSelectedIngredient(ingredient);
        setFormValues({ name: ingredient.name });
        openModal();
    };


    const handleDelete = async (id: string) => {
        try {
            await apiClient.delete(`/ingredient/delete/${id}`);
            setIngredient((prev) => prev.filter((item) => item.id !== id));
            setFilteredIngredient((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Erro ao deletar ingrediente:", error);
        }
    }
    

    useEffect(() => {
        const loadIngredient = async () => {
            try {
                const Data = await apiClient.get("/ingredient");
                if (Data.status == 200) setIngredient(Data.data);
            } catch (error) {
                console.error("Erro ao buscar ingredientes:", error);
            }
        };

        loadIngredient();
    }, []);

    useEffect(() => {
        const filtered = SearchBarFilter(Ingredient, search, ["name"]);
        setFilteredIngredient(filtered);
    }, [search, Ingredient]);


    return (
        <div>
            <AdminHeader titulo="Ingredientes" />
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
                                <TableHeaderCell>Ações</TableHeaderCell>
                            </TableRow>
                        </TableHeader>

                        <tbody>
                            {filteredIngredient.map((Ingredient) => (
                                <TableRow key={Ingredient.name}>
                                    <TableCell>{Ingredient.name}</TableCell>
                                    <TableCell>
                                        <TableActionDiv>
                                            <TableButton> 
                                                <EditOutlinedIcon onClick={() => handleEdit(Ingredient)}   
                                                    sx={{"&:hover": {
                                                        color: "rgba(243, 114, 39)"}}}
                                                /> 
                                            </TableButton>
                                            <TableButton>
                                                <RemoveCircleOutlineOutlinedIcon
                                                    onClick={() => handleDelete(Ingredient.id)}
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

export default Ingredient;