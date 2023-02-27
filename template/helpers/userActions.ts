
export function copyText(text: string) {
    // Copy the text inside the text field
  navigator.clipboard.writeText(text);
  // In iOS, this method only works via https connection.

}