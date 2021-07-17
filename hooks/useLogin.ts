import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

export default function useLogin(referer: string) {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const cookies = parseCookies();
  const router = useRouter();

  useEffect(() => {
    if (cookies.user) {
      setIsLoggedin(true);
    } else {
      router.push(`/login?referer=${referer}`);
    }
  }, [cookies.user, cookies, router, referer]);

  return isLoggedin;
}
