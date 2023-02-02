
/**
 * Inject `<meta>` tag with `name` and `content`
 * @param name `string`
 * `[ "description", "author", "viewport", "apple-mobile-web-app-status-bar-style", "theme-color" ]`
 * @param content `string`
 */
export function injectMetaName(name: string, content: string) {
  const meta = document.createElement("meta");
  meta.name = name;
  meta.content = content;
  document.head.appendChild(meta);
}



/**
 * Inject `<script>` tag with `src`
 * @param src `string`
 * @param crossOrigin `string` | `undefined` => `[ "anonymous" ]` -- `"anonymous"` for Google Adsense Script
 */
export function injectScript(src: string, crossOrigin?: string) {
  const script = document.createElement('script');
  script.src = src;
  script.type = 'text/javascript';
  script.async = true;
  script.crossOrigin = crossOrigin || null;
  document.head.appendChild(script);
}


/**
 * Set title of the page.
 * @param title `string`
 */
export function injectTitle(title: string) {
  document.title = title;
}

