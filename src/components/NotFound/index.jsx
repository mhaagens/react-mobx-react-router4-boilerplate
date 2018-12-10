import React from 'react';
import style from './style.less';
import img404 from './Assets/notfound.png';

export default function NotFound () {
  return (
    <div className={style.notfound}>
      <img src={img404} alt='' />
      <h2 className={style.title} onClick={()=>{ history.back();}}>
        404
      </h2>
    </div>
  );
}
