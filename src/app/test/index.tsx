import { Button } from "@/components/ui/button";
import { useX } from "@/boilerplate/mutation";import { logout, refreshToken, test } from "@/lib/auth";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";

function Test() {
  const authContext = useAuth();
  const x = useX();
  const [res, setRes] = useState("EMPTY");

  const handle = () => {
    const re = x.mutate({userId: 1});
  }

  const refresh = async () => {
    const response = await refreshToken();
    console.log(response);
  }

  const testHandle = async () => {
    const response = await test();
    console.log(response);
  }

  const handleLogout = async () => {
    const response = await logout();
    console.log(response);
    authContext.setAuth(undefined);
  }

  return (
    <div className="min-h-svh">
      <Button onClick={handle}>HIII</Button>
      <div>{res}</div>
      <Button onClick={refresh}>REFRESH</Button>
      <Button onClick={testHandle}>TEST</Button>
      <Button onClick={handleLogout}>LOGOUT</Button>
    </div>
  );
}

export default Test;
