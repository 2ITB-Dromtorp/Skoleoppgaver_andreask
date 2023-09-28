const Table = ({ children, ...props }) => {
    return (
        <>
            <div className="table">
                {children}
            </div>
        </>
    );
}

export default Table;