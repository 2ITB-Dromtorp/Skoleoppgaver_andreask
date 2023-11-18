export function LoadingContainer({ children }) {
    return (
        <div id='loading_loading_container'>
            {children}
        </div>
    );
}

export function LoadingFailedContainer({ children }) {
    return (
        <div id='loading_failed_container'>
            {children}
        </div>
    );
}