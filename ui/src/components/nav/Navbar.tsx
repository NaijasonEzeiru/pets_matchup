'use client';

import Link from 'next/link';
import { useState } from 'react';
import Dropdown from './DropDown';
import { useSession, signOut } from 'next-auth/react';

const NavBar = () => {
  const [ham, setHam] = useState(false);
  const session = useSession();

  //   useEffect(() => {
  //     function handleClickOutsideModal(event) {
  //       if (navRef.current && !navRef.current.contains(event.target)) {
  //         setHam(false);
  //       }
  //     }
  //     document.addEventListener('mousedown', handleClickOutsideModal);
  //     return () => {
  //       document.removeEventListener('mousedown', handleClickOutsideModal);
  //     };
  //   }, [navRef]);

  return (
    <header
      // ref={navRef}
      className='bg-secondaryBg flex items-center justify-between px-3 text-sm py-2 md:py-1 md:px-14 lg:px-32 text-primaryText'>
      <Link
        href={'/'}
        className='flex gap-1 md:px-2 md:py-1 md:rounded-lg bg-primaryBg rounded-full md:bg-white items-center md:hover:bg-slate-200 text-black'>
        <svg
          width='32'
          height='32'
          viewBox='0 0 32 32'
          className='text-primaryText md:text-black'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M9.20344 16.1751C9.37974 15.7495 9.63814 15.3628 9.96389 15.037C10.2896 14.7113 10.6764 14.4529 11.102 14.2766C11.5276 14.1003 11.9838 14.0095 12.4445 14.0095C12.9051 14.0095 13.3613 14.1003 13.7869 14.2766C14.2125 14.4529 14.5993 14.7113 14.925 15.037L15.9525 16.0645L16.9799 15.037C17.6378 14.3791 18.5301 14.0095 19.4605 14.0095C20.3909 14.0095 21.2832 14.3791 21.9411 15.037C22.599 15.6949 22.9685 16.5872 22.9685 17.5176C22.9685 18.448 22.599 19.3403 21.9411 19.9981L15.9525 25.9867L9.96389 19.9981C9.63814 19.6724 9.37974 19.2857 9.20344 18.8601C9.02714 18.4344 8.9364 17.9783 8.9364 17.5176C8.9364 17.0569 9.02714 16.6007 9.20344 16.1751Z'
            stroke='currentColor'
            strokeWidth='1.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <circle
            cx='13.2933'
            cy='8.58939'
            r='1.91173'
            stroke='currentColor'
            strokeWidth='1.4'
          />
          <circle
            cx='19.6564'
            cy='8.58939'
            r='1.91173'
            stroke='currentColor'
            strokeWidth='1.4'
          />
          <circle
            cx='7.3101'
            cy='11.6788'
            r='1.91173'
            stroke='currentColor'
            strokeWidth='1.4'
          />
          <circle
            cx='25.3548'
            cy='11.6788'
            r='1.91173'
            stroke='currentColor'
            strokeWidth='1.4'
          />
          <rect
            x='1.05421'
            y='1.14918'
            width='29.8916'
            height='29.8916'
            rx='14.9458'
            stroke='currentColor'
            strokeWidth='1.4'
          />
        </svg>
        <i className='hidden md:block'>PetsMatchUp</i>
      </Link>
      <nav
        className={`flex gap-2 md:gap-1 w-full left-0 absolute transition-transform z-50 bg-secondaryBg flex-col py-8 px-2 top-11 md:w-auto md:static md:bg-transparent md:flex-row md:translate-x-0 md:py-0 ${
          !ham && 'transition-transform -translate-x-full'
        }`}>
        <Dropdown
          value={'Categories'}
          content={['Dogs', 'Cats']}
          tab={+ham - 1}
        />
        <hr className='dark:opacity-30' />
        <Link href='#'>
          <p className='table px-3 w-full cursor-pointer'>Pets For Sale</p>
        </Link>
        <hr className='dark:opacity-30' />
        <Link href='#'>
          <p className='table px-3 w-full cursor-pointer'>Blog</p>
        </Link>
        <hr className='dark:opacity-30' />
        <Link href='/dashboard'>
          <p className='table px-3 w-full cursor-pointer'>Dashboard</p>
        </Link>
      </nav>

      {/* <Link href={'/profile'} className='text-inherit contents '> */}
      <button
        id='user'
        className='group relative cursor-pointer p-1 rounded-full border-solid border-[1px] border-primaryText md:hidden bg-primaryBg'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
          />
        </svg>
        {/* <span className='hidden group-focus:block group-hover:block bg-secondary text-white rounded-[4px] py-[1px] px-[3px] text-xs text-center z-50 absolute top-[110%] -left-1 dark:bg-white dark:text-black after:content-[""] after:absolute after:bottom-full after:left-[40%] after:-ml[5px] after:border-[5px] after:border-solid after:border-b-secondary after:border-x-transparent after:border-t-transparent dark:after:border-b-white'>
          Profile
        </span> */}
      </button>
      <button
        tabIndex={0}
        className={
          'group border-[1px] border-primaryText py-3 px-2 relative bg-primaryBg shadow-md md:hidden rounded-lg'
        }
        onClick={() => setHam(!ham)}>
        <span
          className={`relative h-[2px] block w-5 bg-primaryText before:absolute before:top-[-6px] before:left-0 before:h-[2px] before:w-full before:bg-primaryText before:content-[""] before:transition-transform after:absolute after:top-[6px] after:left-0 after:h-[2px] after:w-full after:bg-primaryText after:content-[""] after:transition-transform  ${
            ham &&
            'duration-1000 before:-rotate-45 after:rotate-45 before:-translate-x-[5px] before:translate-y-[1px] before:transition-transform after:-translate-x-[5px] after:-translate-y-[1px] after:scale-x-75 before:scale-x-75 after:transition-transform'
          }`}></span>
        {/* <span className='hidden group-focus:block group-hover:block bg-secondary text-white rounded-[4px] py-[1px] px-[3px] text-xs text-center z-50 absolute top-[110%] left-0 dark:bg-white dark:text-black after:content-[""] after:absolute after:bottom-full after:left-[40%] after:-ml[5px] after:border-[5px] after:border-solid after:border-b-secondary after:border-x-transparent after:border-t-transparent dark:after:border-b-white'>
          Menu
        </span> */}
      </button>
      <input
        type='search'
        placeholder='Search'
        className='rounded-lg px-1 hidden md:block w-32'
      />
    </header>
  );
};

export default NavBar;
