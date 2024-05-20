import React from 'react';
import Link from 'next/link';

/*--------- Hooks ---------*/
import { usePopupFunctions } from '../../components/popups/popups';

/*--------- Media ---------*/
import { CiBellOn } from "react-icons/ci";
import { AiOutlineQuestion } from "react-icons/ai";
import { LuScanLine } from "react-icons/lu";

const DashboardHeader = ()=> {
    const { openPopup, renderPopup } = usePopupFunctions(); 
    
    function OpenSideBar() {
        document.querySelector('.main_sidebar').classList.toggle('open')
    }
    return (
        <header className='dashboard_header'>
            {renderPopup()}
            <img src=""
            className="main_logo" onClick={() => { OpenSideBar() }} />
            <Link href="#"> <LuScanLine /> </Link>
            <Link href="#"> <CiBellOn /> </Link>
            <Link href="#"> <AiOutlineQuestion /> </Link>
            <img src="" className="user_img" onClick={() => openPopup('SignUp')} />
        </header>
    )
}

export default DashboardHeader;