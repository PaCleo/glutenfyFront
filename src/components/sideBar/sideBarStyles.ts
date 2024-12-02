import styled from 'styled-components'

export const DivMain = styled.div`
    width: 200px;
    margin: 0px;
    padding: 32px 16px;
    background-color: #FFFFFF;
    postion: relative;
    z-index: 1;
    isolation: isolate;
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`

export const SideBarDiv = styled.div`
    width: 168px;
    height: 100vh;
    background-color: #FFFFFF;
    pading: 12px 8px;
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`

export const SideBarItem = styled.div<{ selected: boolean }> `
    width: 168px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    color: ${(props) => (props.selected ? "white" : "#414752")};
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
`

export const SideBarText = styled.p<{ selected: boolean }>`
    width: 128px;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    color: ${(props) => (props.selected ? "#FFFFFF" : "#414752")};
    text-align: left;
    margin-left: 8px;
`

export const SideBarContainer = styled.button<{ selected: boolean }> `
    display: flex;
    width: 168px;
    height: 60px;
    padding: 12px 8px;
    border-radius: 12px;
    background: ${(props) => (props.selected ? "linear-gradient(to right, rgba(243, 114, 39) 0%, rgba(255, 165, 0, 0.2) 100%)" : "#ffffff")};
    border: none;
    cursor: pointer;

    &:hover {
    background-color: ${(props) => (props.selected ? "orange" : "rgba(255, 165, 0, 0.2)")};
    }
`

export const GlutenfyLogo = styled.img`
    width: 120px;
    height: 150px;
`

export const Line = styled.div`
    width: 168px;
    height: 2px;
    background-color: #F37227;
    margin-bottom: 12px;
`