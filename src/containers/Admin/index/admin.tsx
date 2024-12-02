import { useState } from "react"
import SideBar from "../../../components/sideBar/sideBar"
import { DivMain } from "./adminStyles"
import Clientes from "../clientes/clientes"
import MinhaEquipe from "../myTeam/myTeam"
import Ingredientes from "../Ingredient/ingredient"
import Categorias from "../categories/categories"


export default function Admin() {
    const [currentPage, setCurrentPage] = useState("Clientes");

    const renderPage = () => {
        switch (currentPage) {
            case "Clientes":
                return <Clientes />;
            case "Minha Equipe":
                return <MinhaEquipe />;
            case "Ingredientes":
                return <Ingredientes />;
            case "Categorias":
                return <Categorias />;
            /*case "SubCategorias":
                return <SubCategorias />;
            case "Planos":
                return <Planos />;
            case "Receitas":
                return <Receitas />;
            case "Chat":
                return <Chat />;*/
            default:
                return <Clientes />;
        }
    }

    return(
        <DivMain>
            <SideBar onPageChange={setCurrentPage} />

            <div>
                {renderPage()}
            </div>
        </DivMain>
    )
}