import '../css/tool_tip.css';

import { getAdditionalClassName } from '../misc';

export function ToolTips({ children }) {
    return (
        <div id="tool_tips">
            {children}
        </div>
    );
}

export function ToolTip({ children, className, dir, ...props }) {
    return (
        <div className={`tool_tip ${dir}${getAdditionalClassName(className)}`} {...props}>
            <div className='tool_tip_content'>
                {children}
            </div>
            <div className='tool_tip_arrow'>

            </div>
        </div>
    );
}