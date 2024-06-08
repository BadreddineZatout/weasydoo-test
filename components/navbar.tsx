"use client";
import React from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";

import { useAppDispatch, useAppSelector } from "@/config/hooks";
import { logout } from "@/app/store/user";

export function Navbar() {
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          <NavbarItem>
            <Button as={Link} href="/">
              Home
            </Button>
          </NavbarItem>
          {token ? (
            <NavbarItem>
              <Button onClick={handleLogout}>Logout</Button>
            </NavbarItem>
          ) : (
            <NavbarItem>
              <Button as={Link} href="/login">
                Login
              </Button>
            </NavbarItem>
          )}
        </ul>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <NavbarMenuItem>
            <Button as={Link} href="/">
              Home
            </Button>
          </NavbarMenuItem>
          {token ? (
            <NavbarMenuItem>
              <Button onClick={handleLogout}>Logout</Button>
            </NavbarMenuItem>
          ) : (
            <NavbarMenuItem>
              <Button as={Link} href="/login">
                Login
              </Button>
            </NavbarMenuItem>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
}
