import React from "react";

import { getAdditionalClassName } from '../misc';

export const CustomButton = React.forwardRef(({ children, element, className, ...props }, ref) => {
    return React.createElement(element, { ref: ref, className: `button${getAdditionalClassName(className)}`, ...props }, children);
});

export const Button = React.forwardRef(({ children, ...props }, ref) => {
    return (
        <CustomButton element={'button'} ref={ref} {...props}>
            {children}
        </CustomButton>
    );
});

export const CustomFancyButton = React.forwardRef(({ children, element, primary, isDelete, className, ...props }, ref) => {
    return React.createElement(element, { ref: ref, className: `button fancy_button ${(primary ? 'primary' : 'secondary') + getAdditionalClassName(className) + (isDelete ? ' delete_button' : '')}`, ...props }, children);
});

export const FancyButton = React.forwardRef(({ element, children, ...props }, ref) => {
    return (
        <CustomFancyButton element={Button} ref={ref} {...props}>
            {children}
        </CustomFancyButton>
    );
});

export const TextInput = React.forwardRef(({ type, value, className, ...props }, ref) => {
    return (
        <input ref={ref} type={type || 'text'} value={value} className={'text_input' + getAdditionalClassName(className)} {...props} />
    );
});