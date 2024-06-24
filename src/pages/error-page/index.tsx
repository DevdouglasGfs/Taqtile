import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.log(error)

    return (
        <div className="error-page">
            <h1 className="error-page__title">
                {isRouteErrorResponse(error) ? error.status : 500}
            </h1>
            <p className="error-page__message">
                {isRouteErrorResponse(error) && error.status === 404 && "Página não encontrada."}
            </p>
        </div>
    )
}
