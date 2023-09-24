import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SYNTAX_HIGHLIGHTING_STYLE = atomOneDark;

const highlightLines = (lines) => {
    return (n) => {
        const props = {
            class: 'code_line',
        };
        if (lines !== undefined) {
            if (lines.indexOf(n) !== -1) {
                props.class += ' code_highlight';
            }
        }
        return props;
    };
}

export const DefaultHighlighter = SyntaxHighlighter;

export const Highlighter = (props) => {
    return (
        <SyntaxHighlighter language={props.language} customStyle={{ padding: '' }} lineNumberStyle={{'min-width': '1.25em'}} className={props.className || 'big_code'} codeTagProps={{ className: props.codeTagClassName || 'big_code_wrapper' }} style={SYNTAX_HIGHLIGHTING_STYLE} wrapLines={true} PreTag={'code'} CodeTag={'div'} useInlineStyles={true} showLineNumbers={true} showInlineLineNumbers={true} lineProps={highlightLines(props.linesToHighlight)}>
            {props.children}
        </SyntaxHighlighter>
    );
}