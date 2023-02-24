
export function copyText(text: string) {
    // Copy the text inside the text field
  navigator.clipboard.writeText(text);
}