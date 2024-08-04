import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FaEllipsis, FaUser } from "react-icons/fa6";
import NavBarLink from "@/components/NavBarLink";
import { getSession } from "@/libs/auth";
import LogoutBtn from "@/components/LogoutBtn";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Color Alchemy",
  description: "color alchemy provides color palettes created by users for free and share with others. Enjoy!",
  keywords: ["color", "palette", "generator", "randomize", "colorize", "constructive random", "constructive color palettes", "color alchemy"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSession();

  return (
    <html lang="en" data-theme="myTheme">
      <body className={inter.className}>
        <header className="navbar bg-slate-100 px-5 sm:px-10 border-b fixed top-0 z-10 backdrop-filter backdrop-blur-3xl bg-opacity-30">
          <div className="flex-1">
            <a className="text-xl font-bold" href="/" title="Color Alchemy">
              Color Alchemy
            </a>
          </div>
          <nav className="flex-none">
            <ul className="menu menu-horizontal px-1 sm:flex gap-2 items-center hidden">
              {user ? (
                <>
                  <li>
                    <NavBarLink href="/" titleName={"Home"}>
                      Home
                    </NavBarLink>
                  </li>
                  <li>
                    <NavBarLink href="/random" titleName={"Random"}>
                      Random
                    </NavBarLink>
                  </li>
                  <li>
                    <NavBarLink href="/create" titleName={"Create Palette"}>
                      Create Palette
                    </NavBarLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavBarLink href="/" titleName={"Home"}>
                      Home
                    </NavBarLink>
                  </li>
                  <li>
                    <NavBarLink href="/random" titleName={"Random"}>
                      Random
                    </NavBarLink>
                  </li>
                  <li>
                    <a href="/login">Create Palette</a>
                  </li>
                  <li>
                    <NavBarLink href="/login" titleName={"Login"}>
                      Login
                    </NavBarLink>
                  </li>
                </>
              )}
            </ul>
            {user ? (
              <div className="dropdown dropdown-end ">
                <div
                  title="Account"
                  tabIndex={0}
                  role="button"
                  className="btn btn-primary btn-circle avatar btn-sm ms-2"
                >
                  <FaUser className="w-3 h-3" />
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li className="sm:hidden block">
                    <NavBarLink href="/">Home</NavBarLink>
                  </li>
                  <li className="sm:hidden block">
                    <NavBarLink href="/create">Create Palette</NavBarLink>
                  </li>
                  <li className="">
                    <NavBarLink href="/mypalettes">My Palettes</NavBarLink>
                  </li>
                  <div className="divider m-0"></div>
                  <li>
                    <LogoutBtn />
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <div className="dropdown dropdown-end  sm:hidden inline-block">
                <div
                  title="Account"
                  tabIndex={0}
                  role="button"
                  className="btn btn-primary btn-circle avatar btn-sm ms-2"
                >
                  <FaEllipsis className="w-3 h-3" />
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li className="sm:hidden block">
                    <NavBarLink href="/">Home</NavBarLink>
                  </li>
                  <li className="sm:hidden block">
                    <a href="/create">Create Palette</a>
                  </li>
                  <li className="">
                    <NavBarLink href="/random">Random</NavBarLink>
                  </li>
                  <div className="divider m-0"></div>
                  <li>
                    <NavBarLink href="/login">Login</NavBarLink>
                  </li>
                </ul>
              </div>
              </>
            )}
          </nav>
        </header>
        <main className="p-2 sm:p-5 mt-16">{children}</main>
      </body>
    </html>
  );
}
