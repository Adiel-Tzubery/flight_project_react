import React, { useEffect, useState } from 'react'

import { isLoggedIn } from './utils'
import { default as logoutRequest } from '../api/auth/logout'

import { http } from '../api/index'

import { Link, redirect } from 'react-router-dom'

import { useStoreState } from 'easy-peasy'
import { useStoreActions } from 'easy-peasy'

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from '@material-tailwind/react'
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
  UserPlusIcon,
  UserIcon,
} from '@heroicons/react/24/outline'



// set profile dropdown menu
function ProfileMenu() {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = () => setIsMenuOpen(false)

  // user data is in global state (redux, easy-peasy)
  const setUserData = useStoreActions((action) => action.user.setUserData)

  const logOut = async () => {
    console.debug('logOut function invoked')

    // api logout request
    const response = await logoutRequest(localStorage.getItem('refresh_token'))
    console.debug('response:', response)

    // Delete tokens from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

    // delete user data from global storage
    setUserData(null)

    // delete auth header from http client     @@@@ do i really need that?
    delete http.defaults.headers['Authorization']

    // redirect to root page
    return redirect('/')
  }

  // profile menu component
  const profileMenuItems = [
    {
      label: 'My Profile',
      icon: UserCircleIcon,
      onClick: '#',
    },
    {
      label: 'Edit Profile',
      icon: Cog6ToothIcon,
      onClick: '#',
    },
    {
      label: 'Inbox',
      icon: InboxArrowDownIcon,
      onClick: '#',
    },
    {
      label: 'Help',
      icon: LifebuoyIcon,
      onClick: '#',
    },
    {
      label: 'Sign Out',
      icon: PowerIcon,
      onClick: logOut,
    },
  ]
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          {/* add if statement for avatar piq */}
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-blue-500 p-0.5"
            src={`https://api.dicebear.com/6.x/bottts-neutral/svg`} // it'll be, don't worry
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? 'rotate-180' : ''
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon: Icon, onClick }, key) => {
          const isLastItem = key === profileMenuItems.length - 1
          return (
            <MenuItem
              key={label}
              onClick={() => {
                closeMenu()
                onClick()
              }}
              className={`flex items-center gap-2 rounded ${
                isLastItem ? 'last-item' : ''
              }`}
            >
              {React.createElement(Icon, {
                className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? 'red' : 'inherit'}
              >
                {label}
              </Typography>
            </MenuItem>
          )
        })}
      </MenuList>
    </Menu>
  )
}

// nav list menu
const navListMenuItems = [
  {
    title: '@material-tailwind/html',
    description:
      'Learn how to use @material-tailwind/html, packed with rich components and widgets.',
  },
  {
    title: '@material-tailwind/react',
    description:
      'Learn how to use @material-tailwind/react, packed with rich components for React.',
  },
  {
    title: 'Material Tailwind PRO',
    description:
      'A complete set of UI Elements for building faster websites in less time.',
  },
]

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const triggers = {
    onMouseEnter: () => setIsMenuOpen(true),
    onMouseLeave: () => setIsMenuOpen(false),
  }

  const renderItems = navListMenuItems.map(({ title, description }) => (
    <a href="#" key={title}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {description}
        </Typography>
      </MenuItem>
    </a>
  ))

  return (
    <React.Fragment>
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem
              {...triggers}
              className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full"
            >
              <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{' '}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList
          {...triggers}
          className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid"
        >
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{' '}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
    </React.Fragment>
  )
}

// nav list component
const navListItems = [
  {
    label: 'Account',
    icon: UserCircleIcon,
  },
  {
    label: 'Blocks',
    icon: CubeTransparentIcon,
  },
  {
    label: 'Docs',
    icon: CodeBracketSquareIcon,
  },
]

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu />
      {navListItems.map(({ label, icon }, key) => (
        <Typography
          key={label}
          as="a"
          href="#"
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: 'h-[18px] w-[18px]' })}{' '}
            {label}
          </MenuItem>
        </Typography>
      ))}
    </ul>
  )
}

export default function ComplexNavbar() {
  // use global state
  const userData = useStoreState((state) => state?.user?.data || null)

  const [isNavOpen, setIsNavOpen] = React.useState(false)
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur)

  // adjust navbar size
  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    )
  }, [])

  useEffect(() => {})

  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Material Tailwind
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>

        {isLoggedIn() ? (
          <ProfileMenu />
        ) : (
          <div className="absolute right-4 flex">
            <Link to={'/login'}>
              <Typography
                key="Register"
                as="a"
                href="#"
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                <MenuItem className="flex items-center gap-2 lg:rounded-full">
                  {React.createElement(UserIcon, {
                    className: 'h-[18px] w-[18px]',
                  })}{' '}
                  login
                </MenuItem>
              </Typography>
            </Link>

            <Link to={'/register-customer'}>
              <Typography
                key={'register'}
                as="a"
                href="#"
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                <MenuItem className="flex items-center gap-2 lg:rounded-full">
                  {React.createElement(UserPlusIcon, {
                    className: 'h-[18px] w-[18px]',
                  })}{' '}
                  Register
                </MenuItem>
              </Typography>
            </Link>
          </div>
        )}
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  )
}
