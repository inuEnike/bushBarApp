"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/assets/logo.png";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from "../icons/index";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [{ name: "Home", path: "/private", pro: false }],
  },
  {
    name: "Bars",
    icon: <ListIcon />,
    subItems: [{ name: "Add Bars", path: "/private/bars", pro: false }],
  },
  {
    icon: <CalenderIcon />,
    name: "All Bars",
    path: "/private/allBars",
  },
  {
    icon: <UserCircleIcon />,
    name: "User Profile",
    path: "/private/profile",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prev) =>
      prev && prev.type === menuType && prev.index === index
        ? null
        : { type: menuType, index }
    );
  };

  const renderMenuItems = (items: NavItem[], type: "main" | "others") => (
    <ul className="flex flex-col gap-7">
      {items.map((nav, index) => (
        <li key={`${nav.name}-${index}`}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, type)}
              className={`group flex items-center gap-3 text-white px-3 py-2 rounded-md w-full transition hover:bg-gray-800 ${
                openSubmenu?.type === type && openSubmenu?.index === index
                  ? "bg-gray-800"
                  : ""
              }`}
            >
              <span className="w-5 h-5">{nav.icon}</span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <>
                  <span className="text-sm">{nav.name}</span>
                  <ChevronDownIcon
                    className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                      openSubmenu?.type === type && openSubmenu?.index === index
                        ? "rotate-180 text-brand-500"
                        : ""
                    }`}
                  />
                </>
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`group flex items-center gap-3 px-3 py-2 rounded-md w-full transition hover:bg-gray-800 text-white ${
                  isActive(nav.path) ? "bg-gray-800" : ""
                }`}
              >
                <span className="w-5 h-5">{nav.icon}</span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="text-sm">{nav.name}</span>
                )}
              </Link>
            )
          )}

          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${type}-${index}`] = el;
              }}
              className="overflow-hidden transition-[height] duration-300"
              style={{
                height:
                  openSubmenu?.type === type && openSubmenu?.index === index
                    ? `${subMenuHeight[`${type}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="ml-7 mt-2 flex flex-col gap-1 text-sm text-gray-300">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`flex justify-between items-center px-3 py-1 rounded hover:bg-gray-800 ${
                        isActive(subItem.path) ? "bg-gray-800 text-white" : ""
                      }`}
                    >
                      {subItem.name}
                      <span className="flex gap-1">
                        {subItem.new && (
                          <span className="text-xs bg-green-500 text-white px-1 rounded">
                            New
                          </span>
                        )}
                        {subItem.pro && (
                          <span className="text-xs bg-purple-500 text-white px-1 rounded">
                            Pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  // Measure submenus on mount
  useEffect(() => {
    Object.entries(subMenuRefs.current).forEach(([key, el]) => {
      if (el) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: el.scrollHeight,
        }));
      }
    });
  }, [isExpanded, isHovered, isMobileOpen]);

  return (
    <aside
      className={`fixed top-0 mt-16 lg:mt-0 left-0 h-screen z-50 flex flex-col border-r border-gray-800 bg-gray-900 text-white transition-[width] duration-300 ease-in-out overflow-hidden
        ${isExpanded || isMobileOpen || isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 px-5 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src={logo}
                alt="Logo"
                width={50}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src={logo}
                alt="Logo"
                width={50}
                height={40}
              />
            </>
          ) : (
            <Image src={logo} alt="Logo" width={32} height={32} />
          )}
        </Link>
      </div>

      <div
        className="flex flex-col flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 px-5 pb-4"
        style={{ height: "calc(100vh - 64px)" }} // Adjust for navbar
      >
        <nav className="mb-6">
          <h2
            className={`mb-3 text-xs uppercase text-gray-400 ${
              !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
            }`}
          >
            {isExpanded || isHovered || isMobileOpen ? (
              "Menu"
            ) : (
              <HorizontaLDots />
            )}
          </h2>
          {renderMenuItems(navItems, "main")}
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
