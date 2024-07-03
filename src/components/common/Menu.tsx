import styled from "styled-components";
import { FlexComportamentProps } from "../types";
import theme from "../../themes/default";

interface MenuProps extends FlexComportamentProps {
    $display?: "inline-block" | "flex";
}

export const Menu = styled.div<MenuProps>`
    display: ${props => props.$display || "flex"};
    flex-direction: ${props => props.$dir || "column"};
    justify-content: ${props => props.$justify || "center"} ;
    align-items: ${props => props.$align || "center"};
    gap: ${props => props.$gap || "1rem"};

    & > h1, h2, h3, h4, h5, h6 {
        color: ${props => props.theme.colors.softEmerald || theme.colors.softEmerald};
        font-size: 1rem;
        margin: 0;
    }
`;