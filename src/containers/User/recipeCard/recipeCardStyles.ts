import styled from "styled-components";

export const RecipeContainer = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Montserrat, sans-serif;
    background-color:rgb(231, 231, 231);
`;

export const RecipeTitle = styled.h1`
    text-align: center;
    font-size: 2.5em;
    margin-bottom: 20px;
    color: #22262F;
`;

export const RecipeHeader = styled.div`
    display: flex;
    margin-bottom: 30px;
`;

export const RecipeImage = styled.img`
    max-width: 50%;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
`;

export const RecipeInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 1.1em;
    background-color: #f9f9f9;
    padding-top: 20px;
    padding-left: 20px;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;

    p {
        margin: 0;
        color: #22262F;
    }
`;

export const RecipeDescription = styled.section`
    margin-bottom: 30px;

    h2 {
        font-size: 1.5em;
        margin-bottom: 10px;
        color: #22262F;
    }

    .highlight {
        flex-shrink: 0;
        width: 40px;
        height: 4px;
        background-color: #F37227;
        border-radius: 2px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    p {
        font-size: 1em;
        line-height: 1.6;
    }
`;

export const RecipeIngredients = styled.section`
    margin-bottom: 30px;
    background-color:#ffffff;
    padding: 20px;
    border-radius: 10px;

    h2 {
        font-size: 1.5em;
        margin-bottom: 10px;
        color: #22262F;
    }

    ul {
        list-style: disc inside;
        padding: 10px;
        background: #f9f9f9;
        border-radius: 10px;
        border: 1px solid #ddd;
    }

    li {
        margin: 5px 0;
    }
`;

export const RecipeSteps = styled.section`
    margin-bottom: 30px;

    .highlight {
        flex-shrink: 0;
        width: 40px;
        height: 4px;
        background-color: #F37227;
        border-radius: 2px;
        margin-top: 20px;
        margin-bottom: 20px;
    }


    h2 {
        font-size: 1.5em;
        margin-bottom: 10px;
        color: #22262F;
    }
`;

export const StepsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const StepCard = styled.div`
    display: flex;
    align-items: flex-start;
    background: #fff;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StepNumber = styled.span`
    background-color: #ff6f00;
    width: 30px;
    color: #fff;
    font-weight: bold;
    font-size: 1.2em;
    display: inline-block;
    padding: 10px;
    margin-right: 15px;
    border-radius: 10px;
`;

export const StepDescription = styled.p`
    text-align: left;
    flex: 1;
    font-size: 1em;
    color: #22262F;
`;