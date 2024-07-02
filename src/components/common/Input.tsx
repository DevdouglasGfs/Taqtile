import styled from "styled-components";
import theme from "../../themes/default";

interface InputProps {
    $invalid?: boolean;
    $size?: "small" | "medium" | "large"
}

export const Input = styled.input<InputProps>`
    appearance: none;
    background: transparent;
    border: ${props => {
        if (props.$invalid && props.theme.colors.alert) { return '1px solid ' + (props.theme.colors.alert || theme.colors.alert) }
        return ".2px solid rgba(255, 255, 255, .2)"
    }};
    padding: ${props => {
        if (props.$size === "small") { return "4px 8px" }
        if (props.$size === "medium") { return "8px 16px" }
        if (props.$size === "large") { return "12px 24px" }
        return "8px 16px"
    }};
    border-radius: ${props => {
        if (props.$size === "small") { return "4px" }
        if (props.$size === "medium") { return "8px" }
        if (props.$size === "large") { return "12px" }
        return "8px"
    }};
    font-weight: normal;
    color: #fff;
    font-size: 1rem;
    accent-color: ${props => {
        if (props.$invalid) { return props.theme.colors.alert || theme.colors.alert }
        return 'rgba(255, 255, 255, .2)'
    }};

    &::placeholder {
        color: rgba(255, 255, 255, .5);
    }

    &:focus {
        outline: none;
        border: 1px solid rgba(255, 255, 255, .5);
    }
`;