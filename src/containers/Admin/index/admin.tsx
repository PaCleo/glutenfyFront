import { useState } from "react"
import SideBar from "../../../components/sideBar/sideBar"
import { DivMain } from "./adminStyles"
import Clientes from "../clientes/clientes"
import MinhaEquipe from "../myTeam/myTeam"
import Ingredientes from "../Ingredient/ingredient"
import Categorias from "../categories/categories"
import SubCategory from "../subCategory/subCategory"
import Planos from "../plans/plans"
import Recepi from "../Recipes/recipe"


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
            case "SubCategorias":
                return <SubCategory />;
            case "Planos":
                return <Planos />;
            case "Receitas":
                return <Recepi />;
            /*case "Chat":
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