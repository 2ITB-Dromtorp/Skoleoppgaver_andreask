const Button = (props) => {
    return (
        <div role="button" className="button_container">
            <div className="button">
                <div className="button_content">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Button;