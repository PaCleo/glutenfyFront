import styled from "styled-components";

export const TitleDiv = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
`

export const InputImage = styled.input`
    width: 100%;
    height: 40px;
    margin: 10px;
    border-radius: 10px;
    border: 2px solid #ccc;
    background-color: #f9f9f9;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        border-color: #19c289;
        background-color: #7FFFD4;
    }
`;

    