import styled from "styled-components";
import theme from "../../themes/default";

interface CtaProps {
    $primary?: boolean;
    $size?: "small" | "medium" | "large";
    $fill?: "full" | "half";
    $gap?: string;
}

export const Cta = styled.button<CtaProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => {
        if (props.$primary) { return props.theme.colors.link || theme.colors.link }
        return "#fff";
    }};
    border: none;
    color: ${props => {
        if (props.$primary) { return "#fff" }
        return props.theme?.colors.link;
    }};
    padding: ${props => {
        if (props.$size === "small") { return "0.5rem 1rem" }
        if (props.$size === "medium") { return "0.75rem 1.5rem" }
        return "1rem 2rem"
    }};
    text-align: center;
    gap: ${props => {
        if (props.$gap) { return props.$gap }
        return "0.5rem"
    }};
    text-decoration: none;
    font-size: 1rem;
    width: ${props => {
        if (props.$fill === "half") { return "50%" }
        return "100%"
    }};
    min-width: fit-content;
    border-radius: ${props => {
        if (props.$size === "small") { return "4px" }
        if (props.$size === "medium") { return "8px" }
        return ".5rem"
    }};
    font-weight: 600;
    cursor: pointer;
    transition: scale 0.1s ease-in-out;

    &[disabled] {
        background: transparent;
        border: ${props => {
            if (props.$primary) { return `1px solid ${props.theme.colors.link || theme.colors.link}` }
            return `1px solid ${theme.colors.link}`
        }};
        color: ${props => {
            if (props.$primary) { return props.theme?.colors.link }
            return theme.colors.link
        }};
        cursor: not-allowed;
    }
    &:hover:not(:disabled) {
        scale: 1.05;
    }
    &:active:not(:disabled) {
        scale: 0.95;
    }
`;

export const FlexibleCta = styled(Cta)`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-width: fit-content;
`;