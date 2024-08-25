
import React from 'react';
import style from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-95 z-50`}>
      <div className={`relative flex space-x-3`}>
        <div className={`${style['w-4']} ${style['h-4']} ${style['bg-white']} ${style['rounded-full']} ${style['animate-bounce']}`}></div>
        <div className={`${style['w-4']} ${style['h-4']} ${style['bg-white']} ${style['rounded-full']} ${style['animate-bounce']} ${style['delay-200']}`}></div>
        <div className={`${style['w-4']} ${style['h-4']} ${style['bg-white']} ${style['rounded-full']} ${style['animate-bounce']} ${style['delay-400']}`}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

