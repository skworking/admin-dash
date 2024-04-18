'use client'
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import Header from "./layouts/header/Header";
import Sidebar from "./layouts/sidebars/vertical/Sidebar";
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import SignIn from "./auth/login/page";
import SignUp from "./auth/signup/page";
import RootLayout from "../layout";

const FullLayout = ({ children}) => {

  const pathname = usePathname()
  const [open, setOpen] = React.useState(false);
  const showMobilemenu = () => {
    setOpen(!open);
  };

  const [isAuth, setIsAuth] = useState(typeof window !== 'undefined' && sessionStorage.getItem('jwt'));
  const [key, setKey] = useState(0); 
  console.log(pathname);
  useEffect(() => {
    setIsAuth(typeof window !== 'undefined' && sessionStorage.getItem('jwt'));
  }, [pathname]);
  useEffect(() => {
    // Update the key whenever the authentication state changes
    setKey(prevKey => prevKey + 1);
  }, [isAuth]);

  return (
    <main>

      {isAuth && pathname !== '/auth/login' ? (
        pathname !== '/auth/login' && pathname !== '/auth/signup'  ? (
          <div className="pageWrapper d-md-block d-lg-flex">
            {/******** Sidebar **********/}
            <aside
              className={`sidebarArea shadow bg-white ${!open ? "" : "showSidebar"
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
                {/* <div>{children}</div> */}
                {React.cloneElement(children, { key })} 
              </Container>
            </div>
          </div>
        ) : (
          <SignUp />
        )
      ) : (

        pathname === '/auth/login'     ? <SignIn />:<SignUp />
    
      )
    }

    </main>
  );
};


export default FullLayout;

