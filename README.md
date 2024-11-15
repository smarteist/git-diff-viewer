# Git Diff Viewer

## Live Demo

Experience **Git Diff Viewer** in action: [https://smarteist.github.io/git-diff-viewer/](https://smarteist.github.io/git-diff-viewer/)

## Overview

**Git Diff Viewer** is a simple and intuitive web application built with React that allows users to visualize Git diffs effortlessly. By leveraging the powerful [`diff2html`](https://diff2html.xyz/) library, this tool transforms raw Git diff outputs into a readable and aesthetically pleasing format, making code reviews and change tracking more efficient.

## Features

- **Easy Input:** Paste your Git diff output directly into the textarea.
- **Real-time Visualization:** Generate and view the formatted diff with a single click.
- **Responsive Design:** Optimized for various screen sizes and devices.
- **Syntax Highlighting:** Clear differentiation between added, removed, and unchanged code lines.
- **Customizable Settings:** Configure diff display options such as matching mode and output format.

## Installation

Follow these steps to set up the Git Diff Viewer locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/smarteist/git-diff-viewer.git
   cd git-diff-viewer


## Usage

You can easily open the Git Diff Viewer with your current Git diff by using the following one-line commands in your terminal. These commands generate the diff, URL-encode it, embed it as a query parameter, and open the viewer in your default web browser.

### Linux

Use `xdg-open` to open the URL in your default browser:

```bash
xdg-open "https://smarteist.github.io/git-diff-viewer/?diff=$(git diff *TODO* | perl -MURI::Escape -ne 'chomp; print uri_escape($_),"%0A"')"
```

### macOS

Use `open` to open the URL in your default browser:

```bash
open "https://smarteist.github.io/git-diff-viewer/?diff=$(git diff *TODO* | perl -MURI::Escape -ne 'chomp; print uri_escape($_),"%0A"')"
```

