"use client";

import { useAuthStore } from "@/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { revalidateToken } from "@/helper/revalidateToken";

const layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state._xnjdkk);

  useEffect(() => {
    if (!isLoggedIn) router.push("/auth/login");
  }, [isLoggedIn]);
  if (!isLoggedIn) return <div></div>;
  return <>{children}</>;
};

export default layout;
