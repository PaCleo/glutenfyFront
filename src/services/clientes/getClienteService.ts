import { apiClient } from "../apiClient";

export async function fetchClientes() {
    try {
        const response = await apiClient.get("/clientes", {
        });
        if ( response.status == 200 ) {
            return response.data
        }
        return response.data
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        throw error;
    }
}
