function NewsLetterBox() {
    const onSubmitHandler = (e) => {
        e.preventDefault();
    }
    return (
        <div className='text-center'>
            <div className='text-2xl font-medium text-gray-800'>
                Subscribe  now and get 10% off on your first order!
            </div>
            <p className='text-gray-400 mt-3'>Join our mailing list to receive exclusive deals, product updates, and special offers delivered straight to your inbox.</p>
            <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 justify-center mx-auto my-6 border pl-3'>
                <input type="email" placeholder='Enter your email' className='w-full sm:flex-2 outline-none' />
                <button className='bg-black text-white text-xs px-10 py-4'>Subscribe</button>
            </form>
        </div>
    )
}

export default NewsLetterBox