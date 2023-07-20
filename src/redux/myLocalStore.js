export const myLocalStore = {
  luuLocalStore: (name, data) => {
    localStorage.setItem(name, JSON.stringify(data));
  },
  goiLocalStore: (name) => {
    return JSON.parse(localStorage.getItem(name));
  },
  xoaLocalStore: (name) => {
    localStorage.removeItem(name);
  },
};
