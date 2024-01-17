import React, { useState, useEffect, useRef } from "react";
import { Marked } from "marked";

import styles from "./MarkdownPreviwer.module.css";

const marked = new Marked({
    pedantic: false,
    gfm: true,
    breaks: true,
});
const multiLineString = `# Welcome to my React Markdown Previewer!
  
  ## This is a sub-heading...
  ### And here's some other cool stuff:
  
  Heres some code, \`<div></div>\`, between 2 backticks.
  
  \`\`\`
  // this is multi-line code:
  
  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\\\`\`\`' && lastLine == '\\\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`
  
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.
  
  There's also [links](https://www.freecodecamp.org), and
  > Block Quotes!
  
  And if you want to get really crazy, even tables:
  
  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | -------------
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.
  
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  1. And there are numbered lists too.
  1. Use just 1s if you want!`;

const MarkdownPreviwer: React.FC<{}> = () => {
    let [editorText, setEditorText] = useState(multiLineString);
    let [editorFullscreen, setEditorFullscreen] = useState(false);
    let [previwerFullscreen, setPreviwerFullscreen] = useState(false);
    let previewElement = useRef<any>();
    useEffect(() => {
        // previewElement = document.getElementById('preview')
        if(previewElement.current){
            previewElement.current.innerHTML = marked.parse(editorText);
        }
    }, [editorText]);

    return (
        <div className={styles.markdownApp}>
            <div className={styles.markdownHeader}>
                Markdown Previewer
            </div>
            <div className={styles.markdownWrapper}>
                {/* <div> */}
                    {/** Editor Start */}
                    <div className={`${styles.editorWrapper}  ${(editorFullscreen ? styles.maximize : '')}  ${(previwerFullscreen ? styles.hide : '')}`}>
                        <div className={styles.toolbar}>
                            {/* <i className="fa-brands fa-free-code-camp"></i> */} Editor 
                            {editorFullscreen ? <i className="fa-solid fa-minimize" onClick={() => { setEditorFullscreen(false) }}></i> : <i className="fa-solid fa-maximize" onClick={() => { setEditorFullscreen(true) }}></i>}
                        </div>
                        <textarea id="editor" cols={100} className={styles.editor} value={editorText} onChange={(e) => { setEditorText(e.target.value) }}></textarea>
                    </div>
                    {/** Editor End */}

                    {/** Previewer Start */}
                    <div className={`${styles.previewWrapper}  ${(previwerFullscreen ? styles.maximize : '')}  ${(editorFullscreen ? styles.hide : '')}`}>
                        <div className={styles.toolbar}>
                            {/* <i className="fa-brands fa-free-code-camp"></i> */} Previewer 
                            {previwerFullscreen ? <i className="fa-solid fa-minimize" onClick={() => { setPreviwerFullscreen(false) }}></i> : <i className="fa-solid fa-maximize" onClick={() => { setPreviwerFullscreen(true) }}></i>}
                        </div>
                        <div id="preview" ref={previewElement} className={styles.preview}></div>
                    </div>
                    {/** Previewer End */}
                {/* </div> */}
            </div>
        </div>
    );
}

export default MarkdownPreviwer;