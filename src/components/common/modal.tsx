import styled, { keyframes } from "styled-components";
import { FlexComportamentProps, OverlapProps } from "../types";
import Keyframes from "styled-components/dist/models/Keyframes";


export interface ModalProps extends FlexComportamentProps, OverlapProps {
    open: boolean;
    zIndex?: number;
    $bg?: string;
    appear?: Keyframes
}

const appear = keyframes`
    from {
        opacity: 0;
        scale: .5
    }
    to {
        opacity: 1;
        scale: 1
    }
`;

export const Modal = styled.div<ModalProps>`
    display: ${props => props.open ? "flex" : "none"};
    flex-direction: ${props => props.$dir || "column"};
    justify-content: ${props => props.$justify || "center"};
    align-items: ${props => props.$align || "center"};
    flex-wrap: ${props => props.$wrap || "nowrap"};
    gap: ${props => props.$gap || "1rem"};
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 2rem);
    max-width: 70cqw;
    height: calc(100% - 2rem);
    background: ${props => props?.$bg } ${props => !props?.$bg && "linear-gradient(to bottom, #030712, #111827)"};
    box-shadow: 0 0 1rem rgba(0, 0, 0, .2);
    border: 1px solid rgba(255, 255, 255, .1);
    z-index: ${props => props.zIndex || 1000};
    animation: ${props => props.appear || appear} .3s ease-in;
    padding: 1rem;
    border-radius: 1rem;
    transform-origin: 50%;

    & form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: 100%;
        height: 100%;
        padding: 2rem;
        overflow: hidden scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
            display: none;
        }
    }
    
    & fieldset {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        width: 100%;
        border: none;
        padding: 0;
        margin: 0;

        & h2, h3 {
            font-size: 1.25em;
            text-align: left;
        }
    }
`;
