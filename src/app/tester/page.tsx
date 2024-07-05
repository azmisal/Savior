import React from 'react';
import SpinLoader from '../Components/SpinLoader';

export default function Page() {
  return (
    <div className='flex fixed top-0 bg-custom-gradient	left-0 items-center justify-center w-screen h-screen'>
      <SpinLoader />
    </div>
  );
}
