export interface FlexComportamentProps {
    $flex?: string;
    $justify?: "start" | "end" | "center" | "space-between" | "space-around";
    $align?: "center" | "start" | "end";
    $gap?: string;
    $dir?: "row" | "column";
    $wrap?: "wrap" | "nowrap";
}

export type OverlapProps = {
    isolate?: boolean;
}

export interface Distance {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
}