import { createElement } from 'react';

const Button = ({ children, className, role, buttonTag, ...props }) => {
    let addClass;
    if (className !== undefined) {
        addClass = className + ' ';
    } else {
        addClass = '';
    }
    let acButtonTag;
    if (buttonTag !== undefined) {
        acButtonTag = buttonTag;
    } else {
        acButtonTag = 'div';
    }
    return (
        <div {...props} className={addClass + 'button_container'} role={role || 'button'}>
            <div className="button">
                {createElement(
                    acButtonTag,
                    {
                        className: "button_content",
                    },
                    children
                )}
            </div>
        </div>
    );
}

export default Button;