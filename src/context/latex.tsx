"use client";

import { MathJaxContext } from "better-react-mathjax";

const config = {
  //   loader: { load: ["[tex]/html"] },
  tex: {
    // packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
};

const LatexContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <MathJaxContext version={3} config={config}>
      {children}
    </MathJaxContext>
  );
};

export default LatexContext;
