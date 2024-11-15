// src/App.js
import React, {useState, useEffect} from 'react';
import {html} from 'diff2html';
import 'diff2html/bundles/css/diff2html.min.css';
import './App.css';

function App() {
    // Define the default git diff
    const defaultDiff = `diff --git a/HelloWorld.java b/HelloWorld.java
index e69de29..f3c2a1b 100644
--- a/HelloWorld.java
+++ b/HelloWorld.java
@@ -1,5 +1,9 @@
 public class HelloWorld {
     public static void main(String[] args) {
+        greet();
         System.out.println("Hello, World!");
     }

+    public static void greet() {
+        System.out.println("Welcome to Java Programming!");
+    }
 }
`;

    // Utility function to extract and decode the 'diff' query parameter
    const getDiffFromQuery = () => {
        const params = new URLSearchParams(window.location.search);
        const diffParam = params.get('diff');
        if (diffParam) {
            try {
                return decodeURIComponent(diffParam);
            } catch (error) {
                console.error('Failed to decode diff from query param:', error);
                return null;
            }
        }
        return null;
    };

    // Initialize gitDiff state with the query parameter or default diff
    const [gitDiff, setGitDiff] = useState(() => {
        const queryDiff = getDiffFromQuery();
        return queryDiff || defaultDiff;
    });

    const [diffHtml, setDiffHtml] = useState("");

    // Configuration States
    const [outputFormat, setOutputFormat] = useState('line-by-line');
    const [colorScheme, setColorScheme] = useState('light');
    const [showFiles, setShowFiles] = useState(true);
    const [matching, setMatching] = useState('words');
    const [matchWordsThreshold, setMatchWordsThreshold] = useState(0.25);
    const [matchingMaxComparisons, setMatchingMaxComparisons] = useState(2500);

    // Effect to generate diffHtml whenever dependencies change
    useEffect(() => {
        try {
            const diff2htmlConfig = {
                inputFormat: 'diff',
                showFiles: showFiles,
                matching: matching, // 'lines', 'words', or 'none'
                outputFormat: outputFormat, // 'line-by-line' or 'side-by-side'
                matchWordsThreshold: matchWordsThreshold,
                matchingMaxComparisons: matchingMaxComparisons,
                colorScheme: colorScheme
            };

            const generatedDiffHtml = html(gitDiff, diff2htmlConfig);
            setDiffHtml(generatedDiffHtml);
        } catch (error) {
            console.error('Error generating diff:', error);
            setDiffHtml('<p style="color: red;">Failed to generate diff. Please check your input.</p>');
        }
    }, [
        gitDiff,
        outputFormat,
        colorScheme,
        showFiles,
        matching,
        matchWordsThreshold,
        matchingMaxComparisons
    ]);

    // Optional: Update gitDiff if the query parameter changes while the component is mounted
    useEffect(() => {
        const handlePopState = () => {
            const queryDiff = getDiffFromQuery();
            if (queryDiff) {
                setGitDiff(queryDiff);
            } else {
                setGitDiff(defaultDiff);
            }
        };

        // Listen for popstate events (e.g., browser navigation)
        window.addEventListener('popstate', handlePopState);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    return (
        <div className="App" style={{padding: "30px"}}>
            <h1>Git Diff Viewer</h1>

            {/* Guide Section */}
            <section className="guide">
                <h2>How to Generate a Git Diff</h2>
                <p>Use the following command to generate a Git diff with the patience algorithm:</p>
                <pre>
                    <code>
                        git diff -w --diff-algorithm=patience {'<commit_id>'} -- {'<path/to/file>'}
                    </code>
                </pre>
            </section>

            {/* Git Diff Input */}
            <div>
                <h3>Paste Your Git Diff</h3>
                <textarea
                    style={{width: "100%"}}
                    rows="20"
                    value={gitDiff}
                    onChange={(e) => setGitDiff(e.target.value)}
                    placeholder="Paste your git diff output here..."
                />
            </div>

            {/* Configuration Options */}
            <div>
                <h3>Configuration Options</h3>
                <table style={{width: "100%"}}>
                    <tbody>
                    <tr>
                        {/* Output Format */}
                        <td>
                            <label title="Output format of the HTML, either line by line or side by side">
                                <p>Output Format</p>
                                <select
                                    value={outputFormat}
                                    onChange={(e) => setOutputFormat(e.target.value)}
                                    name="outputFormat"
                                >
                                    <option value="line-by-line">Line by Line</option>
                                    <option value="side-by-side">Side by Side</option>
                                </select>
                            </label>
                        </td>

                        {/* Color Scheme */}
                        <td>
                            <label title="Color scheme to render. Auto uses user preference.">
                                <p>Color Scheme</p>
                                <select
                                    value={colorScheme}
                                    onChange={(e) => setColorScheme(e.target.value)}
                                    name="colorScheme"
                                >
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                    <option value="auto">Auto</option>
                                </select>
                            </label>
                        </td>

                        {/* File Summary */}
                        <td>
                            <label title="Show the file list summary before the diff">
                                <p>File Summary</p>
                                <input
                                    type="checkbox"
                                    checked={showFiles}
                                    onChange={(e) => setShowFiles(e.target.checked)}
                                    name="drawFileList"
                                />
                            </label>
                        </td>

                        {/* Matching Type */}
                        <td>
                            <label title="Level of matching for the comparison algorithm">
                                <p>Matching Type</p>
                                <select
                                    value={matching}
                                    onChange={(e) => setMatching(e.target.value)}
                                    name="matching"
                                >
                                    <option value="lines">Lines</option>
                                    <option value="words">Words</option>
                                    <option value="none">None</option>
                                </select>
                            </label>
                        </td>

                        {/* Words Threshold */}
                        <td>
                            <label title="Similarity threshold for the matching algorithm">
                                <p>Words Threshold</p>
                                <input
                                    type="number"
                                    value={matchWordsThreshold}
                                    onChange={(e) => setMatchWordsThreshold(parseFloat(e.target.value))}
                                    step="0.05"
                                    min="0"
                                    max="1"
                                    name="matchWordsThreshold"
                                />
                            </label>
                        </td>

                        {/* Max Comparisons */}
                        <td>
                            <label
                                title="Maximum number of comparisons performed by the matching algorithm in a block of changes">
                                <p>Max Comparisons</p>
                                <input
                                    type="number"
                                    value={matchingMaxComparisons}
                                    onChange={(e) => setMatchingMaxComparisons(parseInt(e.target.value))}
                                    step="100"
                                    min="0"
                                    name="matchingMaxComparisons"
                                />
                            </label>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <br/>
                <br/>
            </div>

            {/* Diff Output */}
            <div
                className="diff-html"
                dangerouslySetInnerHTML={{__html: diffHtml}}
            />
        </div>
    );
}

export default App;
