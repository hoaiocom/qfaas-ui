import * as React from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { handlerPyExampleQiskit, handlerPyExampleBraket, handlerPyExampleQsharp, handlerPyExampleCirq } from 'data/createPage';

export default function EditorPython(props) {
    document.documentElement.setAttribute('data-color-mode', 'dark')
    return (

        <div style={{ maxHeight: "500px", overflow: "scroll" }}>
            <div className="w-tc-editor-var"> </div>
            <CodeEditor
                value={props.code}
                language="python"
                placeholder=""
                onChange={(evn) => props.codeChanger(evn.target.value)}
                padding={15}
                style={{
                    fontSize: 13,
                    // backgroundColor: "#DBE0E8",
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    borderRadius: '10px',
                }}
            />
        </div>

    );
}