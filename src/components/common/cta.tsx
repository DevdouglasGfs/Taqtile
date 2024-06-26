import styled from "styled-components";

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
    background: ${props => props.$primary ? props.theme?.colors.link : "#fff"};
    border: none;
    color: ${props => props.$primary ? "#fff" : props.theme.colors.link};
    padding: 12px 24px;
    text-align: center;
    gap: ${props => props.$gap || "0.5rem"};
    text-decoration: none;
    font-size: 1rem;
    width: ${props => props.$fill === "half" ? "fit-content" : "100%"};
    min-width: fit-content;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: scale 0.1s ease-in-out;

    &[disabled] {
        background: transparent;
        border: .2px solid ${props => props.theme?.colors.link};
        color: ${props => props.theme?.colors.link};
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