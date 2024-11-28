"use client";

import { Button } from "./button";

interface HeaderProps {}

const Header = () => {

  return (
    <header id="header" className="sticky z-50 top-0 w-full p-4">
      <div className="bg-background/50 backdrop-blur-lg p-4 rounded-2xl overflow-hidden">
        header
      </div>
    </header>
  );
};

export default Header;
