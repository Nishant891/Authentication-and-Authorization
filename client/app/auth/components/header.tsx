import React from 'react'
interface HeaderProps {
    headerlabel: string;
    titlelabel: string;
  }
const Header = ({headerlabel, titlelabel} : HeaderProps) => {
  return (
    <div className='flex flex-col justify-center items-center gap-y-3'>
        <h1 className='text-3xl font-semibold'>{titlelabel}</h1>
        <p className='text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500'>
            {headerlabel}
        </p>
    </div>
  )
}

export default Header
