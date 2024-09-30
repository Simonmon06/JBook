import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.css";
import { useEffect, useState } from "react";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(Math.floor(window.innerWidth * 0.75));
  let resizableProps: ResizableBoxProps;

  useEffect(() => {
    let timer: any;

    const listener = () => {
      setTimeout(() => {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          setInnerHeight(window.innerHeight);
          setInnerWidth(window.innerWidth);
          if (window.innerWidth * 0.75 < width) {
            setWidth(Math.floor(window.innerWidth * 0.75));
          }
        }, 100);
      });
    };
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      height: Infinity,
      width,
      resizeHandles: ["e"],
      maxConstraints: [Math.floor(innerWidth * 0.75), Infinity],
      minConstraints: [Math.floor(innerWidth * 0.2), Infinity],
      onResizeStop: (e, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      className: "resize-vertical",
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
      maxConstraints: [Infinity, Math.floor(innerHeight * 0.9)],
      minConstraints: [Infinity, Math.floor(innerHeight * 0.1)],
    };
  }

  return (
    // workaournd  ResizableBox cant take 100%
    <ResizableBox {...resizableProps}>{children}</ResizableBox>
  );
};

export default Resizable;
