import React from 'react'

const TopNavbar = () => {
    const scollTextStyle = 'text-white lg:text-lg md:text-sm sm:text-[10px] xs:text-[7px] text-[5px]'
  return (
    <div className='w-full bg-black md:h-12 h-8  overflow-hidden flex items-center justify-evenly text-sm'>
      <div className='flex animate-scroll w-[200vw]'>
        <div className='flex w-screen w-full justify-evenly whitespace-nowrap'>
          <p className={scollTextStyle}> Luxury Fragrance that stays with you all day.</p>
          <p className={scollTextStyle}>25% Discounts on all products</p>
          <p className={scollTextStyle}>Long  lasting elegance</p>
          <p className={scollTextStyle}>1 week easy return policy</p>
        </div>
        <div className='flex w-screen w-full justify-evenly whitespace-nowrap'>
          <p className={scollTextStyle}> Luxury Fragrance that stays with you all day.</p>
          <p className={scollTextStyle}>25% Discounts on all products</p>
          <p className={scollTextStyle}>Long  lasting elegance</p>
          <p className={scollTextStyle}>1 week easy return policy</p>
        </div>
      </div>
    </div>
  )
}

export default TopNavbar