import React, { useState } from "react";
import Link from "next/link";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";

// 상단 메뉴 리스트
const BsNavLink = ({ title, href }) => {
    if(title === 'home') href = '';
    else if(title === 'admin') href = 'onlyadmin'
    else if(title === 'adminssr') href = 'onlyadminssr'
    return (
        <NavItem className="port-navbar-item">
            <Link href={ title === "home" ? "/" : `/${href}` }>
                <a className="nav-link port-navbar-link">{ title }</a>
            </Link>
        </NavItem>
    );
}
// 상단 브랜드 로고
const BsNavBrand = () => (
    <Link href="/">
        <a className="navbar-brand port-navbar-brand">Asher Kim</a>
    </Link>
)
// 로그인 버튼
const LoginLink = () => (
    <a className="nav-link port-navbar-link" href="/api/v1/login">Login</a>
)
// 로그아웃 버튼
const LogoutLink = () => (
    <a className="nav-link port-navbar-link" href="/api/v1/logout">Logout</a>
)
// 헤더
const Header = ({ user, loading, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar    
                className={ `port-navbar port-default absolute ${className}`}
                dark
                expand="md">
                <BsNavBrand />
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        { Array("home", "about", "portfolios", "blogs", "cv", 
                               "secret", "secretssr", "admin", "adminssr").map((title) => (
                            <BsNavLink key={ title } title={ title } href={ title } />
                        ))}
                    </Nav>
                    <Nav navbar>
                        { !loading &&
                            <>
                                { user ? (
                                    <LogoutLink />
                                ) : (
                                    <LoginLink />   
                                )}
                            </>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default Header;
