




export function shareOnFacebook() {
  const navUrl = 'https://www.facebook.com/sharer/sharer.php?u='
    + window.location.href;
  window.open(navUrl , '_blank');
}


export function shareOnTwitter() {
  const navUrl = 'https://twitter.com/intent/tweet?text='
    + window.location.href;
  window.open(navUrl, '_blank');
}