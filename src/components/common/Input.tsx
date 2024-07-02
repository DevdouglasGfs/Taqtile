import styled from "styled-components";
import theme from "../../themes/default";

interface InputProps {
    $invalid?: boolean;
    $size?: "small" | "medium" | "large";
    $fill?: boolean;
}

export const Input = styled.input<InputProps>`
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
        // else statement required because $invalid is not defined/applicable to input[type="radio"] and anothers inputs.
        else return 'rgba(255, 255, 255, .2)';
    }};
    width: ${(props) => props.$fill ? '100%' : 'auto'};

    &::placeholder {
        color: rgba(255, 255, 255, .5);
    }

    &:focus {
        outline: none;
        border: .2px solid rgba(255, 255, 255, .5);
    }
`;