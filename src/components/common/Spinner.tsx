import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const Spinner = styled.span<{$size?: string}>`
    width: ${props => props.$size || '1rem'};
    height: ${props => props.$size || '1rem'};
    border: 4px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: ${rotate} 1.5s linear infinite;
`;
