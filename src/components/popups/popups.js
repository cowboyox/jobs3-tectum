'use client';
import { useState } from 'react';

import {
  ApprovedPopup,
  CodePopup,
  DashboardOptions,
  DeactivateAccount,
  DeleteNotePopup,
  PasswordResetPopup,
  SignInPopup,
  SignUpPopup,
  SubscibePopup,
  TypeOfAccount,
  VerificationPopup,
} from './popups_components';

export function usePopupFunctions() {
  const [activePopup, setActivePopup] = useState(null);

  const closePopups = () => {
    setActivePopup(null);
  };

  const openPopup = (popup) => {
    closePopups();
    setActivePopup(popup);
  };

  const renderPopup = () => {
    switch (activePopup) {
      case 'SignUp':
        return (
          <SignUpPopup
            onClose={closePopups}
            onSwitchPopup={(switchTo) => {
              openPopup(switchTo);
            }}
          />
        );
      case 'SignIn':
        return (
          <SignInPopup
            onClose={closePopups}
            onSwitchPopup={(switchTo) => {
              openPopup(switchTo);
            }}
          />
        );
      case 'PasswordReset':
        return <PasswordResetPopup onClose={closePopups} />;
      case 'DeleteNote':
        return <DeleteNotePopup onClose={closePopups} />;
      case 'DeactivateAccount':
        return <DeactivateAccount onClose={closePopups} />;
      case 'Approved':
        return <ApprovedPopup onClose={closePopups} />;
      case 'Subscribe':
        return <SubscibePopup onClose={closePopups} />;
      case 'Verification':
        return <VerificationPopup onClose={closePopups} />;
      case 'Code':
        return <CodePopup onClose={closePopups} />;
      case 'DashboardOptions':
        return (
          <DashboardOptions
            onClose={closePopups}
            onSwitchPopup={(switchTo) => {
              openPopup(switchTo);
            }}
          />
        );
      case 'TypeOfAccount':
        return (
          <TypeOfAccount
            onClose={closePopups}
            onSwitchPopup={(switchTo) => {
              openPopup(switchTo);
            }}
          />
        );
      default:
        return null;
    }
  };

  return {
    activePopup,
    closePopups,
    openPopup,
    renderPopup,
  };
}
