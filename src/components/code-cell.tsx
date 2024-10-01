import { useState, useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundle from "../bundler";
import Resizable from "./resizable";
const CodeCell = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  // when user stop typing for 1s, run the code.
  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setError(output.error);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output.code);
    setError(output.error);
  };

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        {/* <div>
          <button onClick={onClick}>Submit</button>
        </div> */}
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
