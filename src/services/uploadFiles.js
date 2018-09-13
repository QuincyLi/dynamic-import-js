function request(url, options) {
  const newOptions = {
    headers: {},
    ...options
  }
  // if (Token) {
  //   newOptions.headers.Authorization = Token;
  // }
  return fetch(url, newOptions).then(res => res.json()).catch((err) => {
    return err;
  });
}

export function upload(param = {}) {
  request('/upload', {
    method: 'POST',
    // headers: {
    //   'Content-type': 'multipart/form-data;'
    // },
    body: param 
  });
}