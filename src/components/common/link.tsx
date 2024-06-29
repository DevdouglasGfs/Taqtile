import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FlexComportamentProps } from "../types";

interface LinkProps extends FlexComportamentProps {
    $fill?: boolean;
    $appearAsButton?: boolean;
}

export const Link = styled<typeof NavLink, LinkProps>(NavLink)`
    display: ${props => props.$appearAsButton ? 'inline-flex' : 'flex'};
    flex-direction: ${props => props.$appearAsButton ? 'row' : 'column'};
    justify-content: ${props => props.$appearAsButton ? 'center' : 'flex-start'};
    align-items: ${props => props.$appearAsButton ? 'center' : 'flex-start'};
    background-color: ${props => props.$appearAsButton ? props.theme.colors.link : 'transparent'};
    color: #fff;
    padding: ${props => props.$appearAsButton ? '12px 24px' : '8px 16px'};
    border-radius: ${props => props.$appearAsButton ? '8px' : ''};
    min-width: ${props => props.$appearAsButton ? 'fit-content' : ''};
    flex: ${props => props.$flex || props.$fill ? '1 1 100%' : ''};
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.1s ease-in-out;

    &:hover {
        background-color: ${props => props.$appearAsButton ? 'transparent' : props.theme.colors.link};
    }
    &:active {
        background-color: ${props => props.$appearAsButton ? 'transparent' : props.theme.colors.link};
    }
    &[disabled]{
        border: .2px solid ${(props) => props.theme.colors.link};
        color: ${props => props.theme.colors.link};
        cursor: not-allowed;
    }
`;