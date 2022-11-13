import React, { useState } from "react";

//All the svg files
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Home from "../../assets/inbox.svg";
import logo from "../../assets/logos.png";
import PowerOff from "../../assets/power-off-solid.svg";
import { logoutUser } from "../../services/services";

const Container = styled.div`
  position: fixed;

  .active {
    border-right: 4px solid var(--white);

    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }
`;

const Button = styled.button`
  background-color: var(--black);
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0.5rem 0 0 0.5rem;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  &::before,
  &::after {
    content: "";
    background-color: var(--white);
    height: 2px;
    width: 1rem;
    position: absolute;
    transition: all 0.3s ease;
  }

  &::before {
    top: ${(props) => (props.clicked ? "1.5" : "1rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }

  &::after {
    top: ${(props) => (props.clicked ? "1.2" : "1.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
`;

const SidebarContainer = styled.div`
  background-color: var(--black);
  width: 3.5rem;
  height: 80vh;
  margin-top: 1rem;
  border-radius: 0 30px 30px 0;
  padding: 1rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  position: relative;
`;

const Logo = styled.div`
  width: 2rem;

  img {
    width: 100%;
    height: auto;
  }
`;

const SlickBar = styled.ul`
  color: var(--white);
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--black);

  padding: 2rem 0;

  position: absolute;
  top: 6rem;
  left: 0;

  width: ${(props) => (props.clicked ? "12rem" : "3.5rem")};
  transition: all 0.5s ease;
  border-radius: 0 30px 30px 0;
`;

const Item = styled(NavLink)`
  text-decoration: none;
  color: var(--white);
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;

  display: flex;
  padding-left: 1rem;

  &:hover {
    border-right: 4px solid var(--white);

    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }

  img {
    width: 1.2rem;
    height: auto;
    filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
      brightness(78%) contrast(85%);
  }
`;



const Text = styled.span`
  width: ${(props) => (props.clicked ? "100%" : "0")};
  overflow: hidden;
  margin-left: ${(props) => (props.clicked ? "1.5rem" : "0")};
  transition: all 0.3s ease;
`;

const Profile = styled.div`
  width: ${(props) => (props.clicked ? "14rem" : "3rem")};
  height: 3rem;

  padding: 0.5rem 0rem;
  border: 1.7px solid var(--white);
  border-radius: 25px;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${(props) => (props.clicked ? "11rem" : "0")};

  background-color: var(--black);
  color: var(--white);

  transition: all 0.6s ease;

  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;
    

    &:hover {
      border: 2px solid var(--grey);
      padding: 2px;
    }
  }
`;

const Details = styled.div`
  display: ${(props) => (props.clicked ? "flex" : "none")};
  justify-content: space-between;
  align-items: center;
  
`;

const Name = styled.div`
  padding: 0 1.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


  h4 {
    display: inline-block;
    font-size: 0.9rem;
  }

  a {
    font-size: 0.7rem;
    text-decoration: none;
    color: var(--grey);

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Logout = styled.button`
  border: none;
  width: 2rem;
  height: 2rem;
  background-color: transparent;

  img {
    width: 100%;
    height: auto;
    filter: invert(15%) sepia(70%) saturate(6573%) hue-rotate(2deg)
      brightness(100%) contrast(126%);
    transition: all 0.3s ease;
    &:hover {
      border: none;
      padding: 0;
      opacity: 0.5;
    }
  }
`;
const ProfileName = styled.span`
  background: #512DA8;
  font-size: 25px;
  color: #fff;
  text-align: center;
  line-height: 45px;

  width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;
    

    &:hover {
    }
`;
const Sidebar = ({ loginButton, isLoggedIn, toggleModal }) => {

  //console.log("isLoggedIn=",isLoggedIn);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  let showSide = isLoggedIn == 'LOGOUT' ? true : false;
  //console.log("showSide=",showSide);
  const [showsidebar, setShowsidebar] = useState(showSide);
  const [pic, setPic] = useState('');
  const [profileClick, setprofileClick] = useState(false);
  const handleProfileClick = () => {
    setprofileClick(!profileClick);

  }
  //console.log("showsidebar=",showsidebar);
  React.useEffect(() => {
    setShowsidebar(isLoggedIn == 'LOGOUT' ? true : false);
  }, [isLoggedIn])
  function logoutUserFromApp() {
    logoutUser(localStorage.getItem("userId")).then(resp => {
      // console.log(resp);
    });
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("stomp");
    localStorage.removeItem("pic");
    loginButton("LOGIN");
    toggleModal();
  }


  return (
    <>
      {(showsidebar) ? (
        <Container>
          <Button clicked={click} onClick={() => handleClick()}>
            Click
          </Button>
          <SidebarContainer>


            <Logo>
              <img src={logo} alt="logo" />
            </Logo>
            <SlickBar clicked={click}>
              <Item
                onClick={() => setClick(false)}
                exact
                activeClassName="active"
                to="/"
              >
                <img src={Home} alt="Home" />
                <Text clicked={click}>CSV Parser</Text>
              </Item>

              <Item
                onClick={() => setClick(false)}
                activeClassName="active"
                to="/search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>


                {/*<Text clicked={click}>Search</Text>*/}
              </Item>

              


            </SlickBar>

            {
              (localStorage.getItem("email") !== undefined && localStorage.getItem("email") !== "" && localStorage.getItem("email") !== "undefined"
                && localStorage.getItem("email") !== null) ? (

                <Profile clicked={profileClick}>

                  {
                    (pic) ? <img
                      onClick={() => handleProfileClick()}
                      src={pic}
                      alt="Profile"

                    /> :
                      <ProfileName onClick={() => handleProfileClick()}>{localStorage.getItem("firstname").charAt(0).toUpperCase()}{localStorage.getItem("lastname").charAt(0).toUpperCase()}</ProfileName>

                  }

                  <Details clicked={profileClick}>
                    <Name>
                      <h4>{localStorage.getItem("firstname")}&nbsp;{localStorage.getItem("lastname")}</h4>

                      {/* <NavLink to="/profile">view&nbsp;profile</NavLink> */}
                    </Name>


                    <Logout>
                      <img src={PowerOff} onClick={logoutUserFromApp} alt="logout" />
                    </Logout>
                  </Details>
                </Profile>
              ) : ""}
          </SidebarContainer>
        </Container>
      ) : ""}
    </>
  );
};

export default Sidebar;
