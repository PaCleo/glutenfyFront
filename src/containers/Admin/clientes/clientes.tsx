import { useEffect, useState } from "react";
import AdminHeader from "../../../components/adminHeader/adminHeader";
import SearchBar from "../../../components/searchBar/searchBar";
import { DivBody, DivList, Table, TableHeader, TableRow, TableCell, TableActionDiv, TableButton, TableHeaderCell } from "../../../styles/ListStyles";
import { apiClient } from "../../../services/apiClient";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { SearchBarFilter } from "../../../services/searchBar/searchBar";
import { Cliente } from "../../../interfaces/cliente";


function Clientes() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [search, setSearch] = useState<string>("");
    const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);

    useEffect(() => {
        const loadClientes = async () => {
            try {
                const clientesData = await apiClient.get("/user");
                if (clientesData.status == 200) setClientes(clientesData.data);
            } catch (error) {
                console.error("Erro ao buscar clientes:", error);
            }
        };

        loadClientes();
    }, []);

    useEffect(() => {
        const filtered = SearchBarFilter(clientes, search, ["name", "email"]);
        setFilteredClientes(filtered);
    }, [search, clientes]);


    return (
        <div>
            <AdminHeader titulo="Clientes" />
            <DivBody>
                <SearchBar 
                    value={search}
                    onSearchChange={(value) => setSearch(value)}
                />

                <DivList>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell>Nome</TableHeaderCell>
                                <TableHeaderCell>Email</TableHeaderCell>
                                <TableHeaderCell>Ações</TableHeaderCell>
                            </TableRow>
                        </TableHeader>

                        <tbody>
                            {filteredClientes.map((cliente) => (
                                <TableRow key={cliente.name}>
                                    <TableCell>{cliente.name}</TableCell>
                                    <TableCell>{cliente.email}</TableCell>
                                    <TableCell>
                                        <TableActionDiv>
                                            <TableButton> 
                                                <EditOutlinedIcon 
                                                    sx={{"&:hover": {
                                                        color: "rgba(243, 114, 39)"}}}
                                                /> 
                                            </TableButton>
                                            <TableButton>
                                                <EmailOutlinedIcon
                                                    sx={{"&:hover": {
                                                        color: "rgba(243, 114, 39)"}}}
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
        </div>
    )
}

export default Clientes;