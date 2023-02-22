import websiteProperties from '@/configs/website/properties.yml';
const websiteName = websiteProperties.websiteName as string;

function tag(name: string) {
  return websiteName + '-' + name
}

function getItem(name: string) {
  return sessionStorage.getItem(tag(name));
}

function setItem(name: string, value: string) {
  sessionStorage.setItem(tag(name), value);
}

export default {
  getItem,
  setItem
}