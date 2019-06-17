import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router/router';
import store from './store/store'
import {Provider} from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import './style/base.css';
ReactDOM.render(
<Provider store={store}>
  <Router />
</Provider>, document.getElementById('root'));
registerServiceWorker();// 主要是用于在生产环境中为用户在本地创建一个service worker 来缓存资源到本地，提升应用的访问速度。
