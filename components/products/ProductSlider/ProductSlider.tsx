import React, { useRef } from 'react';
import Image from 'next/image';
import ArrowLeft from '../../icons/ArrowLeft';
import ArrowRight from '../../icons/ArrowRight';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  images: any;
  onSelectImage(image: any): void;
  activeImage: any;
}

SwiperCore.use([Navigation]);

const ProductSlider = ({ images = [], activeImage, onSelectImage }: Props) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <div className='mt-2 relative'>
      <button
        ref={navigationPrevRef}
        className='absolute left-0 z-10 p-2 top-1/2 transform 
            -translate-y-1/2 bg-black bg-opacity-50 text-white
            disabled:opacity-50
            '
      >
        <ArrowLeft />
      </button>

      <button
        ref={navigationNextRef}
        className='absolute right-0 z-10 p-2 top-1/2 transform 
            -translate-y-1/2 bg-black bg-opacity-50 text-white
            disabled:opacity-50
            '
      >
        <ArrowRight />
      </button>

      <div>
        <Swiper
          spaceBetween={10}
          slidesPerView={5}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onSwiper={(swiper) => {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;

            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <div onClick={() => onSelectImage(image)} role='button'>
                <div className='relative'>
                  <div
                    className={`absolute top-0 left-0 bottom-0 right-0 z-10 w-full h-full ${
                      activeImage.id === image.id
                        ? 'border-red-500 border-2'
                        : 'border'
                    }`}
                  />
                  <div className='relative' style={{ paddingTop: '100%' }}>
                    <div className='w-full h-full absolute top-0 left-0'>
                      <Image
                        src={image.src}
                        alt={image.alt || 'Product image'}
                        layout='fill'
                        objectFit='cover'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductSlider;
