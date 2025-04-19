import type React from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

// Sample category data - replace with your actual categories
const categories = [
  { id: 1, name: "Electronics", image: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Clothing", image: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Home & Kitchen", image: "/placeholder.svg?height=100&width=100" },
  { id: 4, name: "Beauty", image: "/placeholder.svg?height=100&width=100" },
  { id: 5, name: "Sports", image: "/placeholder.svg?height=100&width=100" },
  { id: 6, name: "Books", image: "/placeholder.svg?height=100&width=100" },
]

export const CategoryMenu: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 px-3 py-2 text-md font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          Categories
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[400px] p-2">
        <div className="grid grid-cols-3 gap-2">
          {categories.map((category) => (
            <DropdownMenuItem key={category.id} className="p-0 focus:bg-transparent">
              <div className="w-full cursor-pointer rounded-md overflow-hidden hover:opacity-90 transition-opacity">
                <div
                  className="relative aspect-square w-full"
                  style={{
                    backgroundImage: `url(${category.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">{category.name}</span>
                  </div>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
