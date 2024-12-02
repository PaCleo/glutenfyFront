import styled from "styled-components";

export const TitleDiv = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
`

export const InputImage = styled.input`
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: 2px solid #ccc;
    cursor: pointer;
    transition: all 0.3s ease;
`;

export const InputDiv = styled.div `
    padding: 10px 20px;
    background-color: #3a403e;
    color: white;
    border-radius: 10px;
    text-align: center;    
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover {
        border-color: #19c289;
        background-color: #7FFFD4;
    }
`

    