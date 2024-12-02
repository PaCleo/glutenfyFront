import { useState } from "react"
import fithub from "../../assets/fithub.svg"
import { GlutenfyLogo, SideBarContainer, SideBarText, DivMain, SideBarDiv, SideBarItem, Line } from "./sideBarStyles"
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

interface SideBarProps {
    onPageChange: (name: string) => void;
  }

function SideBar({ onPageChange }: SideBarProps) {
    const [selectedItem, setSelectedItem] = useState("Clientes");

    const items = [
        { name: "Clientes", icon: <SentimentSatisfiedAltOutlinedIcon sx={{ fontSize: 24 }} /> },
        { name: "Minha Equipe", icon: <PeopleAltOutlinedIcon sx={{ fontSize: 24 }} /> },
        { name: "Ingredientes", icon: <ShoppingBasketOutlinedIcon sx={{ fontSize: 24 }} /> },
        { name: "Categorias", icon: <CategoryOutlinedIcon sx={{ fontSize: 24 }} /> },
        { name: "SubCategorias", icon: <DashboardCustomizeOutlinedIcon sx={{ fontSize: 24 }} /> },
        { name: "Planos", icon: <StyleOutlinedIcon sx={{ fontSize: 24 }} /> },
        { name: "Receitas", icon: <LunchDiningOutlinedIcon sx={{ fontSize: 24 }} /> },
        { name: "Chat", icon: <ChatOutlinedIcon sx={{ fontSize: 24 }} /> },
    ];


    return (
        <DivMain>
            <SideBarDiv>
                <GlutenfyLogo src={fithub} alt="" />
                {items.map((item) => (
                    <SideBarContainer
                        key={item.name}
                        selected={selectedItem === item.name}
                        onClick={() => {
                            setSelectedItem(item.name)
                            onPageChange(item.name); 
                            }}
                    >
                        <SideBarItem selected={selectedItem === item.name}>
                            <div>{item.icon}</div>
                            <div>
                                <SideBarText selected={selectedItem === item.name}>{item.name}</SideBarText>
                            </div>
                        </SideBarItem>
                    </SideBarContainer>
                ))}
                <Line />
                <SideBarContainer
                    selected={selectedItem === "Sair"}
                    onClick={() => setSelectedItem("Sair")}
                >
                    <SideBarItem selected={selectedItem === "Sair"}>
                        <div><LogoutOutlinedIcon sx={{ fontSize: 24 }} /></div>
                        <div>
                            <SideBarText selected={selectedItem === "Sair"}>Sair</SideBarText>
                        </div>
                    </SideBarItem>
                </SideBarContainer>
            </SideBarDiv>
        </DivMain>
    )
}

export default SideBar

