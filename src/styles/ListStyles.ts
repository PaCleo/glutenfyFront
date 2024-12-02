import styled from "styled-components";

export const DivBody = styled.div `
    width: 100%;
    height: 100vh;
    padding: 50px 30px;
`

export const DivSearch = styled.div `
    display: flex;
    width: 100%;
`

export const DivList = styled.div `
    width: 100%;
    height: 100vh;
    padding: 50px 30px;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  text-align: left;
  border: none;
`;

export const TableHeader = styled.thead`
`;

export const TableRow = styled.tr`
    display: flex;
    margin-bottom: 20px;
`;

export const TableCell = styled.td`
    display: flex;
    padding: 10px 60px;
    background-color: #ffffff;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
    color: #22262F;
    align-items: center;

    &:first-child {
      border-radius: 16px 0 0 16px;
    }    

    &:last-child {
      border-radius: 0 16px 16px 0;
    }
`;

export const TableHeaderCell = styled.th`
  display: flex;
  padding: 20px 60px;
  font-size: 18px;
  font-weight: semibold;
  font-family: 'Montserrat', sans-serif;
  color: #414752;

    &:last-child {
        justify-content: right;
    }
`;

export const TableActionDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
`;

export const TableButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;