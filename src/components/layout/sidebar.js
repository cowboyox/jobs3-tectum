"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const SideBar = ({ userRole }) => {
  const [user, setUser] = useState({
    email: "",
    name: "",
    role: [0],
    verified: false,
  });
  const [currentNav, setCurrentNav] = useState("");
  console.log("🚀 ~ SideBar ~ currentNav:", currentNav)

  useEffect(() => {
    let tmp = localStorage.getItem("jobs_2024_token");
    if (tmp === null) {
      console.log("Please Login First");
    } else {
      setUser(JSON.parse(tmp).data.user);
    }
    setCurrentNav(window.location.href.split("/")[5]);
  }, [userRole]);

  const freelancer_menu_data = [
    {
      id: 0,
      icon: (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.02 3.33992L3.63 7.53992C2.73 8.23992 2 9.72992 2 10.8599V18.2699C2 20.5899 3.89 22.4899 6.21 22.4899H17.79C20.11 22.4899 22 20.5899 22 18.2799V10.9999C22 9.78992 21.19 8.23992 20.2 7.54992L14.02 3.21992C12.62 2.23992 10.37 2.28992 9.02 3.33992Z"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.5 18.5H13.5C15.15 18.5 16.5 17.15 16.5 15.5V12.5C16.5 10.85 15.15 9.5 13.5 9.5H10.5C8.85 9.5 7.5 10.85 7.5 12.5V15.5C7.5 17.15 8.85 18.5 10.5 18.5Z"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 9.5V18.5"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.5 14H16.5"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      name: "Home",
      href: `/dashboard/${user.name}/freelancer/home`,
    },
    {
      id: 1,
      icon: (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 12.5C14.7614 12.5 17 10.2614 17 7.5C17 4.73858 14.7614 2.5 12 2.5C9.23858 2.5 7 4.73858 7 7.5C7 10.2614 9.23858 12.5 12 12.5Z"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20.5901 22.5C20.5901 18.63 16.7402 15.5 12.0002 15.5C7.26015 15.5 3.41016 18.63 3.41016 22.5"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      name: "Profile",
      href: `/dashboard/${user.name}/freelancer/profile`,
    },
    {
      id: 2,
      icon: (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 2.5H9C4 2.5 2 4.5 2 9.5V15.5C2 20.5 4 22.5 9 22.5H15C20 22.5 22 20.5 22 15.5V13.5"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.0399 3.52001L8.15988 11.4C7.85988 11.7 7.55988 12.29 7.49988 12.72L7.06988 15.73C6.90988 16.82 7.67988 17.58 8.76988 17.43L11.7799 17C12.1999 16.94 12.7899 16.64 13.0999 16.34L20.9799 8.46001C22.3399 7.10001 22.9799 5.52001 20.9799 3.52001C18.9799 1.52001 17.3999 2.16001 16.0399 3.52001Z"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.9102 4.6499C15.5802 7.0399 17.4502 8.9099 19.8502 9.5899"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      name: "Gig Search",
      href: `/dashboard/${user.name}/freelancer/find-job`,
    },
    {
      id: 3,
      icon: (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 10.5V15.5C22 20.5 20 22.5 15 22.5H9C4 22.5 2 20.5 2 15.5V9.5C2 4.5 4 2.5 9 2.5H14"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22 10.5H18C15 10.5 14 9.5 14 6.5V2.5L22 10.5Z"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7 13.5H13"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7 17.5H11"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      name: "My Gigs",
      href: `/dashboard/${user.name}/freelancer/my-gigs`,
    },
    {
      id: 4,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7 13H12"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7 17H16"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V10"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      name: "Gig Orders",
      href: `/dashboard/${user.name}/freelancer/orders`,
    },
    {
      id: 5,
      icon: (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 7.5V17.5C21 20.5 19.5 22.5 16 22.5H8C4.5 22.5 3 20.5 3 17.5V7.5C3 4.5 4.5 2.5 8 2.5H16C19.5 2.5 21 4.5 21 7.5Z"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.5 5V7C14.5 8.1 15.4 9 16.5 9H18.5"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 13.5H12"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 17.5H16"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      name: "Disputes",
      href: `/dashboard/${user.name}/freelancer/disputes`,
    },
    {
      id: 6,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z"
            stroke="#96B0BD"
            stroke-width="1.49854"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7 8H17"
            stroke="#96B0BD"
            stroke-width="1.49854"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7 13H13"
            stroke="#96B0BD"
            stroke-width="1.49854"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      name: "Messages",
      href: `/dashboard/${user.name}/freelancer/inbox`,
    },
    {
      id: 7,
      icon: (
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.7305 15.5C14.3873 15.5 15.7305 14.1569 15.7305 12.5C15.7305 10.8431 14.3873 9.5 12.7305 9.5C11.0736 9.5 9.73047 10.8431 9.73047 12.5C9.73047 14.1569 11.0736 15.5 12.7305 15.5Z"
            stroke="#96B0BD"
            stroke-width="1.49854"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2.73047 13.3799V11.6199C2.73047 10.5799 3.58047 9.71994 4.63047 9.71994C6.44047 9.71994 7.18047 8.43994 6.27047 6.86994C5.75047 5.96994 6.06047 4.79994 6.97047 4.27994L8.70047 3.28994C9.49047 2.81994 10.5105 3.09994 10.9805 3.88994L11.0905 4.07994C11.9905 5.64994 13.4705 5.64994 14.3805 4.07994L14.4905 3.88994C14.9605 3.09994 15.9805 2.81994 16.7705 3.28994L18.5005 4.27994C19.4105 4.79994 19.7205 5.96994 19.2005 6.86994C18.2905 8.43994 19.0305 9.71994 20.8405 9.71994C21.8805 9.71994 22.7405 10.5699 22.7405 11.6199V13.3799C22.7405 14.4199 21.8905 15.2799 20.8405 15.2799C19.0305 15.2799 18.2905 16.5599 19.2005 18.1299C19.7205 19.0399 19.4105 20.1999 18.5005 20.7199L16.7705 21.7099C15.9805 22.1799 14.9605 21.8999 14.4905 21.1099L14.3805 20.9199C13.4805 19.3499 12.0005 19.3499 11.0905 20.9199L10.9805 21.1099C10.5105 21.8999 9.49047 22.1799 8.70047 21.7099L6.97047 20.7199C6.06047 20.1999 5.75047 19.0299 6.27047 18.1299C7.18047 16.5599 6.44047 15.2799 4.63047 15.2799C3.58047 15.2799 2.73047 14.4199 2.73047 13.3799Z"
            stroke="#96B0BD"
            stroke-width="1.49854"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      name: "Settings",
      href: `/dashboard/${user.name}/freelancer/settings`,
    },
  ];
  const client_menu_data = [
    {
      id: 0,
      icon: (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.02 3.34016L3.63 7.54016C2.73 8.24016 2 9.73016 2 10.8602V18.2702C2 20.5902 3.89 22.4902 6.21 22.4902H17.79C20.11 22.4902 22 20.5902 22 18.2802V11.0002C22 9.79016 21.19 8.24016 20.2 7.55016L14.02 3.22016C12.62 2.24016 10.37 2.29016 9.02 3.34016Z"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.5 18.5H13.5C15.15 18.5 16.5 17.15 16.5 15.5V12.5C16.5 10.85 15.15 9.5 13.5 9.5H10.5C8.85 9.5 7.5 10.85 7.5 12.5V15.5C7.5 17.15 8.85 18.5 10.5 18.5Z"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 9.5V18.5"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.5 14H16.5"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      name: "Home",
      href: `/dashboard/${user.name}/client/home`,
    },
    {
      id: 1,
      icon: (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 12.5C14.7614 12.5 17 10.2614 17 7.5C17 4.73858 14.7614 2.5 12 2.5C9.23858 2.5 7 4.73858 7 7.5C7 10.2614 9.23858 12.5 12 12.5Z"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20.5901 22.5C20.5901 18.63 16.7402 15.5 12.0002 15.5C7.26015 15.5 3.41016 18.63 3.41016 22.5"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      name: "Profile",
      href: `/dashboard/${user.name}/client/profile`,
    },
    {
      id: 2,
      icon: (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.16992 7.93994L11.9999 13.0499L20.7699 7.96994"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 22.11V13.04"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.92965 2.97979L4.58965 5.93979C3.37965 6.60979 2.38965 8.28979 2.38965 9.66979V15.3198C2.38965 16.6998 3.37965 18.3798 4.58965 19.0498L9.92965 22.0198C11.0696 22.6498 12.9396 22.6498 14.0796 22.0198L19.4196 19.0498C20.6296 18.3798 21.6196 16.6998 21.6196 15.3198V9.66979C21.6196 8.28979 20.6296 6.60979 19.4196 5.93979L14.0796 2.96979C12.9296 2.33979 11.0696 2.33979 9.92965 2.97979Z"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      name: "My Gigs",
      href: `/dashboard/${user.name}/client/my-gigs`,
    },
    {
      id: 3,
      icon: (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 2.5H9C4 2.5 2 4.5 2 9.5V15.5C2 20.5 4 22.5 9 22.5H15C20 22.5 22 20.5 22 15.5V13.5"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.0399 3.51976L8.15988 11.3998C7.85988 11.6998 7.55988 12.2898 7.49988 12.7198L7.06988 15.7298C6.90988 16.8198 7.67988 17.5798 8.76988 17.4298L11.7799 16.9998C12.1999 16.9398 12.7899 16.6398 13.0999 16.3398L20.9799 8.45976C22.3399 7.09976 22.9799 5.51976 20.9799 3.51976C18.9799 1.51976 17.3999 2.15976 16.0399 3.51976Z"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.9102 4.6499C15.5802 7.0399 17.4502 8.9099 19.8502 9.5899"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      name: "Post a Gig",
      href: `/dashboard/${user.name}/client/post-gig`,
    },
    {
      id: 4,
      icon: (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.15957 11.37C9.05957 11.36 8.93957 11.36 8.82957 11.37C6.44957 11.29 4.55957 9.34 4.55957 6.94C4.55957 4.49 6.53957 2.5 8.99957 2.5C11.4496 2.5 13.4396 4.49 13.4396 6.94C13.4296 9.34 11.5396 11.29 9.15957 11.37Z"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.4103 4.5C18.3503 4.5 19.9103 6.07 19.9103 8C19.9103 9.89 18.4103 11.43 16.5403 11.5C16.4603 11.49 16.3703 11.49 16.2803 11.5"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.15973 15.06C1.73973 16.68 1.73973 19.32 4.15973 20.93C6.90973 22.77 11.4197 22.77 14.1697 20.93C16.5897 19.31 16.5897 16.67 14.1697 15.06C11.4297 13.23 6.91973 13.23 4.15973 15.06Z"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.3398 20.5C19.0598 20.35 19.7398 20.06 20.2998 19.63C21.8598 18.46 21.8598 16.53 20.2998 15.36C19.7498 14.94 19.0798 14.66 18.3698 14.5"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      name: "Freelancers",
      href: `/dashboard/${user.name}/client/freelancers`,
    },
    {
      id: 5,
      icon: (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 8.5C20.6569 8.5 22 7.15685 22 5.5C22 3.84315 20.6569 2.5 19 2.5C17.3431 2.5 16 3.84315 16 5.5C16 7.15685 17.3431 8.5 19 8.5Z"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7 13.5H12"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7 17.5H16"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14 2.5H9C4 2.5 2 4.5 2 9.5V15.5C2 20.5 4 22.5 9 22.5H15C20 22.5 22 20.5 22 15.5V10.5"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      name: "Gig Search",
      href: `/dashboard/${user.name}/client/gig-search`,
    },
    {
      id: 6,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7 13H12"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7 17H16"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V10"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      name: "Gig Orders",
      href: `/dashboard/${user.name}/client/orders`,
    },
    {
      id: 7,
      icon: (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 7.5V17.5C21 20.5 19.5 22.5 16 22.5H8C4.5 22.5 3 20.5 3 17.5V7.5C3 4.5 4.5 2.5 8 2.5H16C19.5 2.5 21 4.5 21 7.5Z"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.5 5V7C14.5 8.1 15.4 9 16.5 9H18.5"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 13.5H12"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 17.5H16"
            stroke="#96B0BD"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      name: "Disputes",
      href: `/dashboard/${user.name}/client/disputes`,
    },
    {
      id: 8,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z"
            stroke="#96B0BD"
            stroke-width="1.49854"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7 8H17"
            stroke="#96B0BD"
            stroke-width="1.49854"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7 13H13"
            stroke="#96B0BD"
            stroke-width="1.49854"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      name: "Messages",
      href: `/dashboard/${user.name}/client/inbox`,
    },
    {
      id: 7,
      icon: (
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.7305 15.5C14.3873 15.5 15.7305 14.1569 15.7305 12.5C15.7305 10.8431 14.3873 9.5 12.7305 9.5C11.0736 9.5 9.73047 10.8431 9.73047 12.5C9.73047 14.1569 11.0736 15.5 12.7305 15.5Z"
            stroke="#96B0BD"
            stroke-width="1.49854"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2.73047 13.3799V11.6199C2.73047 10.5799 3.58047 9.71994 4.63047 9.71994C6.44047 9.71994 7.18047 8.43994 6.27047 6.86994C5.75047 5.96994 6.06047 4.79994 6.97047 4.27994L8.70047 3.28994C9.49047 2.81994 10.5105 3.09994 10.9805 3.88994L11.0905 4.07994C11.9905 5.64994 13.4705 5.64994 14.3805 4.07994L14.4905 3.88994C14.9605 3.09994 15.9805 2.81994 16.7705 3.28994L18.5005 4.27994C19.4105 4.79994 19.7205 5.96994 19.2005 6.86994C18.2905 8.43994 19.0305 9.71994 20.8405 9.71994C21.8805 9.71994 22.7405 10.5699 22.7405 11.6199V13.3799C22.7405 14.4199 21.8905 15.2799 20.8405 15.2799C19.0305 15.2799 18.2905 16.5599 19.2005 18.1299C19.7205 19.0399 19.4105 20.1999 18.5005 20.7199L16.7705 21.7099C15.9805 22.1799 14.9605 21.8999 14.4905 21.1099L14.3805 20.9199C13.4805 19.3499 12.0005 19.3499 11.0905 20.9199L10.9805 21.1099C10.5105 21.8999 9.49047 22.1799 8.70047 21.7099L6.97047 20.7199C6.06047 20.1999 5.75047 19.0299 6.27047 18.1299C7.18047 16.5599 6.44047 15.2799 4.63047 15.2799C3.58047 15.2799 2.73047 14.4199 2.73047 13.3799Z"
            stroke="#96B0BD"
            stroke-width="1.49854"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      name: "Settings",
      href: `/dashboard/${user.name}/client/settings`,
    },
  ];
  const sideBarRef = useRef(null);
  function OpenSideBar() {
    if (window.innerWidth <= 768) {
      sideBarRef.current.classList.toggle("-translate-x-full");
    }
  }
  return (
    <div
      ref={sideBarRef}
      className="main_sidebar md:w-60 p-10 w-10/12 fixed left-0 bg-black z-40 min-h-screen transition md:sticky top-0 -translate-x-full md:translate-x-0"
    >
      <div onClick={OpenSideBar} className="w-10/12 mx-auto mb-10">
        <img src="/assets/images/logo.svg" className="w-100" />
      </div>
      <div onClick={OpenSideBar}>
        <div className="flex flex-col gap-3">
          {userRole === 0 &&
            freelancer_menu_data.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex gap-4 py-1 w-full transition-all hover:pl-1"
              >
                {item.icon}
                <span className="text-base uppercase text-slate-500 font-medium">
                  {item.name.toUpperCase()}
                </span>
              </Link>
            ))}
          {
            userRole === 3 &&
            client_menu_data.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex gap-4 py-1 w-full transition-all hover:pl-1"
              >
                {item.icon}
                <span className="text-base uppercase text-slate-500 font-medium">
                  {item.name.toUpperCase()}
                </span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
