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

const FullLayout = ({ children }) => {

  const pathname = usePathname()
  const [open, setOpen] = React.useState(false);
  const showMobilemenu = () => {
    setOpen(!open);
  };
  const router = useRouter()
  const [isAuth, setIsAuth] = useState(typeof window !== 'undefined' && sessionStorage.getItem('jwt'));
  const [role, setRole] = useState(typeof window !== 'undefined' && JSON.parse(sessionStorage.getItem('user')))
  const [key, setKey] = useState(0);
  // console.log(pathname);
  useEffect(() => {
    setIsAuth(typeof window !== 'undefined' && sessionStorage.getItem('jwt'));
    const updateUser = JSON.parse(sessionStorage.getItem('user'));
    setRole(updateUser?.role)
  }, [pathname]);
  useEffect(() => {
    // Update the key whenever the authentication state changes
    setKey(prevKey => prevKey + 1);
  }, [isAuth]);
  // console.log("is-auth", role);
  useEffect(() => {
    if (!isAuth && pathname !== '/auth/signup') {
      router.push('/auth/login');
    } else if (!isAuth && pathname !== '/auth/login') {
      router.push('/auth/signup');
    } else {
      router.push(pathname);
    }
  }, [isAuth]);
  // console.log(role);
  return (
    <main>

      {isAuth && pathname !== '/auth/login' ? (
        pathname !== '/auth/login' && pathname !== '/auth/signup' && role === 'admin' ? (
          <div className="pageWrapper d-md-block d-lg-flex w-full">
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
              <Container className="wrapper relative" fluid>
                {/* <div>{children}</div> */}
                {React.cloneElement(children, { key })}
              </Container>
            </div>
          </div>
        )
          : pathname !== '/auth/login' && pathname !== '/auth/signup' && role === 'user' ? (<>
            <Header showMobmenu={() => showMobilemenu()} />
            {/* <Container  fluid> */}
              <div className="relative" fluid>{children}</div>
              {/* {React.cloneElement(children, { key })} */}
            {/* </Container> */}
          </>) : (

            <SignUp />

          )
      ) : (

        !isAuth && pathname === '/auth/login' ? <SignIn /> : <SignUp />

      )
      }



    </main>
  );
};


export default FullLayout;

