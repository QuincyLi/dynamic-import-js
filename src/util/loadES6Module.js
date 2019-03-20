import React from 'react';
import * as antd from 'antd';
import ReactDom from 'react-dom';
import * as babel from '@babel/standalone';

import { getUploadJS } from '../services/uploadFiles';
import 'antd/dist/antd.css';

window.exports = {};
window.require = require;
const options = {
  presets: ['react', 'es2015'],
  plugins: [
    ["proposal-decorators", { legacy: true }],
    ["proposal-class-properties", { loose: true }]
  ]
};

function require(name) {
  if (name == 'react') {
    return React;
  } else if (name == 'antd') {
    return antd;
  } else {
    throw "You can't use module other than 'react' in remote component"
  }
}

export function capture(fileName, div) {
  // return new Promise((resolve, reject) => {
  //   const script = document.createElement('script');
  //   script.setAttribute('type', 'text/babel');
  //   // script.setAttribute('type', 'module');
  //   script.setAttribute('src', `http://localhost:3000/${fileName}`);

  //   script.onload = resolve;
  //   script.onerror = reject;

  //   document.body.appendChild(script);
  // });

  // return getUploadJS(fileName).then((res) => {
  //   const output = babel.transform(res.html, { presets: [['es2015', { modules: false }], 'react'] }).code;
  //   const script = document.createElement('script');
  //   script.setAttribute('type', 'module');
  //   script.innerHTML = output;

  //   document.body.appendChild(script);
  //   // const output = babel.transform(res.html, { presets: ["@babel/preset-env","@babel/preset-react"] }).code;
  //   // evalInContext.call({
  //   //   div,
  //   //   React
  //   // }, output)
  // });
  return getUploadJS(fileName).then(res => {
    return res.html;
  });
}

export function captureWay(fileName) {
  // return getUploadJS(fileName).then(res => {
  //   const output = babel.transform(res.functional, { presets: ['es2015', 'react'] }).code;
  //   eval(output);
  // });

  return fetch(`http://localhost:3000/${fileName}`).then(res => res.text()).then(source => {
    const module = babel.transform(source, options).code;
    // eval(module);
    new Function(module)();
    return exports.__esModule ? exports.default : exports;
  });
}