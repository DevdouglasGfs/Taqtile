import styled from "styled-components";

interface HeadingProps {
    color?: string;
    size?: string;
}

export const Heading = styled.h1<HeadingProps>`
    font-family: Inter, sans-serif;
    font-size: ${props => props.size || '84px'};
    font-weight: 700;
    text-align: center;
    margin: 0;
    color: ${props => props.color || props.theme.colors.mediumEmerald};

    & span {
        display: block;
        font-family: "IBM Plex Mono", monospace;
        color: ${props => props.theme.colors.softEmerald};
        font-size: 24px;
    }

    & .highlight {
        color: ${props => props.theme.colors.softEmerald};
    }
`;

export const UppercaseHeading = styled(Heading)`
    text-transform: uppercase;
`;