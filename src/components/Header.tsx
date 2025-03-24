import { createClient } from "@/prismicio";
import NavBar from "./NavBar";

const Header = async () => {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <header>
      <NavBar settings={settings} />
    </header>
  );
};

export default Header;
