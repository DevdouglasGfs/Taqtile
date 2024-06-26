import styled from "styled-components";
import { FlexComportamentProps } from "../types";

interface StatusBlockProps extends FlexComportamentProps {
    $status: "success" | "error" | "info";
    $gap?: string;
    $rounded?: boolean;
    $bg?: string
}

export const StatusBlock = styled.div<StatusBlockProps>`
    display: flex;
    align-items: ${props => props.$align || 'center'};
    justify-content: ${props => props.$justify || 'center'};
    flex-direction: ${props => props.$dir || 'column'};
    gap: ${props => props.$gap || '1rem'};
    padding: 1rem;
    border-radius: ${props => props.$rounded ? '8px' : '0'};
    color: #fff;
    background-color: ${props => props.$status === 'success' ? props.theme.colors.mediumEsmerald : props.$status === "error" ? props.theme.colors.alert : (props.$bg || '')};
    font-weight: 600;

    & p {
        margin: 0;
    }
`;
