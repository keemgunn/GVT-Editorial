
/** kebab-case-string */
export function toKebabCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/ /gi, '-')
    .replace(/_/gi, '-')
}

/** snake_case_string */
export function toSnakeCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/ /gi, '_')
    .replace(/-/gi, '_')
}


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






