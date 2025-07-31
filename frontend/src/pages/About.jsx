import React from 'react'
import Title from '../component/Title';
import NewsLetterBox from "../component/NewsLetterBox";
import { assets } from '../assets/assets';

function About() {
  return (
    <div className='w-full px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-t'>
      <div className='text-2xl text-center pt-8 '>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row items-center gap-10 md:gap-16'>
        <img
          src={assets.about_img}
          alt="About Forever"
          className='w-full max-w-md md:max-w-[450px] object-cover rounded-xl shadow-lg'
        />

        <div className='flex flex-col justify-center gap-6 text-gray-600 text-sm sm:text-base md:w-1/2'>
          <p>
            Forever was born out of a passion for innovation and a desire to revolutionize the way people connect with quality products. Our mission is to make premium, thoughtfully crafted items accessible to everyone, without compromise.
          </p>
          <p>
            We believe in combining timeless design with modern convenience, ensuring that each product we offer adds real value to your lifestyle. With every step, we aim to build trust, deliver excellence, and grow with our community.
          </p>
          <div className='flex flex-col gap-3 text-sm sm:text-base text-gray-600'>
            <b className='text-gray-800 text-lg mt-2'>Our Mission</b>
            <p>
              Our mission is to empower individuals by delivering high-quality, thoughtfully designed products that elevate everyday living.
              We strive to blend innovation, accessibility, and trust to build lasting relationships with our customers.
            </p>
          </div>


        </div>
     

      </div>
      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20 gap-6'>
        <div className='border px-6 md:px-12 py-10 sm:py-16 flex-1 flex flex-col gap-4 rounded-md shadow-sm'>
          <b>Quality Assurbnce</b>
          <p className='text-gray-600'>
            We are committed to offering only the highest quality products that meet rigorous standards. Every item goes through strict quality checks to ensure durability, reliability, and user satisfaction.
          </p>
        </div>

        <div className='border px-6 md:px-12 py-10 sm:py-16 flex-1 flex flex-col gap-4 rounded-md shadow-sm'>
          <b>Convenience</b>
          <p className='text-gray-600'>
            We prioritize your time by offering an effortless and intuitive shopping experience. From browsing to checkout, our platform is designed to make your journey seamless and enjoyable.
          </p>
        </div>

        <div className='border px-6 md:px-12 py-10 sm:py-16 flex-1 flex flex-col gap-4 rounded-md shadow-sm'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>
            We believe that every customer interaction matters. Our dedicated support team is always ready to assist you with quick responses, thoughtful solutions, and a human touch.
          </p>
        </div>
        
      </div>
           <NewsLetterBox/>
    </div>
  );
}

export default About;
