import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { eventNames } from "process";

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

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
      <div ref={ref}>
        <MDEditor />
      </div>
    );
  }

  return (
    <div
      onClick={() => {
        setEditing(true);
      }}
    >
      <MDEditor.Markdown source={"# Header"} />
    </div>
  );
};

export default TextEditor;
