import React from "react";
import { useState } from "react";
import {CNavbar, CNavbarNav, CContainer, CNavbarBrand, CNavbarToggler, CCollapse, CNavItem, CNavLink} from '@coreui/bootstrap-react';
import "bootstrap/dist/css/bootstrap.min.css";


const Navbar = () => {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <CNavbar expand="lg" colorScheme="light" className="bg-light">
                <CContainer fluid>
                    <CNavbarBrand href="#">
                        <img style={{width: 35}} src="https://educacion30.b-cdn.net/wp-content/uploads/2016/11/additio-app-logo.png"/>
                    </CNavbarBrand>
                    <CNavbarToggler
                        aria-label="Toggle navigation"
                        aria-expanded={visible}
                        onClick={() => setVisible(!visible)}
                    />
                    <CCollapse className="navbar-collapse" visible={visible}>
                        <CNavbarNav>
                            <CNavItem>
                                <CNavLink href="#" active>
                                    Home
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink href="#">Features</CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink href="#">Pricing</CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink href="#" disabled>
                                    Disabled
                                </CNavLink>
                            </CNavItem>
                        </CNavbarNav>
                    </CCollapse>
                </CContainer>
            </CNavbar>
        </div>
    );
};

export default Navbar;
