import { useState } from 'react'
import { Link } from 'react-router-dom'

export function Header({ toggleChannelsBoard }) {
  const [nav, setNav] = useState(false)

  return (
    <header>
      <nav className='bg-black text-white px-4 lg:px-6 py-2.5 shadow'>
        <div className='flex justify-between items-center mx-auto max-w-screen-lg'>
          <span className='self-center text-xl font-semibold whitespace-nowrap'>
            Logo
          </span>

          <div className='flex items-center md:hidden'>
            <button onClick={toggleChannelsBoard} className='mr-4'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16m-7 6h7'
                ></path>
              </svg>
            </button>
            <button onClick={() => setNav(!nav)}>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16m-7 6h7'
                ></path>
              </svg>
            </button>
          </div>

          <div
            className={`flex-col md:flex md:flex-row items-center w-full md:w-auto transition-all duration-300 ${
              nav ? 'block' : 'hidden'
            } md:block`}
          >
            <Link
              to='/login'
              className='block py-2 pr-4 pl-3 text-white md:p-0'
            >
              Log In
            </Link>
            <Link
              to='/signup'
              className='block py-2 pr-4 pl-3 text-white md:p-0'
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
