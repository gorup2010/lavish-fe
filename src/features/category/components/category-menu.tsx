import type React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { CategoryList } from "./category-list";
import { useState } from "react";

export const CategoryMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 px-3 py-2 text-md font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          Categories
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[800px] p-2">
        <CategoryList setIsOpen={setIsOpen}/>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
