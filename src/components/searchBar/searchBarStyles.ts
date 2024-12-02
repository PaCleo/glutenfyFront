import styled from "styled-components";

export const SearchContainer = styled.div `
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    background-color: #ffffff;
    border-radius: 30px;
    padding: 5px 10px;
    border: 1px solid rgba(243, 114, 39);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const SearchInput = styled.input`
    border: none;
    outline: none;
    background-color: transparent;
    flex-grow: 1;
    padding: 5px 10px;
    font-size: 16px;
`;

export const SearchButton = styled.button`
    width: 40px;
    height: 40px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #333;
    padding: 0 10px;
    margin: 0px
`;