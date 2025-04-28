import type React from "react";
import { ChangeEvent, KeyboardEvent, Suspense, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import AccountMenu from "./account-menu";
import { Input } from "@/components/ui/input";
import { CategoryMenu } from "@/features/category/components/category-menu";

const Navbar: React.FC = () => {

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      navigate(`/search?name=${inputValue}`);
      setInputValue('');
    }
  };

  return (
    <nav className="sticky top-0 z-30 flex items-center justify-between px-4 h-20 border-b-1 border-gray-400 lg:px-6 bg-white dark:bg-black shadow-sm">
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
        <div className="text-2xl">Lavish</div>
      </Link>
      <CategoryMenu />
      <Input
        className="w-full mx-30 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-4"
        placeholder="Search products..."
        autoFocus
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <div className="flex gap-4">
        <Button variant="ghost" size="icon">
          <ShoppingCart className="size-5" strokeWidth={1.5} />
        </Button>
        <AccountMenu />
      </div>
    </nav>
  );
};

export default Navbar;
