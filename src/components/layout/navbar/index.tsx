import type React from "react";
import { Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchModal } from "./search-modal";

const Navbar: React.FC = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  const openSearch = () => setIsSearchActive(true);
  const closeSearch = () => setIsSearchActive(false);

  const menu = [
    { title: "Home", path: "/" },
    { title: "Product", path: "/products" },
  ];

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between px-4 h-18 border-b-1 border-gray-400 lg:px-6 bg-white dark:bg-black shadow-sm">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <div>Mobile Menu</div>
        </Suspense>
      </div>
      <Link
        to={{
          pathname: "/",
        }}
        className="mr-2 items-center justify-center md:w-auto lg:mr-6"
      >
        <div>LOGO</div>
      </Link>
      {menu.length ? (
        <ul className="hidden h-full gap-6 text-lg font-thin md:flex md:items-center">
          {menu.map((item) => (
            <li key={item.title} className="flex h-full items-center hover:border-b-[0.25rem] hover:border-black">
              <Link
                to={{
                  pathname: item.path,
                }}
                className="text-black underline-offset-4 dark:text-neutral-400"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="flex gap-4">
        <Button variant="ghost" size="icon" onClick={openSearch}>
          <Search className="size-5" strokeWidth={1.5}/>
        </Button>
        <Button variant="ghost" size="icon">
          <ShoppingCart className="size-5" strokeWidth={1.5} />
        </Button>
      </div>
      <SearchModal isOpen={isSearchActive} onClose={closeSearch} />
    </nav>
  );
};

export default Navbar;
