import styled from "styled-components";
import { FlexComportamentProps } from "../types";

interface WrapperProps extends FlexComportamentProps {
    $maxWidth?: string;
    $columns?: string;
    $padding?: string;
}

export const Wrapper = styled.div<WrapperProps>`
    display: flex;
    flex-direction: ${props => props.$dir || "row"};
    justify-content: ${props => props.$justify || "center"};
    align-items: ${props => props.$align || "center"};
    flex-wrap: ${props => props.$wrap || "nowrap"};
    margin: 0 auto;
    padding: ${props => props.$padding || "2rem"};
    max-width: ${props => props.$maxWidth || "100%"};
    gap: ${props => props.$gap || "1rem"};
`;

export const GridWrapper = styled(Wrapper)`
    display: grid;
    gap: 1rem;
    width: 100%;
    max-width: 100%;

    && {
        grid-template-columns: ${props => props.$columns || "1fr"};

        & td {
            width: 100%;
            overflow: hidden;

            &:nth-child(2){
                overflow: scroll;
                scrollbar-color: ${props => props.theme.colors.mediumEmerald} ${props => props.theme.colors.bgBolder || "#111827"};
                scrollbar-width: thin;
            }
        }
    }
`;
