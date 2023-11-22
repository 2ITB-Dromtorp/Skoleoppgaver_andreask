import React from "react";

import { getAdditionalClassName } from '../misc';

export function CustomButton({ children, element, className, ...props }) {
    return React.createElement(element, { className: `button${getAdditionalClassName(className)}`, ...props }, children);
}

export function Button({ children, ...props }) {
    return (
        <CustomButton element={'button'} {...props}>
            {children}
        </CustomButton>
    );
}

export function CustomFancyButton({ children, element, primary, isDelete, className, ...props }) {
    return React.createElement(element, { className: `button fancy_button ${(primary ? 'primary' : 'secondary') + getAdditionalClassName(className) + (isDelete ? ' delete_button' : '')}`, ...props }, children);
}

export function FancyButton({ element, children, ...props }) {
    return (
        <CustomFancyButton element={Button} {...props}>
            {children}
        </CustomFancyButton>
    );
}

export function TextInput({ type, value, className, ...props }) {
    return (
        <input type={type || 'text'} value={value} className={'text_input' + getAdditionalClassName(className)} {...props} />
    );
}