import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, LogIn, Mail, User } from "react-feather";
import man from "../../../assets/images/dashboard/profile.png";

import { LI, UL, Image, P } from "../../../AbstractElements";
import CustomizerContext from "../../../_helper/Customizer";
import { Account, Admin, Inbox, LogOut, Taskboard } from "../../../Constant";
const styles = {
  initialsContainer: {
    width: "40px", // Adjust the width as needed
    height: "40px", // Adjust the height as needed
    background:
      "linear-gradient(103.75deg, #33b1ee -13.9%, var(--theme-default) 79.68%)", // Set the background color as needed
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "34%",
    color: "#fff", // Set the text color as needed
  },

  initials: {
    fontSize: "16px", // Adjust the font size as needed
    fontWeight: "bold",
    color: "#fff", // Set the text color as needed
  },
};
const UserHeader = () => {
  const history = useNavigate();
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const { layoutURL } = useContext(CustomizerContext);
  const authenticated = JSON.parse(sessionStorage.getItem("authenticated"));
  const auth0_profile = JSON.parse(localStorage.getItem("auth0_profile"));
  const userType = sessionStorage.getItem("user_type");

  useEffect(() => {
    setProfile(localStorage.getItem("profileURL") || man);
    setName(
      sessionStorage.getItem("Name") ? sessionStorage.getItem("Name") : name
    );
  }, []);

  const Logout = () => {
    sessionStorage.removeItem("profileURL");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("auth0_profile");
    sessionStorage.removeItem("Name");
    sessionStorage.removeItem("user_type");
    sessionStorage.setItem("login", false);
    sessionStorage.removeItem("user_id");
    sessionStorage.setItem("authenticated", false);
    history(`/login`);
  };

  const UserMenuRedirect = (redirect) => {
    history(redirect);
  };
  const getInitials = (name) => {
    const words = name.split(" ");
    return words
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };
  return (
    <li className="profile-nav onhover-dropdown pe-0 py-0">
      <div className="media profile-media">
        {/* <Image
          attrImage={{
            className: "b-r-10 m-0",
            src: `${authenticated ? auth0_profile?.picture : profile}`,
            alt: "",
          }}
        />
        <div className="media-body">
          <span>{authenticated ? auth0_profile.name : name}</span>
          <P attrPara={{ className: "mb-0 font-roboto" }}>
            {userType} <i className="middle fa fa-angle-down"></i>
          </P>
        </div> */}
        <div style={styles.initialsContainer}>
          <span style={styles.initials}>{getInitials(name)}</span>
        </div>
      </div>
      <UL
        attrUL={{ className: "simple-list profile-dropdown onhover-show-div" }}
      >
        <LI
          attrLI={{
            onClick: () => UserMenuRedirect(`/app/users/profile/${layoutURL}`),
          }}
        >
          <User />
          <span>{Account} </span>
        </LI>
        <LI
          attrLI={{
            onClick: () => UserMenuRedirect(`/app/email-app/${layoutURL}`),
          }}
        >
          <Mail />
          <span>{Inbox}</span>
        </LI>
        <LI
          attrLI={{
            onClick: () => UserMenuRedirect(`/app/todo-app/todo/${layoutURL}`),
          }}
        >
          <FileText />
          <span>{Taskboard}</span>
        </LI>
        <LI attrLI={{ onClick: Logout }}>
          <LogIn />
          <span>{LogOut}</span>
        </LI>
      </UL>
    </li>
  );
};

export default UserHeader;
