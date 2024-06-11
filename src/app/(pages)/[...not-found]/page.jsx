"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex items-center flex-col justify-center md:px-0 h-screen bg-cover bg-center bg-[url('/assets/images/NotFoundL.png')]">
      <h1 className="text-[180px] md:text-[220px] font-bold text-white leading-[240px]">404</h1>
      <p className="text-[40px] text-center leading-[44px] font-semibold w-[345px] md:w-auto px-4 md:px-0">
        Oops.. we don&apos;t have what <br className="hidden md:block"/> you&apos;re{" "}
        <span className="text-[#DC4F13]">looking</span> for
      </p>
      <Link href={"/"}>
        <Button
          className={`bg-[#DC4F13] hover:bg-[#DC4F13] text-white px-20 py-6 mt-6 rounded-xl`}
        >
          Go Home
        </Button>
      </Link>
      <Image
        src={"/assets/images/logo.svg"}
        width={100}
        height={50}
        alt="Jobs3"
        className="mt-16 md:mt-8 mb-8"
      />
    </div>
  );
};

export default Page;
