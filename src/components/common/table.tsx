import styled from "styled-components";


export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border-radius: 0.5rem;
    overflow: hidden;
    background: ${props => props.theme.colors.bgBold};
    color: #fff;

    & > thead {
        background: ${props => props.theme.colors.link};
        width: 100%;

        & tr {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            text-align: center;
            min-width: 100%;
            max-width: 100%;
        }

        & th, td {
            padding: 1rem
        };       
    }

    & > tbody {
        display: flex;
        flex-direction: column;
        height: 12rem;
        max-height: 12rem;
        background: ${props => props.theme.colors.bgBolder};
        width: 100%;
        overflow-y: scroll;
        scrollbar-color: ${props => props.theme.colors.mediumEmerald} ${props => props.theme.colors.bgBolder || "#111827"};

        & tr {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            text-align: left;
            min-width: 100%;
            max-width: 100%;
            background: ${props => props.theme.colors.bgBolder};
            transition: background-color 0.1s ease-in;
            color: ${props => props.theme.colors.softEmerald};

            & td {
                padding: .5rem;
            }
            &:hover{
                background: ${props => props.theme.colors.link};
                color: #fff;
                cursor: pointer;
            }
        }
    }
`;
