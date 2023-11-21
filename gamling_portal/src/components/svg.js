import { getAdditionalClassName } from '../misc';

export function ArrowRightSvg({ className }) {
    return (
        <svg className={"icon arrow_right_icon" + getAdditionalClassName(className)} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M 16.4 7 L 21.5 12 L 16.4 17 M 2.5 12 L 19.2 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}