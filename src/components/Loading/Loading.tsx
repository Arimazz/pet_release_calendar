import React from 'react';
import RLoading from 'react-loading';

const Loading = () => {
  return (
    <RLoading type='spin' color='blue' className="loading" height={20} width={20}  />
  )
}

export default Loading;