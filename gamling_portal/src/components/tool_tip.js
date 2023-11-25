import React, { useContext } from 'react';
import '../css/tool_tip.css';

import { getAdditionalClassName } from '../misc';
import { ToolTipsContext } from '../context';

export function ToolTips() {
    const { 2: toolTips } = useContext(ToolTipsContext);

    return (
        <div id="tool_tips">
            {toolTips.map((toolTip, index) => {
                if (toolTip.attachRef.current) {
                    const rect = toolTip.attachRef.current.getBoundingClientRect();
                    return (
                        <ToolTip key={index} dir={toolTip.dir} className={toolTip.interactive ? 'interactive_tool_tip' : ''} style={{ '--x': `${rect.x}px`, '--y': `${rect.y}px`, '--width': `${rect.width}px`, '--height': `${rect.height}px` }}>
                            {React.createElement(toolTip.content, { toolTip: toolTip })}
                        </ToolTip>
                    );
                } else {
                    console.warn("nuh uh");
                    return (
                        <div>
                            No ref
                        </div>
                    );
                }
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