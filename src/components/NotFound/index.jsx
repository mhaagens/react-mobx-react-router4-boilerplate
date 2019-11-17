import React from 'react';
import img404 from '../../static/img/404.png';
import cloud404 from '../../static/img/cloud_404.png';

import style from './style.less';

const goBack = (e) => {
  e.preventDefault();
  return history.back();
};

export const NotFound = () => (
  <div className={style.notFound}>
    <div className={style.wscnHttp404}>
      <div className={style.pic404}>
        <img className={style.pic404__parent} src={img404} alt='404' />
        <img className={`${style.pic404__child} ${style.left}`} src={cloud404} alt='404' />
        <img className={`${style.pic404__child} ${style.mid}`} src={cloud404} alt='404' />
        <img className={`${style.pic404__child} ${style.right}`} src={cloud404} alt='404' />
      </div>
      <div className={style.bullshit}>
        <div className={style.bullshit__oops}>当前页面无法访问！</div>
        <div className={style.bullshit__headline}>404 Not Found</div>
        <div className={style.bullshit__info}>请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</div>
        <a className={style.bullshit__return_home} onClick={goBack}>
          返回首页
        </a>
      </div>
    </div>
  </div>
);

export default NotFound;
