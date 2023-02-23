import configs from '../configs';
const { WEBSITE_NAME } = configs.website;

function tag(name: string) {
  return WEBSITE_NAME + '-' + name
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