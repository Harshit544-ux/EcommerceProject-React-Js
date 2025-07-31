import React from 'react'
import { Link } from 'react-router-dom'
import Title from '../component/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from "../component/NewsLetterBox";

function Contact() {
  return (
    <div className='w-full px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-t'>
      {/* Heading */}
      <div className='text-center text-2xl pt-10'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Contact Section */}
      <div className='my-10 flex flex-col md:flex-row items-center gap-10 mb-28'>
        {/* Image */}
        <img
          src={assets.contact_img}
          alt="Contact Us"
          className='w-full md:max-w-[480px] object-cover  shadow-md'
        />

        {/* Contact Info */}
        <div className='flex flex-col justify-center items-start gap-4 text-sm sm:text-base text-gray-600 md:w-1/2'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'> 123 Main Street, Sector 21, New Delhi, India - 110001</p>
          <p className='text-gray-500'> Phone: +91 98765 43210</p>
          <p className='text-gray-500'> Email: support@foreverstore.com</p>
          <p className='text-gray-500'> Working Hours: Mon - Sat: 9:00 AM - 8:00 PM</p>
          <p>
            Have questions? Need help with your order? Reach out to us anytime — we’re here to support you!
          </p>

          {/* Explore Jobs Button */}
          <Link
            to="/careers" // change this path as per your route
            className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 mt-4'
          >
            Explore Jobs
          </Link>
        </div>
      </div>
        <NewsLetterBox/>
    </div>
  )
}

export default Contact;
