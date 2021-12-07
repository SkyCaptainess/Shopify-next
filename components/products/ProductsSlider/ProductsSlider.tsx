import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';

import ArrowLeft from '../../icons/ArrowLeft';
import ArrowRight from '../../icons/ArrowRight';

interface ProductsSliderProps {
  children: React.ReactNode;
  title: React.ReactNode;
}

SwiperCore.use([Pagination, Navigation]);

const ProductsSlider = ({ children, title }: ProductsSliderProps) => {
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        {title}
        <div className="flex items-center">
          <button
            ref={navigationPrevRef}
            className=" bg-white dark:bg-gray-800 text-dark
            rounded-full w-12 h-12
            flex items-center justify-center 
            border
            mr-4
            hover:text-primary hover:border-primary    
            disabled:opacity-50     
            "
          >
            <ArrowLeft />
          </button>

          <button
            ref={navigationNextRef}
            className="bg-white dark:bg-gray-800 text-dark-black bg-opacity-50 
            disabled:opacity-50
            rounded-full
            w-12 h-12
            flex items-center justify-center 
            border    
            hover:text-primary hover:border-primary  
            "
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          425: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        onInit={(swiper) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          swiper.params.navigation.nextEl = navigationNextRef.current;

          if (swiper?.navigation) {
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
      >
        {React.Children.map(children, (child) => (
          <SwiperSlide>{child}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsSlider;
