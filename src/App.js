// src/App.js
import React, {useState} from 'react';
import {html} from 'diff2html';
import 'diff2html/bundles/css/diff2html.min.css';
import './App.css';

function App() {
    const [gitDiff, setGitDiff] = useState(
        `diff --git a/HelloWorld.java b/HelloWorld.java
index e69de29..f3c2a1b 100644
--- a/HelloWorld.java
+++ b/HelloWorld.java
@@ -1,5 +1,9 @@
 public class HelloWorld {
     public static void main(String[] args) {
+        greet();
         System.out.println("Hello, World!");
     }
+
+    public static void greet() {
+        System.out.println("Welcome to Java Programming!");
+    }
 }
`
    );
    const [diffHtml, setDiffHtml] = useState("");

    const generateDiffHtml = () => {
        try {
            const diff2htmlConfig = {
                inputFormat: 'diff',
                showFiles: true,
                matching: 'lines', // can be 'lines', 'words', or 'none'
                outputFormat: 'line-by-line', // or 'side-by-side'
            };

            const generatedDiffHtml = html(gitDiff, diff2htmlConfig);
            setDiffHtml(generatedDiffHtml);
        } catch (error) {
            console.error('Error generating diff:', error);
            alert('Failed to generate diff. Please check your input.');
        }
    };

    return (
        <div className="App" style={
            {
                padding: "30px"
            }
        }>
            <h1>Git Diff Viewer</h1>
            <textarea
                style={
                    {
                        width: "100%"
                    }
                }
                rows="15"
                cols="100"
                value={gitDiff}
                onChange={(e) => setGitDiff(e.target.value)}
                placeholder="Paste your git diff output here..."
            />
            <br/>
            <button onClick={generateDiffHtml}>Generate Diff</button>
            <div
                className="diff-html"
                dangerouslySetInnerHTML={{__html: diffHtml}}
            />
        </div>
    );
}

export default App;
