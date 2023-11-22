import { getAdditionalClassName } from './misc';

export function ArrowRightIcon({ className }) {
    return (
        <svg className={"icon arrow_right_icon" + getAdditionalClassName(className)} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M 16.4 7 L 21.5 12 L 16.4 17 M 2.5 12 L 19.2 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function CheckmarkIcon({ className }) {
    return (
        <svg className={"icon checkmark_icon" + getAdditionalClassName(className)} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12.6111L8.92308 17.5L20 6.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function UserIcon({ id, className }) {
    return (
        <svg id={id} className={"icon user_icon" + getAdditionalClassName(className)} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" />
            <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#000000" />
        </svg>
    );
}