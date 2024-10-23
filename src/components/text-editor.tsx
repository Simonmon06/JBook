import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { eventNames } from "process";

import "./text-editor.css";

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState("# Header");

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        // element clicked on is inside the editor
        return;
      }
      // element clicked on is outside the editor
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });
    //free memory
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);
  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor
          onChange={(v) => {
            setValue(v || "");
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="text-editor card"
      onClick={() => {
        setEditing(true);
      }}
    >
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
