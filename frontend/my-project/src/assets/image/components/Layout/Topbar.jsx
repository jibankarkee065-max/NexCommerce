import React from 'react'
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine} from "react-icons/ri";
import { FaFacebook} from "react-icons/fa";
 
const Topbar = () => {
  return (
    <div className='bg-[#ea2e0e] text-white'>

        <div className="container mx-auto  flex justify-between items-center py-3 px-4">

            <div className="  flex items-center space-x-4">

            <a href="#" className='hover:text-gray-300'>
                <TbBrandMeta className="h-5 w-5 m-2"/>
            </a>

             <a href="#" className='hover:text-gray-300'>
                <RiTwitterXLine className="h-5 w-5 m-2"/>
            </a>

             <a href="#" className='hover:text-gray-300'>
                <IoLogoInstagram className="h-5 w-5 m-2"/>
            </a>

             <a href="#" className='hover:text-gray-300'>
                <FaFacebook className="h-5 w-5 m-2"/>
            </a>

        </div>

        <div className='text-sm text-center'>
            <span>We ship worldwild - Fast and reliable Shipping!</span>
        </div>

        <div className='text-sm'>
            <a href="tel:+1234567890" className="hover:text-gra-300">
                +977 98765-09172
            </a>

        </div>

        </div>
    </div>
  )
}

export default Topbar;