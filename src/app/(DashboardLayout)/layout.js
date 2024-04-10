'use client'
import React, { useState } from "react";
import { Container } from "reactstrap";
import Header from "./layouts/header/Header";
import Sidebar from "./layouts/sidebars/vertical/Sidebar";
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import SignIn from "../auth/login/page";

const FullLayout = ({ children }) => {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false);
  const showMobilemenu = () => {
    setOpen(!open);
  };

  const [isAuth, setIsAuth] = useState(typeof window !== 'undefined' && sessionStorage.getItem('jwt'));
  const router = useRouter()
  return (
    <main>
      {!isAuth && pathname !== '/auth/login' ? 
      <div className="pageWrapper d-md-block d-lg-flex">
        {/******** Sidebar **********/}
        <aside
          className={`sidebarArea shadow bg-white ${
            !open ? "" : "showSidebar"
          }`}
        >
          <Sidebar showMobilemenu={() => showMobilemenu()} />
        </aside>
        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          <Header showMobmenu={() => showMobilemenu()} />

          {/********Middle Content**********/}
          <Container className="p-4 wrapper" fluid>
            <div>{children}</div>
          </Container>
        </div>
      </div>
      :
        <SignIn />
        }
      {/* {!isAuth && pathname !== '/auth/register' && <SignIn />} */}
    </main>
  );
};

export default FullLayout;
