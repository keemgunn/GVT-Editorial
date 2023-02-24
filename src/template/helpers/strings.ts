


export function imageSourceFromUrl(url: string): string {
  if (url.includes('://')) {
    let domain = url.split('://')[1].split('/')[0];
    domain = domain.replace('images.', '');
    domain = domain.replace('www.', '');
    return domain.toUpperCase();
  }
  else {
    return ""
  }
}


/** MakeInto => snake_case */
export function snakify(text: string): string {
  return text.toLowerCase().replace(/ /gi, '-');
}




