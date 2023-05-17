export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const URLSearchParams = (params: any = {}) => {
  let qparam = '?';
  let keys = Object.keys(params);
  for (let id = 0; id < keys.length; id++) {
    const element = keys[id];
    qparam += `${element}=${params[element]}&`;
  }

  return qparam;
};
