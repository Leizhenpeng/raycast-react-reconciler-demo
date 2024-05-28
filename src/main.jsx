import React from 'react';
import MyReconciler from './reconciler/MyReconciler';
import App from './components/App';

const container = document.getElementById('root');
const root = MyReconciler.createContainer(container, false, false);

let currentCount = 0; // 初始计数

function render() {
  MyReconciler.updateContainer(<App count={currentCount} onIncrement={() => {
    currentCount += 1;
    render(); // 递归渲染
  }} />, root, null);
}

render(); // 初始渲染

export default function Main() {
  return null; // 不使用 ReactDOM 渲染任何内容
}
