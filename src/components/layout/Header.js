import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCustomContext } from "@/context/use-custom";
import { useRouter } from "next/navigation";
// Dependencies
import gsap from "gsap";

// Components
import { usePopupFunctions } from "../popups/popups";
import { useDisconnect } from "wagmi";

const Header = () => {
  const [user, setUser] = useState({
    email: "",
    name: "no-user",
    role: [0],
    verified: false,
  });
  const [accType, setAccType] = useState([]);
  useEffect(() => {
    let tmp = localStorage.getItem("jobs_2024_token");
    if (tmp === null) {
      console.log("Login First!");
    } else {
      setUser(JSON.parse(tmp).data.user);
      setAccType(JSON.parse(tmp).data.acc_type);
    }
  }, []);

  const { openPopup, renderPopup } = usePopupFunctions();

  const mobileMenu = useRef();

  const router = useRouter();
  const auth = useCustomContext();
  const { disconnect } = useDisconnect();

  const handleMenuClick = (status) => {
    if (status == true) {
      gsap.to(mobileMenu.current, {
        translateX: 0,
        duration: 0.5,
      });
    }

    if (status == false) {
      gsap.to(mobileMenu.current, {
        translateX: "-100%",
        duration: 0.5,
      });
    }
  };
  const handleSignOut = () => {
    disconnect();
    auth.signOut();
    location.href = "/";
  };

  // Authenticated user details
	const isAuthenticated = auth.isAuthenticated;
	const userRole = Array.isArray(user?.role) ? user.role : [];

	const clientUrl = isAuthenticated && userRole.includes(3) 
		? `/dashboard/${user.name}/client/home` 
		: "/"
	;
	const freelancerUrl = isAuthenticated && userRole.includes(0) 
		? `/dashboard/${user.name}/freelancer/home` 
		: "/"
	;
	const employerUrl = isAuthenticated && userRole.includes(2) 
		? `/dashboard/${user.name}/employer/home` 
		: "/"
	;
	const employeeUrl = isAuthenticated && userRole.includes(1) 
		? `/dashboard/${user.name}/employee/home` 
		: "/"
	;

  return (
    <>
      {renderPopup()}

      <header className="main_header">
        <div className="container">
          <Link href={"/"} className="main_logo">
            <Image
              src={"/assets/images/logo.svg"}
              width={133}
              height={50}
              alt="Jobs3"
			  className="min-w-[133px]"
            />
          </Link>
          <button className="menu_bars" onClick={() => handleMenuClick(true)}>
            <Image
              src={"/assets/images/menu_icon.svg"}
              width={40}
              height={40}
              alt=""
            />
          </button>
          <nav>
            <Link href="/">HOME</Link>
						<Link href={clientUrl}>Client</Link>
						<Link href={freelancerUrl}>Freelancer</Link>
						{/* <Link href={employerUrl}>Employer</Link>
						<Link href={employeeUrl}>Employee</Link> */}
          </nav>
          <div className="right_side">
            {!auth?.isAuthenticated ? (
              <Link
                href={"#sign-out"}
                onClick={() => openPopup("TypeOfAccount")}
                className="btn_classified ml-10 whitespace-nowrap"
              >
                Sign Up
              </Link>
            ) : (
              <Link
                href={"/jobs"}
                className="btn_classified ml-10 whitespace-nowrap"
                onClick={handleSignOut}
              >
                Sign Out
              </Link>
            )}
            {!auth?.isAuthenticated && (
              <div>
                <Link
                  href={"#sign-out"}
                  onClick={() => openPopup("SignIn")}
                  className="btn_classified whitespace-nowrap"
                >
                  Launch App
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="mobile-menu" ref={mobileMenu}>
        <div className="mm-head">
          <button
            className="close-button"
            onClick={() => handleMenuClick(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#fff"
              style={{ width: "20px" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            <span>Close</span>
          </button>
        </div>
        <Link href={"/"}>HOME</Link>
        <Link
          href={`${
            auth.isAuthenticated && user.role?.includes(3)
              ? `/dashboard/${user.name}/client/home`
              : "/"
          }`}
        >
          Client
        </Link>
        <Link
          href={`${
            auth.isAuthenticated && user.role?.includes(0)
              ? `/dashboard/${user.name}/freelancer/home`
              : "/"
          }`}
        >
          Freelancer
        </Link>

        {!auth?.isAuthenticated ? (
          <Link
            href={"#sign-out"}
            onClick={() => openPopup("TypeOfAccount")}
            className="btn_classified"
          >
            Sign Up
          </Link>
        ) : (
          <Link
            href={"/jobs"}
            className="btn_classified"
            onClick={handleSignOut}
          >
            Sign Out
          </Link>
        )}
        {!auth?.isAuthenticated && (
          <div>
            <Link
              href={"#sign-out"}
              onClick={() => openPopup("SignIn")}
              className="btn_classified"
            >
              Launch App
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
