'use client'
import React, { useState } from "react";
import { Button, Nav, NavItem } from "reactstrap";
import Logo from "../../shared/logo/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

// const navigation = [
//   {
//     title: "Dashboard",
//     href: "/",
//     icon: "bi bi-speedometer2",
//   },
//   {
//     title: "Product",
//     href: "/product",
//     icon: "bi bi-textarea-resize",
//   },
//   {
//     title: "Product List",
//     href: "/product-list",
//     icon: "bi bi-textarea-resize",
//   },
//   {
//     title: "Import File",
//     href: "/product-import",
//     icon: "bi bi-textarea-resize",
//   },
//   {
//     title: "Brand Model",
//     href: "/admin/brandmodel",
//     icon: "bi bi-card-text",
//   },
//   {
//     title: "Brand Model List",
//     href: "/admin/brandmodellist",
//     icon: "bi bi-card-text",
//   },
//   {
//     title: "State Form",
//     href: "/admin/statemodel",
//     icon: "bi bi-card-text",
//   },
//   {
//     title: "Tehshil Form",
//     href: "/admin/statedistrict",
//     icon: "bi bi-card-text",
//   },
//   {
//     title: "Alert",
//     href: "/ui/alerts",
//     icon: "bi bi-bell",
//   },
//   {
//     title: "Badges",
//     href: "/ui/badges",
//     icon: "bi bi-patch-check",
//   },
//   {
//     title: "Buttons",
//     href: "/ui/buttons",
//     icon: "bi bi-hdd-stack",
//   },
//   {
//     title: "Cards",
//     href: "/ui/cards",
//     icon: "bi bi-card-text",
//   },
//   {
//     title: "Grid",
//     href: "/ui/grid",
//     icon: "bi bi-columns",
//   },
//   {
//     title: "Table",
//     href: "/ui/tables",
//     icon: "bi bi-layout-split",
//   },
//   {
//     title: "Forms",
//     href: "/ui/forms",
//     icon: "bi bi-textarea-resize",
//   },
//   {
//     title: "Breadcrumbs",
//     href: "/ui/breadcrumbs",
//     icon: "bi bi-link",
//   },
//   {
//     title: "About",
//     href: "/pages/about",
//     icon: "bi bi-people",
//   },
// ];
const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Lists",
    icon: "bi bi-textarea-resize",
    children: [
      {
        title: "Product",
        href: "/admin/product",
        icon: "bi bi-textarea-resize",
      },
      {
        title: "Product List",
        href: "/admin/product-list",
        icon: "bi bi-textarea-resize",
      },
      {
        title: "Import File",
        href: "/product-import",
        icon: "bi bi-textarea-resize",
      },
    ],
  },
  {
    title: "Brands",
    icon: "bi bi-textarea-resize",
    children: [
      {
        title: "Brand Model",
        href: "/admin/brandmodel",
        icon: "bi bi-card-text",
      },
      {
        title: "Brand Model List",
        href: "/admin/brandmodellist",
        icon: "bi bi-card-text",
      }
    ]
  },
  {
    title: "State Brands",
    icon: "bi bi-textarea-resize",
    children: [
      {
        title: "Add District",
        href: "/admin/citydistrict",
        icon: "bi bi-card-text",
      },
      {
        title: "District List",
        href: "/admin/districtlist",
        icon: "bi bi-card-text",
      },
      {
        title: "Add State",
        href: "/admin/brandmodel",
        icon: "bi bi-card-text",
      },
      {
        title: "Tehshil Form",
        href: "/admin/statedistrict",
        icon: "bi bi-card-text",
      },

    ]
  }
];
const Sidebar = ({ showMobilemenu }) => {
  const location = usePathname();
  const currentURL = location.slice(0, location.lastIndexOf('/'));
  const [isOpen, setIsOpen] = useState(false);
  const [i,setIndex]=useState(null)
  const toggleSubMenu = (index) => {
    setIsOpen(!isOpen);
    setIndex(index)
  };

  return (
    <div className="p-3 ">
      <div className="d-flex align-items-center">
        <Logo />
        <span className="ms-auto d-lg-none">
          <Button
            close
            size="sm"
            onClick={showMobilemenu}
          ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {/* {navigation.map((navi, index) => (
            <NavItem  key={index} className="sidenav-bg">
              <Link 
                  href={navi.href}
                  className={
                    location === navi.href
                      ? "text-primary nav-link py-3"
                      : "nav-link text-secondary py-3"
                  }
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))} */}
          {navigation.map((navItem, index) => (
            <NavItem key={index} className="sidenav-bg">
              {navItem.href ? (
                <Link
                  href={navItem.href}
                  className={
                    location === navItem.href
                      ? "text-primary nav-link py-3"
                      : "nav-link text-secondary py-3"
                  }
                >
                  <i className={navItem.icon}></i>
                  <span className="ms-3 d-inline-block">{navItem.title}</span>
                </Link>
              ) : (
                <div>
                  {/* <div className="text-secondary py-3">
                    <i className={navItem.icon}></i>
                    <span className="ms-3 d-inline-block">{navItem.title}</span>
                  </div> */}
                  <div className="d-flex align-items-center justify-content-between text-secondary py-3">
                    <div>
                      <i className={navItem.icon}></i>
                      <span className="ms-3 d-inline-block">{navItem.title}</span>
                    </div>
                    {navItem.children &&
                      <button
                        className="btn"
                        onClick={()=>toggleSubMenu(index)}
                      >
                        {isOpen && i === index ? "-" : "+"}
                      </button>
                    }
                  </div>
                  {isOpen && i === index && (
                    <Nav vertical className="ml-4">
                      {navItem.children.map((child, childIndex) => (
                        <NavItem key={childIndex} className="sidenav-bg">
                          <Link
                            href={child.href}
                            className={
                              location === child.href
                                ? "text-primary nav-link py-3"
                                : "nav-link text-secondary py-3"
                            }
                          >
                            <span className="ms-3 d-inline-block">{child.title}</span>
                          </Link>
                        </NavItem>
                      ))}
                    </Nav>
                  )}
                </div>
              )}
            </NavItem>
          ))}

          {/* <Button
            color="secondary"
            tag="a"
            target="_blank"
            className="mt-3"
            href="https://www.wrappixel.com/templates/xtreme-next-js-free-admin-template/"
          >
            Download Free
          </Button>
          <Button
            color="danger"
            tag="a"
            target="_blank"
            className="mt-3"
            href="https://www.wrappixel.com/templates/xtreme-nextjs-admin-dashboard"
          >
            Upgrade To Pro
          </Button> */}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
