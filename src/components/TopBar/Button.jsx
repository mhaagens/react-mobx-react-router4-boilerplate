import React from 'react';
import propTypes from 'prop-types';
import style from './style.less';

const Button = ({ onClick, title }) => {
  return (
    <a className={style.button} onClick={onClick}>
      {title}
    </a>
  );
};

Button.propTypes = {
  title: propTypes.string,
  onClick: propTypes.func
};

export default Button;
