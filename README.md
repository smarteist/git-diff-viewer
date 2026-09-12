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

1. **Clone the repository:**

   ```bash
   git clone https://github.com/smarteist/git-diff-viewer.git
   cd git-diff-viewer
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   # or: npm install
   ```

3. **Start the local server:**

   ```bash
   yarn start
   # or: npm start
   ```

## Usage

You can use Git Diff Viewer either by pasting diffs into the text area or by opening the viewer directly from your command line with the diff encoded in the URL (`?d=...` or `?diff=...`).

### Open Directly from the Terminal

These one-liners pipe your `git diff` into a URL-safe Base64 string and launch your browser right away:

#### Linux

```bash
xdg-open "https://smarteist.github.io/git-diff-viewer/?d=$(git diff | base64 | tr -d '\n' | tr '+/' '-_' | tr -d '=')"
```

#### macOS

```bash
open "https://smarteist.github.io/git-diff-viewer/?d=$(git diff | base64 | tr -d '\n' | tr '+/' '-_' | tr -d '=')"
```

#### Windows (PowerShell)

```powershell
$d = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes((git diff | Out-String))).Replace("+","-").Replace("/","_").TrimEnd("=")
Start-Process "https://smarteist.github.io/git-diff-viewer/?d=$d"
```

### Handy Shell Shortcut

If you view diffs often, add a quick function to your `~/.bashrc`, `~/.zshrc`, or shell profile:

```bash
gdiffv() {
  local target_url="https://smarteist.github.io/git-diff-viewer/?d=$(git diff "$@" | base64 | tr -d '\n' | tr '+/' '-_' | tr -d '=')"
  if command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$target_url"
  elif command -v open >/dev/null 2>&1; then
    open "$target_url"
  else
    echo "$target_url"
  fi
}
```

Now you can run:

```bash
# View unstaged changes
gdiffv

# View staged changes
gdiffv --cached

# Compare specific branches or commits
gdiffv main..feature-branch
```

### URL Parameter Details

- **`d`** (or **`diff`**): The diff string. Accepts standard Base64, URL-safe Base64, or percent-encoded text.
- Supports both query strings (`?d=...`) and URL fragments (`#d=...`). Using fragments can help when diffs exceed query string length limits in some proxy environments.


