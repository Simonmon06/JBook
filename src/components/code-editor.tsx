import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import { useRef } from "react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();

  // onDidChangeModelContent called everytime the code change
  const editorDidMount: EditorDidMount = (getValue, editor) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    editor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    // get current value from editor
    const unfomatted = editorRef.current.getModel().getValue();

    // format that value
    const formatted = prettier.format(unfomatted, {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      semi: true,
      // doubleQuotes: true,
    });
    // set the formatted value back to the editor
    editorRef.current.setValue(formatted);
  };
  return (
    <div>
      <button onClick={onFormatClick}>Format</button>
      <MonacoEditor
        editorDidMount={editorDidMount}
        value={initialValue}
        height="500px"
        language="javascript"
        theme="dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
