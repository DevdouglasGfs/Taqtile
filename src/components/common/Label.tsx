import styled from "styled-components";
import { FlexComportamentProps } from "../types";

interface LabelProps extends FlexComportamentProps {
    $hasIcon?: boolean;
}

export const Label = styled.label<LabelProps>`
    display: flex;
    flex-direction: ${props => props.$dir || "column"};
    justify-content: ${props => props.$justify || "start"};
    align-items: ${props => props.$align || "start"};
    font-weight: 600;
    gap: 4px;
    width: 100%;

    & p {
        font-size: .8rem;
        color: rgb(222, 100, 100);
        margin: 0;
    }
    & span {
        font-weight: 400;
    }
`;