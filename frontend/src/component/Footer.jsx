import { assets } from '../assets/assets'

function Footer() {
  return (
    <div className='px-6 sm:px-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div className='ml-2 '>
          <img src={assets.logo} alt='logo' className='mb-5 w-32 ' />
          <p className='w-full md:w-2/3 text-gray-600'>
            We are committed to providing high-quality products and excellent customer service. 
            Shop with confidence and enjoy fast, reliable delivery.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Made by : Harshit Srivastava</li>
            <li>+91 7800022658</li>
            <li>harshitsri08@gmail.com</li>
            <li>Hyderabad , India</li>
          </ul>
        </div>
      </div>

      <hr />
      <p className='py-5 text-sm text-center'>Copyright © 2025 forever.com All rights reserved.</p>
    </div>
  )
}

export default Footer
