import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/use-logout";
import { useAuth } from "@/providers/AuthProvider";
import { Loader2, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AccountMenu() {
  const navigate = useNavigate();
  const { logout, isPending } = useLogout();
  const { auth } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon">
          <User className="size-5" strokeWidth={1.5} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        {
          auth?.roles.includes("ADMIN") && (
            <DropdownMenuItem onClick={() => navigate("/admin/users")}>
              Admin
            </DropdownMenuItem>
          )
        }
        <DropdownMenuSeparator />
        {auth?.username !== undefined ? (
          <DropdownMenuItem disabled={isPending} onClick={() => logout()}>
            {isPending && <Loader2 className="animate-spin" />} Log Out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => navigate("/admin/users")}>
            Log In
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
