import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import LogoWhite from "public/images/logos/xtremelogowhite.svg";
import user1 from "public/images/users/user1.jpg";
import { useRouter } from 'next/navigation'
import MultiLevelDropdown from "./multilevel";
import SelectLanguage from "@/app/[locale]/selectLanguage";
import { useTranslations } from 'next-intl';
const Header = ({ showMobmenu }) => {
  const t = useTranslations('Index');
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('jwt');
    // setIsAuth(false); // Update the authentication status when the user logs out
    router.push('/auth/login')
  };

  return (
    <Navbar color="primary" dark expand="md" className="sticky top-0  w-full z-10 " >
      <div className="d-flex align-items-center ">
        <NavbarBrand href="/" className="d-lg-none">
          <Image src={LogoWhite} alt="logo" />
        </NavbarBrand>
        <Button color="primary" className="d-lg-none" onClick={showMobmenu}>
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
        <div className="d-sm-block d-md-none">
          <SelectLanguage />
        </div>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link href="/" className="nav-link">
              {/* Home */}
              {`${t("Home")}`}
            </Link>
          </NavItem>
          
          <NavItem>
            <Link href="/pages/vahicle" className="nav-link">
            
            {t('USED-TRUCK')}
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/pages/product" className="nav-link">
              {t('Vahicle')}
            </Link>
          </NavItem>
         
          <MultiLevelDropdown />
          {/*<UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
              DD Menu
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="primary">
            <div style={{ lineHeight: "0px" }}>
              <Image
                src={user1}
                alt="profile"
                className="rounded-circle"
                width="30"
                height="30"
              />
            </div>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>{t('Info')}</DropdownItem>
            <DropdownItem>
              <Link href="/pages/profile" className="nav-link">
                {t('my-account')}
              </Link>
            </DropdownItem>
            <DropdownItem>{t('Edit Profile')}</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>{t('My Balance')}</DropdownItem>
            
            <DropdownItem onClick={handleLogout}>{t('Logout')}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div className="sm:flex hidden">
          <SelectLanguage />
        </div>
      </Collapse>
    </Navbar>
  );
};

export default Header;