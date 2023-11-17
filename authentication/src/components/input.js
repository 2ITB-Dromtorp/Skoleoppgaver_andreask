import React from "react";

function getAdditionalClassName(className) {
    return className ? ' ' + className : '';
}

export function Button({ children, ...props }) {
    return (
        <button {...props}>
            {children}
        </button>
    );
}

export function CustomFancyButton({ children, element, primary, className, ...props }) {
    return React.createElement(element, {className: `fancy_button ${(primary ? 'primary' : 'secondary') + getAdditionalClassName(className)}`, ...props}, children);
}

export function FancyButton({ element, children, ...props }) {
    return (
        <CustomFancyButton element={Button} { ...props }>
            {children}
        </CustomFancyButton>
    );
}

export function TextInput({ type, value, className, ...props }) {
    return (
        <input type={type || 'text'} value={value} className={'text_input' + getAdditionalClassName(className)} {...props}/>
    );
}