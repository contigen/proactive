export default function Page() {
  return (
    <div className='mb-10'>
      <div className='bg-blue-500 px-20 py-10 text-white rounded-3xl mx-20 my-14 flex items-center justify-evenly'>
        <h1>ProActive.</h1>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='128'
          height='128'
          viewBox='0 0 24 24'
          fill='none'
        >
          <path
            d='M8 2v3M16 2v3M7 11h8M7 15h5M15 22H9c-5 0-6-2.06-6-6.18V9.65c0-4.7 1.67-5.96 5-6.15h8c3.33.18 5 1.45 5 6.15V16'
            stroke='#ffffff'
            stroke-width='1.5'
            stroke-miterlimit='10'
            stroke-linecap='round'
            stroke-linejoin='round'
          ></path>
          <path
            d='m21 16-6 6v-3c0-2 1-3 3-3h3Z'
            stroke='#ffffff'
            stroke-idth='1.5'
            stroke-linecap='round'
            stroke-linejoin='round'
          ></path>
        </svg>
      </div>
      <p className='text-3xl font-[550] tracking-tight w-[50ch] my-8 mx-20'>
        Avoid the mental inertia. Skip the mental gymnastics.
        <br />
        Just{' '}
        <span className='bubble left bg-blue-600 text-white px-2 pb-px'>
          say
        </span>{' '}
        whatever you want to do. Get a Transcript, <br />
        get ready with your tasks set with AI, to kickoff your day & stay{' '}
        <span className='bubble right bg-gray-600 text-white px-2 pb-px'>
          active.
        </span>{' '}
      </p>
    </div>
  )
}
