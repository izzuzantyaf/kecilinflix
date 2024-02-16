import GithubButton from "@/components/atoms/GithubButton";
import { ThemeToggleButton } from "@/components/atoms/ThemeToggleButton";
import Link from "next/link";

export function Navbar() {
  return (
    <div className="navbar sticky left-0 right-0 top-0 backdrop-blur-lg bg-opacity-60 dark:bg-opacity-5 bg-white z-10">
      <div className="h-[56px] px-[16px] flex gap-[8px] items-center max-w-screen-xl mx-auto">
        <Link href="/">
          <div className="brand shrink-0 font-bold text-2xl text-red-600">
            Kecilinflix
          </div>
        </Link>
        <div className="flex-grow"></div>
        <GithubButton />
        <ThemeToggleButton />
      </div>
    </div>
  );
}
