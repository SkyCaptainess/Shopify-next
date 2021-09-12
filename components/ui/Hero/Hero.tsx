import React from 'react';
import Image from 'next/image';

const Hero = ({ imageSrc, alt }) => {
  return (
    <div className='w-screen relative'>
      <img src={imageSrc} alt={alt} className='w-full h-full object-cover' />
      <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-700'>
        <div className='container mx-auto'>
          <h2 className='text-4xl mb-4 font-semibold'>
            Lorem ipsum dolor imet
          </h2>
          <p className='text-xl mb-10'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            officiis quod atque pariatur sapiente illum{' '}
          </p>
          <button className='px-10 py-3 bg-white text-gray-800 text-lg shadow-sm'>
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
