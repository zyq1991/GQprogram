// const domain = 'http://39.105.185.44:8090';
const domain = 'https://bianshixue.com';
const process = (url, data, option) => {
  if (!option) {
    option = { method: 'GET' };
  }
  let request_obj = {
    url: `${domain}${url}`,
    data,
    method: option.method || 'GET'
  };
  if (option && option.isNotAuth) {
    return request(request_obj);
  } else {
    let token = get_token();
    if (!token) {
      return fetch_token().then(token => {
        request_obj.header = {
          cookie: token
        };
        return request(request_obj);
      });
    } else {
      request_obj.header = {
        cookie: token
      };
      return request(request_obj);
    }
  }
};

const request = (req_obj) => {
  return new Promise((resolve, reject) => {
    req_obj.success = res => {
      resolve(res);
    };
    req_obj.fail = err => {
      reject(err)
    };
    wx.request(req_obj);
  });
};

const wx_login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        resolve(res.code);
      },
      fail: err => {
        console.error(err);
        reject(err);
      }
    });
  });
};

const get_token = () => {
  let token = wx.getStorageSync('token');
  return token;
};

const set_token = (token) => {
  wx.setStorageSync('token', token);
  return token;
};

const fetch_token = () => {
  return wx_login().then(code => {
    return Post('/cp/findcpuser', { code }, { isNotAuth: true });
  }).then(res => {
    if (res.data.success) {
      return set_token(res.data.token);
    } else {
      return set_token('thisistoken');
      wx.showToast({
        icon: 'none',
        title: res.data.info || '请求错误'
      });
      throw 'err: /cp/findcpuser';
    }
  });
};

const Get = (url, data, option = {}) => {
  option.method = 'GET';
  return process(url, data, option);
};

const Post = (url, data, option = {}) => {
  option.method = 'POST';
  return process(url, data, option);
};

module.exports = {
  Get, Post, Request: process
};