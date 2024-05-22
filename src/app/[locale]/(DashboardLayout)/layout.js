'use client'
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import Header from "./layouts/header/Header";
import Sidebar from "./layouts/sidebars/vertical/Sidebar";
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import SignIn from "./auth/login/page";
import SignUp from "./auth/signup/page";
import RootLayout from "../../layout";

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
  // const newPath = pathname.replace(/^\/[^\/]+/, '');
  // console.log(newPath);
  const parts = pathname.split('/').filter(Boolean);
  console.log(parts[0]);
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
  // console.log(pathname);
  useEffect(() => {
    if (!isAuth && pathname !== `/${parts[0]&& parts[0]}/auth/signup`) {
      router.push(`/${parts[0]}/auth/login`);
      // router.push(pathname)
    } else if (!isAuth && pathname !== `/${parts[0]&& parts[0]}/auth/login`) {
      router.push(`/${parts[0]}/auth/signup`);
      // router.push(pathname)
    }else {
      router.push(pathname);
    }
  }, [isAuth]);
  // console.log(role);
  return (
    <main>

      {isAuth && pathname !== `/${parts[0]}/auth/login` ? (
        pathname !== `/${parts[0]}/auth/login` && pathname !== `/${parts[0]}/auth/signup` && role === 'admin' ? (
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
          : pathname !== `/${parts[0]}/auth/login` && pathname !== `${parts[0]}/auth/signup` && role === 'user' ? (<>
            <Header showMobmenu={() => showMobilemenu()} />
            {/* <Container  fluid> */}
              <div className="relative" fluid>{children}</div>
              {/* {React.cloneElement(children, { key })} */}
            {/* </Container> */}
          </>) : (

            <SignUp />

          )
      ) : (

        !isAuth && pathname === `/${parts[0]}/auth/login` ? <SignIn /> : <SignUp />

      )
      }



    </main>
  );
};


export default FullLayout;

