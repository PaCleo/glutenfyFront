import { Button } from "@mui/material"
import { AddButonDiv } from "./addButonStyles"

interface AddButtonProps {
    onClick: () => void
}

function AddButon({onClick}: AddButtonProps) {
    return (
        <AddButonDiv>
            <Button 
                onClick={onClick}
                sx={{ color: "#FFFFFF", fontSize: "16px" }}
                >
                Adicionar
            </Button>
        </AddButonDiv>
    )
}

export default AddButon