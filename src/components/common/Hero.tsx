import styled from "styled-components";
import { FlexComportamentProps } from "../types";

interface HeroProps extends FlexComportamentProps {
    $bg?: string;
    $padding?: string;
}

export const Hero = styled.div<HeroProps>`
    background: ${props => props.$bg ? props.$bg : props.theme.colors.bgBolder};
    padding: ${props => props.$padding ? props.$padding : '4rem'};
    color: #fff;
    min-height: 40dvh;
    display: ${props => props.$flex ? "flex" : "block"};
    flex-direction: column;
    align-items: ${props => props.$align ? props.$align : "center"};
    justify-content: ${props => props.$justify ? props.$justify : "center"};
    width: 100%;
    max-width: 100%;
    gap: 1rem;
`;