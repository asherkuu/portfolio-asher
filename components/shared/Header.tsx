import React, { useState } from "react";
import Link from "next/link";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { isAuthorized } from 'utils/auth0'

// 상단 메뉴 리스트
const BsNavLink = ({ title, href, className = '' }) => {
    if(title === 'home') href = '';
    else if(title === 'admin') href = 'onlyadmin'
    else if(title === 'adminssr') href = 'onlyadminssr'
    return (
        <NavItem className="port-navbar-item">
            <Link href={ title === "home" ? "/" : `/${href}` }>
                <a className={`nav-link port-navbar-link ${className}`}>{ title }</a>
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
// 관리자 메뉴
const AdminMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dropdown 
            className='port-navbar-link port-dropdown-menu'
            nav 
            isOpen={isOpen}
            toggle={() => setIsOpen(!isOpen)}>
                <DropdownToggle
                    className="port-dropdown-toggle" 
                    nav 
                    caret>
                    Admin
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                        <BsNavLink 
                            className="port-dropdown-item" 
                            title="Create Portfolio" 
                            href="portfolios/new" 
                        />
                    </DropdownItem>
                    <DropdownItem>
                        <BsNavLink 
                            className="port-dropdown-item" 
                            title="Blog Editor" 
                            href="blogs/editor" 
                        />
                    </DropdownItem>
                    <DropdownItem>
                        <BsNavLink 
                            className="port-dropdown-item" 
                            title="Dashboard" 
                            href="dashboard" 
                        />
                    </DropdownItem>
                </DropdownMenu>
        </Dropdown>
    )
}

// 헤더 메인
const Header = ({ user, loading, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <Navbar    
                className={ `port-navbar port-default absolute ${className}`}
                dark
                expand="md">
                <BsNavBrand />
                <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        { Array("home", "about", "portfolios", "blogs", "cv" 
                               /*,"secret", "secretssr", "admin", "adminssr"*/).map((title) => (
                            <BsNavLink key={ title } title={ title } href={ title } />
                        ))}
                    </Nav>
                    <Nav navbar>
                        { !loading &&
                            <>
                                { user ? (
                                    <>
                                        { isAuthorized(user, 'admin') &&
                                            <AdminMenu/>
                                        }
                                        <LogoutLink />
                                    </>
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
