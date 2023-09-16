import { Navbar, Container, Nav } from "react-bootstrap";

import"./styles.css";

export const NavigationBar = ({onLogoClick, onProfileClick}) => {

    const appLogo = (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-lightning-charge-fill" viewBox="0 0 16 16">
            <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
        </svg>
    );

    const profileLogo = (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg>
    );

    return (
        <Navbar expand="lg" className="bg-secondary" style={{width: "100vw", color: "#04423d"}}>
            <Container>
                <Navbar.Brand onClick={() => onLogoClick()} className="navbar-brand" style={{display: "flex", flexDirection: "row"}}>{appLogo} <h3>three pics</h3></Navbar.Brand>
                <span className="profile-span" onClick={() => onProfileClick()}>{profileLogo}</span>
            </Container>
        </Navbar>
    )
}