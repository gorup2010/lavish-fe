import type React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  // Sample trending keywords - replace with your actual data
  const trendingKeywords = ["T-Shirts", "Hoodies", "Jeans", "Dresses", "Jackets", "Shoes", "Accessories", "Sale"]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] p-0 gap-0">
        <div className="flex items-center p-4 border-b">
          <Search className="h-5 w-5 text-muted-foreground mr-2" />
          <Input
            className="flex-1 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 pl-0"
            placeholder="Search products..."
            autoFocus
          />
        </div>

        <div className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Trending keywords today</h3>
          <div className="flex flex-wrap gap-2">
            {trendingKeywords.map((keyword) => (
              <Button key={keyword} variant="outline" className="rounded-full text-sm h-8">
                {keyword}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

