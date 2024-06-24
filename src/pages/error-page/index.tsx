import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.log(error)

    return (
        <div className="error-page">
            <h1 className="error-page__title">Um erro aconteceu</h1>
            <p className="error-page__subtitle">Desculpe, um erro inesperado aconteceu.</p>

            <details className="error-page__wrap-details">
                <summary className="error-page__summary">Detalhes</summary>
                <p className="error-page__details">{
                    //@ts-ignore
                    error?.statusText || error.message
                }</p>
            </details>
        </div>
    )
}
