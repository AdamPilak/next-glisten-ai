import { createClient } from "@/prismicio";
import WordMark from "./WordMark";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";

const Footer = async () => {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <footer className="flex flex-col items-center justify-between gap-6 border-t border-slate-600 px-8 py-7 md:flex-row">
      <Link href="/">
        <WordMark />
        <span className="sr-only">Glisten.ai Home Page</span>
      </Link>
      <nav aria-label="Footer">
        <ul className="flex gap-6">
          {settings.data.navigation.map((setting) => (
            <li key={setting.label}>
              <PrismicNextLink
                className="inline-flex min-h-11 items-center"
                field={setting.link}
              >
                {setting.label}
              </PrismicNextLink>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
