import React from 'react';

interface HeroProps {
  children: React.ReactNode;
  image: string;
}

const Hero = ({ children, image }: HeroProps) => {
  return (
    <div className="w-full relative h-80 lg:h-96">
      <div
        style={{
          backgroundImage: `url(${image})`,
        }}
        className="w-full h-full absolute top-0 left-0 z-10 bg-cover bg-no-repeat"
      />
      <div className="absolute z-20 top-0 left-0 w-full h-full flex items-center justify-center text-gray-700">
        <div className="container mt-2 mx-auto p-4 lg:p-0">{children}</div>
      </div>
    </div>
  );
};

export default Hero;
