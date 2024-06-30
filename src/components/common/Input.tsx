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
        if (props.$invalid) { return '1px solid ' + theme.colors.alert }
        return ".2px solid rgba(255, 255, 255, .2)"
    }};
    padding: ${props => {
        if (props.$size === "small") { return "4px 8px" }
        else if (props.$size === "medium") { return "8px 16px" }
        else if (props.$size === "large") { return "12px 24px" }
        else return "8px 16px"
    }};
    border-radius: ${props => {
        if (props.$size === "small") { return "4px" }
        else if (props.$size === "medium") { return "8px" }
        else if (props.$size === "large") { return "12px" }
        else return "8px"
    }};
    font-weight: normal;
    color: #fff;
    font-size: 1rem;
    accent-color: ${props => {
        if (props.$invalid) { return theme.colors.alert };
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