import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-8 place-content-evenly'>
      <NavLink
      to='/'
      className={({isActive}) => isActive? "text-blue-700 text-3xl ":" text-3xl"}
      >
        Home
      </NavLink>

      <NavLink
      to='/pastes'
      className={({isActive})=>isActive? "text-blue-700 text-3xl ":" text-3xl"}
      >
        Pastes
      </NavLink>
    </div>
  )
}

export default Navbar
