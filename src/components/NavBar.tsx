"use client";

import { asLink, Content } from "@prismicio/client";
import Link from "next/link";
import { PrismicNextLink } from "@prismicio/next";

import WordMark from "./WordMark";
import ButtonLink from "./ButtonLink";
import { MdClose, MdMenu } from "react-icons/md";
import { useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type NavBarProps = {
  settings: Content.SettingsDocument;
};

const NavBar = ({ settings }: NavBarProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="p-4 md:p-6" aria-label="Main">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <Link href="/" className="z-50" onClick={() => setOpen(false)}>
            <WordMark />
            <span className="sr-only">Glisten.ai Home Page</span>
          </Link>
          <button
            aria-expanded={open}
            onClick={() => setOpen(true)}
            type="button"
            className="block p-2 text-3xl text-white md:hidden"
          >
            <MdMenu />
            <span className="sr-only">Open menu</span>
          </button>
        </div>

        {/* Mobile Nav */}

        <div
          className={clsx(
            "fixed top-0 right-0 bottom-0 left-0 z-40 flex flex-col items-end gap-4 bg-[#070815] pt-14 pr-4 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden",
            open ? "translate-x-0" : "translate-x-[100%]",
          )}
        >
          <button
            aria-expanded={open}
            onClick={() => setOpen(false)}
            type="button"
            className="fixed top-4 right-4 mb-4 block p-2 text-3xl text-white md:hidden"
          >
            <MdClose />
            <span className="sr-only">Close menu</span>
          </button>

          <div className="grid justify-items-end gap-8">
            {settings.data.navigation.map((item) => {
              if (item.cta_button)
                return (
                  <ButtonLink
                    key={item.label}
                    field={item.link}
                    onClick={() => setOpen(false)}
                    aria-current={
                      pathname.includes(asLink(item.link) as string)
                        ? "page"
                        : undefined
                    }
                  >
                    {item.label}
                  </ButtonLink>
                );
              return (
                <PrismicNextLink
                  key={item.label}
                  className="block px-3 text-3xl first:mt-8"
                  field={item.link}
                  onClick={() => setOpen(false)}
                  aria-current={
                    pathname.includes(asLink(item.link) as string)
                      ? "page"
                      : undefined
                  }
                >
                  {item.label}
                </PrismicNextLink>
              );
            })}
          </div>
        </div>

        {/* Desktop Nav */}

        <ul className="hidden gap-6 md:flex">
          {settings.data.navigation.map((setting) => {
            if (setting.cta_button) {
              return (
                <li key={setting.label}>
                  <ButtonLink
                    field={setting.link}
                    aria-current={
                      pathname.includes(asLink(setting.link) as string)
                        ? "page"
                        : undefined
                    }
                  >
                    {setting.label}
                  </ButtonLink>
                </li>
              );
            }

            return (
              <li key={setting.label}>
                <PrismicNextLink
                  className="inline-flex min-h-11 items-center"
                  field={setting.link}
                  aria-current={
                    pathname.includes(asLink(setting.link) as string)
                      ? "page"
                      : undefined
                  }
                >
                  {setting.label}
                </PrismicNextLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
