"use client";

import * as React from "react";
import { MonitorSmartphoneIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/atoms/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/DropdownMenu";

export function ThemeToggleButton() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme("light")}
        >
          <Sun className="h-[16px] w-[16px] mr-2" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme("dark")}
        >
          <Moon className="h-[16px] w-[16px] mr-2" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme("system")}
        >
          <MonitorSmartphoneIcon className="h-[16px] w-[16px] mr-2" />
          Device
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
