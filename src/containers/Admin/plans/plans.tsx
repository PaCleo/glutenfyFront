import { useEffect, useState } from "react";
import AdminHeader from "../../../components/adminHeader/adminHeader";
import SearchBar from "../../../components/searchBar/searchBar";
import { DivBody, DivList, Table, TableHeader, TableRow, TableCell, TableActionDiv, TableButton, TableHeaderCell, DivSearch } from "../../../styles/ListStyles";
import { apiClient } from "../../../services/apiClient";
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { SearchBarFilter } from "../../../services/searchBar/searchBar";
import AddButon from "../../../components/addButon/addButon";
import type { Plans } from "../../../interfaces/plans";
import { AddModal } from "../../../components/addModal/addModal";
import { Categories } from "../../../interfaces/categories";


function Plans() {
    const [Plans, setPlans] = useState<Plans[]>([]);
    const [search, setSearch] = useState<string>("");
    const [filteredPlans, setFilteredPlans] = useState<Plans[]>([]);
    const [selectedPlans, setSelectedPlans] = useState<Plans | null>(null);
    const [Categories, setCategories] = useState<Categories[]>([]);


    const { openModal, AddItemModal, setFormValues } = AddModal<Plans>({
        onAdd: async (FormValue) => {
            if (selectedPlans) {
                const response = await apiClient.put(`/plan/update/${selectedPlans.id}`, FormValue);
                if (response.status === 200 || response.status === 201) {
                    setPlans((prev) =>
                        prev.map((item) => (item.id === selectedPlans.id ? response.data : item))
                    );
                    setFilteredPlans((prev) =>
                        prev.map((item) => (item.id === selectedPlans.id ? response.data : item))
                    );
                }
            } else {
            const response = await apiClient.post("/plan/create", FormValue);
            if (response.status === 200 || response.status === 201) {
                setPlans((prev) => [...prev, response.data]);
                setFilteredPlans((prev) => [...prev, response.data]);
            }}
            setSelectedPlans(null);
        },
        title: selectedPlans ? "Editar Planos" : "Adicionar Planos",
        fields: [
            { name: "name", label: "Nome", type: "text" },
            { name: "ticto_id", label: "Ticto ID", type: "text" },
            {
                name: "ebookPlans",
                label: "Categoria",
                type: "autocomplete",
                options: Categories.map((item) => ({label: item.title, value: item.id})),
            }
        ],
    });
    const handleEdit = async (Plans: Plans) => {
        await autoCompleteLabel();
        setSelectedPlans(Plans);

        await setFormValues({ 
            name: Plans.name,
            ticto_id: Plans.ticto_id,
            ebookPlans: Plans.ebookPlans.map((item) => item.id)
        });
        openModal();
    };


    const handleDelete = async (id: string) => {
        try {
            await apiClient.delete(`/plan/delete/${id}`);
            setPlans((prev) => prev.filter((item) => item.id !== id));
            setFilteredPlans((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Erro ao deletar Categorias:", error);
        }
    }

    const handleAddItem = async () => {
        await setSelectedPlans(null);
        await setFormValues({ name: "", ticto_id: "", ebookPlans: [] });
        await autoCompleteLabel();
        openModal();
    };

    const autoCompleteLabel = async () => {
        try {
            const Data = await apiClient.get("/ebook");
            if (Data.status == 200) setCategories(Data.data);
        } catch (error) {
            console.error("Erro ao buscar Categorias:", error);
        }
    };

    useEffect(() => {
        const loadPlans = async () => {
            try {
                const Data = await apiClient.get("/plan");
                if (Data.status == 200) setPlans(Data.data);
            } catch (error) {
                console.error("Erro ao buscar Categorias:", error);
            }
        };

        loadPlans();
    }, []);

    useEffect(() => {
        const filtered = SearchBarFilter(Plans, search, ["name"]);
        setFilteredPlans(filtered);
    }, [search, Plans]);


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
                                <TableHeaderCell>Ações</TableHeaderCell>
                            </TableRow>
                        </TableHeader>

                        <tbody>
                            {filteredPlans.map((Plans) => (
                                <TableRow key={Plans.name}>
                                    <TableCell>{Plans.name}</TableCell>
                                    <TableCell>
                                        <TableActionDiv>
                                            <TableButton> 
                                                <EditOutlinedIcon onClick={() => handleEdit(Plans)}   
                                                    sx={{"&:hover": {
                                                        color: "rgba(243, 114, 39)"}}}
                                                /> 
                                            </TableButton>
                                            <TableButton>
                                                <RemoveCircleOutlineOutlinedIcon
                                                    onClick={() => handleDelete(Plans.id)}
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

export default Plans;