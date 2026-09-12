import { render, screen } from '@testing-library/react';
import App from './App';

describe('Git Diff Viewer', () => {
  const originalLocation = window.location;

  afterEach(() => {
    window.location = originalLocation;
  });

  test('renders Git Diff Viewer title', () => {
    render(<App />);
    const headingElement = screen.getByText(/Git Diff Viewer/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('decodes diff from ?d= base64 query param', () => {
    const customDiff = 'diff --git a/test.txt b/test.txt\n--- a/test.txt\n+++ b/test.txt\n@@ -1 +1 @@\n-old\n+new-feature';
    const base64Diff = btoa(customDiff);

    delete window.location;
    window.location = new URL(`https://smarteist.github.io/git-diff-viewer/?d=${base64Diff}`);

    render(<App />);
    const textarea = screen.getByPlaceholderText(/Paste your git diff output here/i);
    expect(textarea.value).toBe(customDiff);
  });

  test('decodes diff from ?diff= base64 query param', () => {
    const customDiff = 'diff --git a/sample.txt b/sample.txt\n+added line';
    const base64Diff = btoa(customDiff);

    delete window.location;
    window.location = new URL(`https://smarteist.github.io/git-diff-viewer/?diff=${base64Diff}`);

    render(<App />);
    const textarea = screen.getByPlaceholderText(/Paste your git diff output here/i);
    expect(textarea.value).toBe(customDiff);
  });

  test('decodes diff from url-encoded query param', () => {
    const customDiff = 'diff --git a/sample.txt b/sample.txt\n+added url encoded line';

    delete window.location;
    window.location = new URL(`https://smarteist.github.io/git-diff-viewer/?d=${encodeURIComponent(customDiff)}`);

    render(<App />);
    const textarea = screen.getByPlaceholderText(/Paste your git diff output here/i);
    expect(textarea.value).toBe(customDiff);
  });

  test('decodes diff from URL hash #d= base64', () => {
    const customDiff = 'diff --git a/hash.txt b/hash.txt\n+hash line';
    const base64Diff = btoa(customDiff);

    delete window.location;
    window.location = new URL(`https://smarteist.github.io/git-diff-viewer/#d=${base64Diff}`);

    render(<App />);
    const textarea = screen.getByPlaceholderText(/Paste your git diff output here/i);
    expect(textarea.value).toBe(customDiff);
  });
});

