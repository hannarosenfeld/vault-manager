import React, { useState } from 'react';
import {
  Disclosure,
  Menu,
  MenuButton,
} from "@headlessui/react";
import NavDrawer from './NavDrawer';
import NagleeLogo from "../../assets/naglee.png";

export default function NavBar() {
  const [openDrawer, setDrawerOpen] = useState(false);

  return (
    <Disclosure as="nav" className="border-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-4 lg:px-4">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center">
            <img
              alt="Your Company"
              src={NagleeLogo}
              className="w-[3em]"
            />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <div>
                <MenuButton
                  className="flex rounded-full text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                  onClick={() => setDrawerOpen(true)}
                >
                  <span className="sr-only">Open user menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </MenuButton>
              </div>
            </Menu>
          </div>
        </div>
      </div>
      <NavDrawer open={openDrawer} setOpen={setDrawerOpen} />
    </Disclosure>
  );
}