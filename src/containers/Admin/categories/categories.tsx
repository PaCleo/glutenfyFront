import { useEffect, useState } from "react";
import AdminHeader from "../../../components/adminHeader/adminHeader";
import SearchBar from "../../../components/searchBar/searchBar";
import { DivBody, DivList, Table, TableHeader, TableRow, TableCell, TableActionDiv, TableButton, TableHeaderCell, DivSearch } from "../../../styles/ListStyles";
import { apiClient } from "../../../services/apiClient";
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { SearchBarFilter } from "../../../services/searchBar/searchBar";
import AddButon from "../../../components/addButon/addButon";
import type { Categories } from "../../../interfaces/categories";
import { AddModalWithImage } from "../../../components/addModalWithImage/addModalWithImage";

function Categories() {
    const [Categories, setCategories] = useState<Categories[]>([]);
    const [search, setSearch] = useState<string>("");
    const [filteredCategories, setFilteredCategories] = useState<Categories[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Categories | null>(null);


    const { openModal, AddItemModal, setFormValues, setImagePreview } = AddModalWithImage<Categories>({
        onAdd: async (FormValue) => {
            if (selectedCategories) {
                const response = await apiClient.put(`/ebook/update/${selectedCategories.id}`, FormValue);
                if (response.status === 200 || response.status === 201) {
                    setCategories((prev) =>
                        prev.map((item) => (item.id === selectedCategories.id ? response.data : item))
                    );
                    setFilteredCategories((prev) =>
                        prev.map((item) => (item.id === selectedCategories.id ? response.data : item))
                    );
                }
            } else {
            const response = await apiClient.post("/ebook/create", FormValue);
            if (response.status === 200 || response.status === 201) {
                setCategories((prev) => [...prev, response.data]);
                setFilteredCategories((prev) => [...prev, response.data]);
            }}
        },
        title: selectedCategories ? "Editar Categoria" : "Adicionar Categoria",
        fields: [
            { name: "title", label: "Titulo", type: "text" },
        ]
    });

    const addPrefixToBase64 = (base64String: string, type: string) => {
        const mimeType = `image/${type}`;
        return `data:${mimeType};base64,${base64String}`;
      };

    const handleEdit = (categories: Categories) => {
        setSelectedCategories(categories);
        setFormValues({ title: categories.title });
        if (categories.picture){
            setImagePreview(addPrefixToBase64(categories.picture, 'jpeg'));
        }
        openModal();
    };


    const handleDelete = async (id: string) => {
        try {
            await apiClient.delete(`/ebook/delete/${id}`);
            setCategories((prev) => prev.filter((item) => item.id !== id));
            setFilteredCategories((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Erro ao deletar Categorias:", error);
        }
    }
    

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const Data = await apiClient.get("/ebook");
                if (Data.status == 200) setCategories(Data.data);
            } catch (error) {
                console.error("Erro ao buscar Categorias:", error);
            }
        };

        loadCategories();
    }, []);

    useEffect(() => {
        const filtered = SearchBarFilter(Categories, search, ["title"]);
        setFilteredCategories(filtered);
    }, [search, Categories]);


    return (
        <div>
            <AdminHeader titulo="Categorias" />
            <DivBody>
                <DivSearch>
                    <SearchBar 
                        value={search}
                        onSearchChange={(value) => setSearch(value)}
                    />
                    <AddButon onClick={openModal} />
                </DivSearch>

                <DivList>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell>Titulo</TableHeaderCell>
                                <TableHeaderCell>Ações</TableHeaderCell>
                            </TableRow>
                        </TableHeader>

                        <tbody>
                            {filteredCategories.map((Categories) => (
                                <TableRow key={Categories.title}>
                                    <TableCell>{Categories.title}</TableCell>
                                    <TableCell>
                                        <TableActionDiv>
                                            <TableButton> 
                                                <EditOutlinedIcon onClick={() => handleEdit(Categories)}   
                                                    sx={{"&:hover": {
                                                        color: "rgba(243, 114, 39)"}}}
                                                /> 
                                            </TableButton>
                                            <TableButton>
                                                <RemoveCircleOutlineOutlinedIcon
                                                    onClick={() => handleDelete(Categories.id)}
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

export default Categories;