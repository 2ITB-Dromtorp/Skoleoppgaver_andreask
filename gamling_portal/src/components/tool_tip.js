import React, { useContext, useEffect, useReducer } from 'react';
import '../css/tool_tip.css';

import { getAdditionalClassName } from '../misc';
import { ToolTipsContext } from '../context';

export function ToolTips() {
    const { 0: toolTips } = useContext(ToolTipsContext);
    const { 1: forceUpdate } = useReducer(x => x + 1, 0);

    useEffect(() => {
        const scrollListener = (e) => {
            forceUpdate();
        }
        document.addEventListener('scroll', scrollListener, true);
        return () => {
            document.removeEventListener('scroll', scrollListener, true);
        }
    });

    return (
        <div id="tool_tips">
            {toolTips.map((toolTip, index) => {
                if (toolTip.attachRef() === undefined) {
                    return;
                }
                const attachRect = toolTip.attachRef().getBoundingClientRect();
                return (
                    <ToolTip key={index} dir={toolTip.dir} className={toolTip.interactive ? 'interactive_tool_tip' : ''} style={{ '--x': `${attachRect.x}px`, '--y': `${attachRect.y}px` }}>
                        {React.createElement(toolTip.content)}
                    </ToolTip>
                );
            })}
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