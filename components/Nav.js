import en from '../data/en.json'
import { navLinks } from '../data/data'

import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const HamburgerIcon = () => {
  return (
    <svg
      width="38"
      height="27"
      viewBox="0 0 38 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 1.50001L38 1.5M0 13.5L38 13.5M0 25.5L38 25.5"
        stroke="#C65833"
        strokeWidth="3"
      />
    </svg>
  )
}

const ExitIcon = () => {
  return (
    <svg
      width="30"
      height="31"
      viewBox="0 0 30 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.06889 1.94766L28.7284 29.0266M1.81128 28.9311L28.8902 2.2716"
        stroke="#C65833"
        stroke-width="3"
      />
    </svg>
  )
}

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const hamburgerRef = useRef(null)
  const location = useLocation()

  console.log(location.pathname)

  //   const [currentUR]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !hamburgerRef.current.contains(event.target) &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = ''
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.documentElement.style.overflow = ''
    }
  }, [isOpen])

  //   useEffect(() => {
  //     console.log(location.pathname)
  //   }, [location])

  return (
    <div>
      <div className="fixed right-2 top-2 z-50 lg:hidden">
        <button
          onClick={() => {
            setIsOpen((prevState) => !prevState)
          }}
          aria-label={en.global.navAccessibility}
          ref={hamburgerRef}
          className="p-4"
        >
          {isOpen ? <ExitIcon /> : <HamburgerIcon />}
        </button>
        {/* Mobile Nav */}
        <nav
          ref={menuRef}
          className={`mobile-nav-container ${isOpen ? 'block' : 'hidden'}`}
        >
          <div className="m-6">
            <div className="w-[85px]">
              <img src="/nav_katman.svg" alt="" />
            </div>
            <div className="my-6">
              <ul>
                {navLinks.map((navLink) => (
                  <li key={navLink.title} className="mb-6 last:mx-0">
                    <a
                      href={navLink.url}
                      className={`border-b-2 border-transparent font-butlerSemibold text-2xl`}
                      onClick={() => {
                        setIsOpen(false)
                        // ${activeLink === navLink.title ? 'border-pink' : ''}
                      }}
                    >
                      {navLink.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      {/* Desktop Nav */}
      <div className="hidden lg:block">
        <nav className="flex justify-center md:justify-end">
          <ul className="flex">
            {navLinks.map((navLink) => (
              <li
                key={navLink.title}
                className="mr-4 border-b-2 border-transparent font-butlerSemibold text-xl last:mx-0 hover:border-orange"
              >
                <a href={navLink.url}>{navLink.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Nav
