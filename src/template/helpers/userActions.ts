
export function copyText(text: string) {
  // let dummy = document.createElement('input');
  // document.body.appendChild(dummy);
  // dummy.value = text;
  // dummy.select();
  // document.execCommand('copy');
  // document.body.removeChild(dummy);


    // Copy the text inside the text field
  navigator.clipboard.writeText(text);

  // Alert the copied text
  // alert("Copied the text: " + text);
}