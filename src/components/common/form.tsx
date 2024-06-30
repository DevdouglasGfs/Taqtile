import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    width: 100%;
    height: 100%;
    max-width: 90cqw;
    margin: 0 auto;
    border-radius: 0.5rem;

    & > * {
        max-width: max(50cqw, fit-content);
    }

    & div {
        width: 100%;
    }

    & fieldset {
        flex-basis: 100%;
        border: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        min-width: 100%;

        & label, & input {
            width: 100%;
        }

        & input {
            padding: 1rem;
            border-radius: 0.5rem;
        }
    }
`;