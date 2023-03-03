import * as React from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';

export default function Editor(props) {
    document.documentElement.setAttribute('data-color-mode', 'dark')
    return (
        <div>
            <div className="w-tc-editor-var"> </div>
            <CodeEditor
                value={props.code}
                language="json"
                placeholder="Please enter JS code."
                onChange={(evn) => props.codeChanger(evn.target.value)}
                padding={15}
                style={{
                    fontSize: 12,
                    // backgroundColor: "#161b22",
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
            />
        </div>
    );
}