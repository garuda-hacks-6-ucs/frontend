import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Wallet, X } from "lucide-react";
import { truncate } from "../utils/helper";
import { useConnectModal } from "@xellar/kit";

const Navbar = ({ address }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { open } = useConnectModal();

  return (
    <nav className="bg-white shadow-lg border-b-2 border-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-2xl font-bold text-purple-900">
                  BlocTenderId
                </h1>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex justify-center items-center space-x-8">
              <Link
                to="/"
                className="text-purple-900 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/voting"
                className="text-purple-900 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Voting
              </Link>
              <div className="hidden lg:flex">
                <button
                  onClick={open}
                  className="bg-primary rounded-xl lg:rounded-2xl p-2 duration-200 cursor-pointer hover:scale-105"
                >
                  <div className="flex flex-row items-center bg-purple-900 text-white p-2 rounded-lg">
                    <Wallet className="h-5 w-5 mr-1" />
                    <h1 className="font-bold text-secondary lg:text-sm">
                      {address ? truncate(address, 4, 4, 11) : `Connect Wallet`}
                    </h1>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-purple-900 hover:text-yellow-500 p-2"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-purple-900 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/voting"
                className="text-purple-900 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Voting
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
