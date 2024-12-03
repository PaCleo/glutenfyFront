import { useEffect, useState } from "react";
import AdminHeader from "../../../components/adminHeader/adminHeader";
import SearchBar from "../../../components/searchBar/searchBar";
import { DivBody, DivList, Table, TableHeader, TableRow, TableCell, TableActionDiv, TableButton, TableHeaderCell, DivSearch } from "../../../styles/ListStyles";
import { apiClient } from "../../../services/apiClient";
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { SearchBarFilter } from "../../../services/searchBar/searchBar";
import AddButon from "../../../components/addButon/addButon";
import type { SubCategory } from "../../../interfaces/subCategory";
import { AddModalWithImage } from "../../../components/addModalWithImage/addModalWithImage";

import { Categories } from "../../../interfaces/categories";


function SubCategory() {
    const [SubCategory, setSubCategory] = useState<SubCategory[]>([]);
    const [search, setSearch] = useState<string>("");
    const [filteredSubCategory, setFilteredSubCategory] = useState<SubCategory[]>([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
    const [Categories, setCategories] = useState<Categories[]>([]);


    const { openModal, AddItemModal, setFormValues, setImagePreview } = AddModalWithImage<SubCategory>({
        onAdd: async (FormValue) => {
            if (selectedSubCategory) {
                const response = await apiClient.put(`/subCategory/update/${selectedSubCategory.id}`, FormValue);
                if (response.status === 200 || response.status === 201) {
                    setSubCategory((prev) =>
                        prev.map((item) => (item.id === selectedSubCategory.id ? response.data : item))
                    );
                    setFilteredSubCategory((prev) =>
                        prev.map((item) => (item.id === selectedSubCategory.id ? response.data : item))
                    );
                }
            } else {
            const response = await apiClient.post("/subCategory/create", FormValue);
            if (response.status === 200 || response.status === 201) {
                setSubCategory((prev) => [...prev, response.data]);
                setFilteredSubCategory((prev) => [...prev, response.data]);
            }}
            setSelectedSubCategory(null);
        },
        title: selectedSubCategory ? "Editar Sub-Categoria" : "Adicionar Sub-Categoria",
        fields: [
            { name: "name", label: "Titulo", type: "text" },
            {
                name: "ebook",
                label: "Categoria",
                type: "autocomplete",
                options: Categories.map((item) => ({label: item.title, value: item.id})),
            }
        ],
    });


    const addPrefixToBase64 = (base64String: string, type: string) => {
        const mimeType = `image/${type}`;
        return `data:${mimeType};base64,${base64String}`;
      };

    const handleEdit = async (subCategory: SubCategory) => {
        setSelectedSubCategory(subCategory);
        setFormValues({ 
            name: subCategory.name,
            ebook: subCategory.ebook.id
        });
        if (subCategory.picture){
            setImagePreview(addPrefixToBase64(subCategory.picture, 'jpeg'));
        }
        await autoCompleteLabel();
        openModal();
        
    };


    const handleDelete = async (id: string) => {
        try {
            await apiClient.delete(`/subCategory/delete/${id}`);
            setSubCategory((prev) => prev.filter((item) => item.id !== id));
            setFilteredSubCategory((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Erro ao deletar Categorias:", error);
        }
    }

    const handleAddItem = async () => {
        await setSelectedSubCategory(null);
        await setFormValues({ name: "", ebook: "" });
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
        const loadSubCategory = async () => {
            try {
                const Data = await apiClient.get("/subCategory");
                if (Data.status == 200) setSubCategory(Data.data);
            } catch (error) {
                console.error("Erro ao buscar Categorias:", error);
            }
        };

        loadSubCategory();
    }, []);

    useEffect(() => {
        const filtered = SearchBarFilter(SubCategory, search, ["name"]);
        setFilteredSubCategory(filtered);
    }, [search, SubCategory]);


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
                                <TableHeaderCell>Ações</TableHeaderCell>
                            </TableRow>
                        </TableHeader>

                        <tbody>
                            {filteredSubCategory.map((SubCategory) => (
                                <TableRow key={SubCategory.name}>
                                    <TableCell>{SubCategory.name}</TableCell>
                                    <TableCell>{SubCategory.ebook.title}</TableCell>
                                    <TableCell>
                                        <TableActionDiv>
                                            <TableButton> 
                                                <EditOutlinedIcon onClick={() => handleEdit(SubCategory)}   
                                                    sx={{"&:hover": {
                                                        color: "rgba(243, 114, 39)"}}}
                                                /> 
                                            </TableButton>
                                            <TableButton>
                                                <RemoveCircleOutlineOutlinedIcon
                                                    onClick={() => handleDelete(SubCategory.id)}
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

export default SubCategory;