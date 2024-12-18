import { useEffect, useState } from "react";
import AdminHeader from "../../../components/adminHeader/adminHeader";
import SearchBar from "../../../components/searchBar/searchBar";
import { DivBody, DivList, Table, TableHeader, TableRow, TableCell, TableActionDiv, TableButton, TableHeaderCell } from "../../../styles/ListStyles";
import { apiClient } from "../../../services/apiClient";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { SearchBarFilter } from "../../../services/searchBar/searchBar";
import { Cliente } from "../../../interfaces/cliente";
import { AddModal } from "../../../components/addModal/addModal";
import { Plans } from "../../../interfaces/plans";


function Clientes() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [search, setSearch] = useState<string>("");
    const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
    const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
    const [plans, setPlans] = useState<Plans[]>([]);
    const [isEditingCliente, setIsEditingCliente] = useState(false);
    
    

    const { openModal, AddItemModal, setFormValues } = AddModal<Cliente>({
        onAdd: async (formValues) => {
            if (isEditingCliente) {
                await apiClient.put(`/user/update/${selectedCliente?.id}`, formValues);
            } else {
                const PlanId = formValues.userPlans[0];
                console.log(formValues)
                const dataTosend = {
                    user: formValues.id,
                    plan: PlanId
                }
                await apiClient.post(`/userPlan/create`, dataTosend);
            }
        },
        title: isEditingCliente ? "Editar Cliente" : "Adicionar Planos",
        fields: isEditingCliente
            ? [
                  { name: "name", label: "Nome", type: "text" },
                  { name: "email", label: "Email", type: "text" },
              ]
            : [
                  {
                      name: "userPlans",
                      label: "User Plans",
                      type: "autocomplete",
                      options: plans.map((plan) => ({ label: plan.name, value: plan.id })),
                  },
              ],
    });

        const handleEditUser = (cliente: Cliente) => {
            setIsEditingCliente(true); // Para editar cliente
            setSelectedCliente(cliente);
            setFormValues({ name: cliente.name, email: cliente.email });
            openModal();
        };

        const handleEditUserPlans = (cliente: Cliente) => {
            setIsEditingCliente(false); // Para adicionar planos
            setSelectedCliente(cliente);

            
            setFormValues({ 
                id: cliente.id,
                });
            openModal();
        };

    useEffect(() => {
        const loadClientes = async () => {
            try {
                const clientesData = await apiClient.get("/user");
                if (clientesData.status == 200) setClientes(clientesData.data);
                const plansData = await apiClient.get("/plan");
                if (plansData.status == 200) setPlans(plansData.data);
            } catch (error) {
                console.error("Erro ao buscar clientes:", error);
            }
        };

        loadClientes();
    }, []);

    useEffect(() => {
        const filtered = SearchBarFilter(clientes, search, ["name", "email", "userPlans"]);
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
                                                <EditOutlinedIcon onClick={() => handleEditUser(cliente)}
                                                    sx={{"&:hover": {
                                                        color: "rgba(243, 114, 39)"}}}
                                                /> 
                                            </TableButton>
                                            <TableButton>
                                                <AutoStoriesIcon
                                                    onClick={() => handleEditUserPlans(cliente)}
                                                    sx={{
                                                        "&:hover": { color: "rgba(39, 114, 243)" },
                                                    }}
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
            {AddItemModal}
        </div>
    )
}

export default Clientes;