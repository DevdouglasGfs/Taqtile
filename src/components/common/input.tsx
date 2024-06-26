import styled from "styled-components";

interface InputProps {
    type?: string;
}

export const Input = styled.input<InputProps>`
    background: transparent;
    border: none;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: normal;
    color: #fff;
    font-size: 1rem;
    border: .2px solid rgba(255, 255, 255, .2);
    accent-color: ${props => props.theme.colors.link};

    &::placeholder {
        color: rgba(255, 255, 255, .5);
    }

    &:focus {
        outline: none;
        border: .2px solid rgba(255, 255, 255, .5);
    }
`;