import styled from "styled-components";
import { FlexComportamentProps } from "../types";
import theme from "../../themes/default";

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
    background-color: ${props => {
        if (props.$status === 'success') { return props.theme.colors.mediumEmerald || theme.colors.mediumEmerald }
        else if (props.$status === "error") { return props.theme.colors.alert || theme.colors.alert }
        else return props.$bg || ''
    }};
    font-weight: 600;

    & p {
    margin: 0;
}
`;
