import styled from "styled-components";

export const DivMain = styled.div `
    width: 100%;
    height: 100vh;
    padding: 40px 20px;
    background-color: #f9f9f9;
`

export const DivRecipe = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
    width: 100%;
`;

export const RecipeCard = styled.div`
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    background-color: #fff;
    transition: transform 0.2s;

    &:hover {
        cursor: pointer;
        transform: translateY(-5px);
        transform: scale(1.05);
        background-color: rgba(255, 165, 0, 0.8);
    }
`;

export const RecipeImage = styled.img`
    width: 100%;
    height: 60px;
    object-fit: cover;
`;

export const RecipeInfo = styled.div`
    padding: 12px;
    text-align: center;
    h2 {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.8rem;
        margin: 0 0 8px 0;
        color: #333;
    }

    p {
        font-size: 0.9rem;
        color: #666;
    }
`;

