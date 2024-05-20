'use client';
import React from 'react';
/*--------- Hooks ---------*/
import { usePopupFunctions } from '../../../../components/popups/popups';

export default function PopupsForDev() {
    const { openPopup, renderPopup } = usePopupFunctions(); 

    /*-----------------------------------------|
    |   Example on how to use all the popups   |
    |-----------------------------------------*/ 
    return (
        <div className="popups_pages" >
            <div className="live_test">
                <h2>Preview Popups</h2>
                <div className="buttons_popups">
                    <div className="open_popup" onClick={() => openPopup('SignUp')}>
                        Sign Up
                    </div>
                    <div className="open_popup" onClick={() => openPopup('SignIn')}>
                        Sign In Popup
                    </div>
                    <div className="open_popup" onClick={() => openPopup('PasswordReset')}>
                        Password Reset Popup
                    </div>
                    <div className="open_popup" onClick={() => openPopup('DeleteNote')}>
                        Delete Note Popup
                    </div>
                    <div className="open_popup" onClick={() => openPopup('DeactivateAccount')}>
                        Deactivate Account
                    </div>
                    <div className="open_popup" onClick={() => openPopup('Approved')}>
                        Approved Popup
                    </div>
                    <div className="open_popup" onClick={() => openPopup('Subscribe')}>
                        Subscribe Popup
                    </div>
                    <div className="open_popup" onClick={() => openPopup('Verification')}>
                        Verification Popup
                    </div>
                    <div className="open_popup" onClick={() => openPopup('Code')}>
                        Code Popup
                    </div>
                    <div className="open_popup" onClick={() => openPopup('DashboardOptions')}>
                        Dashboard Options Popup
                    </div>
                    <div className="open_popup" onClick={() => openPopup('TypeOfAccount')}>
                        Account Type
                    </div>
                </div>
            </div>
            {renderPopup()}
        </div>
    );
}
