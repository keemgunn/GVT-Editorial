export default function addMetaTags (name: string, content: string) {
  const meta = document.createElement("meta");
  meta.name = name;
  meta.content = content;
  document.getElementsByTagName("head")[0].appendChild(meta);
}