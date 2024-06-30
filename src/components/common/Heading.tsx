import styled from "styled-components";
import theme from "../../themes/default";

interface HeadingProps {
    $color?: string;
    $size?: string;
}

export const Heading = styled.h1<HeadingProps>`
    font-family: Inter, sans-serif;
    font-size: ${props => props.$size || '84px'};
    font-weight: 700;
    text-align: center;
    margin: 0;
    color: ${props => {
        if (props.$color) { return props.$color }
        return props.theme.colors.mediumEmerald || theme.colors.mediumEmerald;
    }};

    & span {
        display: block;
        font-family: "IBM Plex Mono", monospace;
        color: ${props => props.theme.colors.softEmerald || theme.colors.softEmerald };
        font-size: 24px;
    }

    & .highlight {
        color: ${props => props.theme.colors.softEmerald || theme.colors.softEmerald}
    }
`;
