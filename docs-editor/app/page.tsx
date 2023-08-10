"use client";

import Button from "@/components/common/Button";
import HomeHeader from "@/components/header/HomeHeader";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const isUserLoggedIn: boolean = useAuthStore((state) => state._xnjdkk);
  const router = useRouter();

  const goToDocumentPage = () => {
    if (!isUserLoggedIn) return router.push("/auth/login");
    router.push(`/document`);
  };

  return (
    <main className="h-screen">
      <HomeHeader />

      <section className="md:py-28 py-14">
        <div className="md:max-w-5xl mx-2 md:mx-auto ">
          <h1 className="tracking-wide mb-6 text-texttitle font-normal text-4xl md:text-6xl text-center">
            Build your best ideas together, in Prosper Docs
          </h1>
          <p className="text-textcolor text-center text-xl md:text-2xl">
            Create and collaborate on online documents in real-time and from any
            device.
          </p>
        </div>

        <div className="flex justify-center mt-8 px-4 items-center">
          <div className="flex md:space-x-4 md:flex-row flex-col md:space-y-0 space-y-3 w-full md:w-80 items-center">
            <Button
              onClick={() => router.push("/auth/register")}
              text="Get Started"
            />
            <Button onClick={goToDocumentPage} outline text="Go to Docs" />
          </div>
        </div>

        <div className="flex space-x-4 mt-10 justify-center items-center">
          <p>Dont have an account? </p>
          <Link href={"/auth/register"}>
            <p className="text-primary cursor-pointer hover:text-primary/60">
              Sign up{" "}
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
