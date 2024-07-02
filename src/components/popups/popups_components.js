import { useWeb3Modal } from '@web3modal/wagmi/react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useAccount } from 'wagmi';

import { useToast } from '@/components/ui/use-toast';
import { useCustomContext } from '@/context/use-custom';
import { useDebounce } from '@/hooks/useDebounce';
import { useVerifyUsername } from '@/hooks/useVerifyUsername';
import { USER_ROLE } from '@/utils/constants';

// Icons

export function SignUpPopup({ onClose, onSwitchPopup }) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [isValidatedUsername, setIsValidatedUsername] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(null);
  const [confirmPwd, setConfirmPwd] = useState(null);
  const [referralUser, setReferralUser] = useState(null);
  const [referrer, setReferrer] = useState('');
  const [accept, setAccept] = useState(null);

  const debouncedUsername = useDebounce(username);
  const { data: isExists } = useVerifyUsername(debouncedUsername);
  const ref = useRef(null);
  const auth = useCustomContext();
  const { open } = useWeb3Modal();
  const router = useRouter();

  const { address, isConnected } = useAccount();

  useEffect(() => {
    const tmp = searchParams.get('referrer');
    setReferrer(tmp);
  }, [searchParams]);

  useEffect(() => {
    if (isConnected) {
      try {
        auth.signUpwithWallet(address);
        onClose();
        // let accountType = auth.acc_type[0];
        // let accountTypeName;
        // switch (accountType) {
        //   case 0:
        //     accountTypeName = 'freelancer';
        //     break;
        //   case 3:
        //     accountTypeName = 'client';
        //     break;
        //   default:
        //     accountTypeName = 'client';
        //     break;
        // }
        // const url = window.location.href
        // // Create an anchor element to parse the URL
        // const parser = document.createElement('a');
        // parser.href = url;

        // // Extract the pathname and search parameters
        // const { pathname, search } = parser;

        // // Parse the search parameters to get the 'redirect' value
        // const params = new URLSearchParams(search);
        // const redirectPath = params.get('redirect');
        // // Get the value of the 'redirect' parameter
        // if(redirectPath)
        //   router.push(redirectPath)
        // else
        //   router.push(`/dashboard/${accountTypeName}/home`);
      } catch (err) {
        console.error(err);
        // router.replace('/')
      }
    }
  }, [isConnected, router, address, auth, onClose]);

  useLayoutEffect(() => {
    if (ref.current && !!username) {
      if (!username.match(/^[a-z0-9_-]+$/)) {
        ref.current.classList.add('field_error');
        setIsValidatedUsername(false);
      } else {
        ref.current.classList.remove('field_error');
        setIsValidatedUsername(true);

        if (isExists) {
          ref.current.classList.add('field_error');
        } else {
          ref.current.classList.remove('field_error');
        }
      }
    }
  }, [isExists, username]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function checkInput(ev, attr) {
    // Check if input is empty
    if (ev.target.value.trim() !== '') {
      ev.target.classList.add('not_empty');

      // Validate Email If input is not empty
      if (ev.target.getAttribute('type') == 'email') {
        if (!validateEmail(ev.target.value)) {
          ev.target.closest('.field_container').classList.add('field_error');
        } else {
          ev.target.closest('.field_container')?.classList.remove('field_error');
          setEmail(ev.target.value);
        }
      }
      if (attr === 'name') {
        if (ev.target.value.length < 1) {
          ev.target.closest('.field_container').classList.add('field_error');
        } else {
          ev.target.closest('.field_container')?.classList.remove('field_error');
          setName(ev.target.value);
        }
      }
      if (attr === 'username') {
        if (ev.target.value.length < 1) {
          ev.target.closest('.field_container').classList.add('field_error');
        } else {
          setUsername(ev.target.value.trim());
        }
      }
      if (attr === 'password') {
        if (ev.target.value.length < 8) {
          ev.target.closest('.field_container').classList.add('field_error');
        } else {
          ev.target.closest('.field_container')?.classList.remove('field_error');
          setPassword(ev.target.value);
        }
      }
      if (attr === 'confirmPassword') {
        if (ev.target.value.length < 8 || !password || password !== ev.target.value) {
          ev.target.closest('.field_container').classList.add('field_error');
        } else {
          ev.target.closest('.field_container')?.classList.remove('field_error');
          setConfirmPwd(ev.target.value);
        }
      }
      if (attr === 'referralUser') {
        ev.target.closest('.field_container')?.classList.remove('field_error');
        setReferralUser(ev.target.value);
      }
      if (attr === 'accept') {
        if (!ev.target.checked) {
          ev.target.closest('.acceptance').classList.add('field_error');
        } else {
          ev.target.closest('.acceptance')?.classList.remove('field_error');
        }
        setAccept(ev.target.value);
      }
    } else {
      ev.target.classList.remove('not_empty');
    }
  }

  const validateUserInfo = () => {
    if (
      !name ||
      !username ||
      isExists ||
      !isValidatedUsername ||
      !email ||
      !password ||
      !confirmPwd ||
      !accept
    ) {
      return false;
    }

    if (
      name.length === 0 ||
      isExists ||
      !isValidatedUsername ||
      username.length === 0 ||
      !validateEmail(email) ||
      password.length < 8 ||
      confirmPwd.length < 8 ||
      password !== confirmPwd ||
      !accept
    ) {
      return false;
    }
    return true;
  };

  const onRegisterSubmit = async () => {
    if (!validateUserInfo()) {
      return toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3 className='text-center'>Please check your infomation.</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
    try {
      const verified = await auth.register({
        email,
        name,
        password,
        referralUser,
        referrer,
        username,
      });
      if (!verified) {
        onSwitchPopup('Verification');
      } else {
        let accountType = auth.acc_type[0];
        let accountTypeName;
        switch (accountType) {
          case 0:
            accountTypeName = 'freelancer';
            break;
          case 3:
            accountTypeName = 'client';
            break;
          default:
            accountTypeName = 'client';
            break;
        }
        const url = window.location.href;
        // Create an anchor element to parse the URL
        const parser = document.createElement('a');
        parser.href = url;

        // Extract the pathname and search parameters
        const { pathname, search } = parser;

        // Parse the search parameters to get the 'redirect' value
        const params = new URLSearchParams(search);
        const redirectPath = params.get('redirect');
        // Get the value of the 'redirect' parameter
        if (redirectPath) router.push(redirectPath);
        else router.push(`/dashboard/${accountTypeName}/home`);
      }
    } catch (err) {
      console.error(err);
      return toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3 className='text-center'>Email already Exists!</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='popup_overlay' onClick={onClose}>
      <div className='popup' onClick={(e) => e.stopPropagation()}>
        <div className='popup_content'>
          <div className='top_heading'>
            <div className='left_side'>
              <h2>Sign up</h2>
              <p>Enter your details below</p>
            </div>
            <div className='right_side'>
              <button
                onClick={() => {
                  onSwitchPopup('SignIn');
                }}
              >
                Log in
              </button>
            </div>
          </div>
          <div className='form_container sign_up'>
            <div className='field_container'>
              <input
                id='sign_up_full_name'
                onChange={(ev) => {
                  checkInput(ev, 'name');
                }}
                type='text'
              />
              <label htmlFor='sign_up_full_name'>Full name</label>
              <span className='error_message'>Please enter your full name.</span>
            </div>
            <div className='field_container' ref={ref}>
              <input
                id='sign_up_username'
                onChange={(ev) => {
                  checkInput(ev, 'username');
                }}
                type='text'
              />
              <label htmlFor='sign_up_username'>Username</label>
              {!username ? (
                <span className='error_message'>Please enter your username.</span>
              ) : !isValidatedUsername ? (
                <span className='error_message'>You can only input with a~z, 0~9, _, -</span>
              ) : (
                <span className='error_message'>This username already exists.</span>
              )}
            </div>
            <div className='field_container'>
              <input
                id='sign_up_email'
                onChange={(ev) => {
                  checkInput(ev, 'email');
                }}
                type='email'
              />
              <label htmlFor='sign_up_email'>Email address</label>
              <span className='error_message'>
                That format doesn&apos;t look right. Make sure there aren&apos;t any typos.
              </span>
            </div>
            <div className='field_container'>
              <input
                id='sign_up_password'
                onChange={(ev) => {
                  checkInput(ev, 'password');
                }}
                type='password'
              />
              <label htmlFor='sign_up_password'>Create Password</label>
              <span className='error_message'>
                The length of password should be more than 8 characters.
              </span>
            </div>
            <div className='field_container'>
              <input
                id='sign_up_confirm_password'
                onChange={(ev) => {
                  checkInput(ev, 'confirmPassword');
                }}
                type='password'
              />
              <label htmlFor='sign_up_confirm_password'>Confirm Password</label>
              <span className='error_message'>
                The confirm password should be more than 8 characters and matched with your
                password.
              </span>
            </div>
            {!referrer && (
              <div className='field_container'>
                <input
                  id='referral_user'
                  onChange={(ev) => {
                    checkInput(ev, 'referralUser');
                  }}
                  type='text'
                />
                <label htmlFor='referral_user'>Referral User</label>
                <span className='error_message' />
              </div>
            )}
            <div className='acceptance'>
              <input
                id='acceptance'
                onChange={(ev) => {
                  checkInput(ev, 'accept');
                }}
                type='checkbox'
              />
              <label htmlFor='acceptance' style={{ marginLeft: 10 }}>
                By creating an account you agree to Privacy Policy
              </label>
            </div>
            <button className='submit_form' onClick={onRegisterSubmit} type='submit'>
              Sign Up
            </button>
            <button className='wallet_continue' onClick={() => open()}>
              Continue with wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export function SignInPopup({ onClose, onSwitchPopup }) {
  const { toast } = useToast();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [accept, setAccept] = useState(null);

  console.warn({ accept });

  const auth = useCustomContext();
  const { open } = useWeb3Modal();
  const router = useRouter();

  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      try {
        auth.signInwithWallet(address);
      } catch (err) {
        console.error(err);
        // router.replace('/')
      }
    }
  }, [isConnected, address, auth]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  function checkInput(ev, type) {
    // Check if input is empty
    if (ev.target.value.trim() !== '') {
      ev.target.classList.add('not_empty');

      // Validate Email If input is not empty
      if (ev.target.getAttribute('type') == 'email') {
        if (!validateEmail(ev.target.value)) {
          ev.target.closest('.field_container').classList.add('field_error');
        } else {
          ev.target.closest('.field_container').classList.remove('field_error');
          setEmail(ev.target.value);
        }
      }
      if (type === 'password') {
        if (ev.target.value.length < 8) {
          ev.target.closest('.field_container').classList.add('field_error');
        } else {
          ev.target.closest('.field_container').classList.remove('field_error');
          setPassword(ev.target.value);
        }
      }
      if (type === 'accept') {
        if (!ev.target.checked) {
          ev.target.closest('.acceptance').classList.add('field_error');
        } else {
          ev.target.closest('.acceptance')?.classList.remove('field_error');
        }
        setAccept(ev.target.checked);
      }
    } else {
      ev.target.classList.remove('not_empty');
    }
  }

  const handleLogin = async () => {
    if (!email || !password || password.length < 8 || !validateEmail(email)) {
      return toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3 className='text-center'>Please check your infomation.</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }

    try {
      await auth.login({ email, password }).then((data) => {
        let accountType = data.role[0];
        let accountTypeName;
        switch (accountType) {
          case 0:
            accountTypeName = 'freelancer';
            break;
          case 3:
            accountTypeName = 'client';
            break;
          default:
            accountTypeName = 'client';
            break;
        }
        const url = window.location.href;
        // Create an anchor element to parse the URL
        const parser = document.createElement('a');
        parser.href = url;

        // Extract the pathname and search parameters
        const { pathname, search } = parser;

        // Parse the search parameters to get the 'redirect' value
        const params = new URLSearchParams(search);
        const redirectPath = params.get('redirect');
        // Get the value of the 'redirect' parameter
        if (redirectPath) router.push(redirectPath);
        else router.push(`/dashboard/${accountTypeName}/home`);
      });
      // Dynamic redirect
    } catch (err) {
      return toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3 className='text-center'>Please sign up first.</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
  };
  return (
    <div className='popup_overlay' onClick={onClose}>
      <div className='popup sign_in' onClick={(e) => e.stopPropagation()}>
        <div className='popup_content'>
          <div className='top_heading'>
            <div className='left_side'>
              <h2>Sign In</h2>
              <p>Welcome back</p>
            </div>
            <div className='right_side'>
              <button
                onClick={() => {
                  onSwitchPopup('SignUp');
                }}
              >
                Sign up
              </button>
            </div>
          </div>
          <div className='form_container'>
            <div className='field_container'>
              <input
                id='sign_in_email'
                onChange={(ev) => {
                  checkInput(ev, 'email');
                }}
                type='email'
              />
              <label htmlFor='sign_in_email'>Email address</label>
              <span className='error_message'>
                That format doesn&apos;t look right. Make sure there aren&apos;t any typos.
              </span>
            </div>
            <div className='field_container'>
              <input
                id='sign_in_password'
                onChange={(ev) => {
                  checkInput(ev, 'password');
                }}
                type='password'
              />
              <label htmlFor='sign_in_password'>Create Password</label>
              <span className='error_message'>Please type your password here.</span>
            </div>
            <div className='acceptance'>
              <input
                id='acceptance'
                onChange={(ev) => {
                  checkInput(ev, 'accept');
                }}
                type='checkbox'
              />
              <label htmlFor='acceptance'>Keep me logged in</label>
            </div>
            <button className='submit_form' onClick={handleLogin}>
              Log in
            </button>
            <button className='wallet_continue' onClick={() => open()}>
              Continue with wallet
            </button>
            <span className='forgot_password'>Forgot password?</span>
          </div>
        </div>
        <div className='divider'>
          <span>or</span>
        </div>
        <div className='popup_content'>
          <div className='login_options'>
            <div className='option_login facebook'>
              <div className='icon'>
                <Image
                  alt=''
                  height={40}
                  src={'/assets/dashboard-media/svgs/social/facebook.svg'}
                  width={40}
                />
              </div>
              <span>Sign in with Facebook</span>
            </div>
            <div className='option_login twitter'>
              <div className='icon'>
                <Image
                  alt=''
                  height={40}
                  src={'/assets/dashboard-media/svgs/social/x_twitter.svg'}
                  width={40}
                />
              </div>
              <span>Sign in with Twitter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function PasswordResetPopup({ onClose }) {
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  function checkInput(ev) {
    // Check if input is empty
    if (ev.target.value.trim() !== '') {
      ev.target.classList.add('not_empty');

      // Validate Email If input is not empty
      if (ev.target.getAttribute('type') == 'email') {
        if (!validateEmail(ev.target.value)) {
          ev.target.closest('.field_container').classList.add('field_error');
        } else {
          ev.target.closest('.field_container').classList.remove('field_error');
        }
      }
    } else {
      ev.target.classList.remove('not_empty');
    }
  }
  return (
    <div className='popup_overlay' onClick={onClose}>
      <div className='popup reset_password' onClick={(e) => e.stopPropagation()}>
        <div className='popup_content'>
          <div className='top_heading'>
            <div className='left_side'>
              <h2>Password reset</h2>
              <p>We&apos;ll help you reset it and get back on track.</p>
            </div>
            <div className='right_side'>
              <span>Back</span>
            </div>
          </div>
          <div className='form_container'>
            <div className='field_container'>
              <input
                id='sign_in_email'
                onChange={(ev) => {
                  checkInput(ev);
                }}
                type='email'
              />
              <label htmlFor='sign_in_email'>Email address</label>
              <span className='error_message'>
                That format doesn&apos;t look right. Make sure there aren&apos;t any typos.
              </span>
            </div>
            <div className='acceptance'>
              <input
                id='acceptance'
                onChange={(ev) => {
                  checkInput(ev);
                }}
                type='checkbox'
              />
              <label htmlFor='acceptance'>Keep me logged in</label>
            </div>
            <button className='submit_form'>Reset password</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export function DeleteNotePopup({ onClose }) {
  return (
    <div className='popup_overlay' onClick={onClose}>
      <div className='popup modern_alert' onClick={(e) => e.stopPropagation()}>
        <div className='popup_content'>
          <div className='icon'>
            <Image alt='' height={40} src={'/assets/dashboard-media/svgs/help.svg'} width={40} />
          </div>
          <h2>Delete Note</h2>
          <p>Deleting a note will permanently remove it from your library</p>
          <div className='buttons_con'>
            <div className='single_btn' onClick={onClose}>
              {' '}
              No, Keep Note{' '}
            </div>
            <div className='single_btn'> Yes, Delete note </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function DeactivateAccount({ onClose }) {
  return (
    <div className='popup_overlay' onClick={onClose}>
      <div className='popup modern_alert small_title' onClick={(e) => e.stopPropagation()}>
        <div className='popup_content'>
          <h2>Deativate Account</h2>
          <p>
            Are you sure you want to deactivate your account? By doing this you will lose all of
            your saved data and will not be able to retrieve it.
          </p>
          <div className='buttons_con'>
            <div className='single_btn' onClick={onClose}>
              {' '}
              Cancel{' '}
            </div>
            <div className='single_btn'> Apply </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function ApprovedPopup({ onClose }) {
  return (
    <div className='popup_overlay' onClick={onClose}>
      <div className='popup modern_alert' onClick={(e) => e.stopPropagation()}>
        <div className='popup_content'>
          <div className='icon'>
            <Image
              alt=''
              height={40}
              src={'/assets/dashboard-media/svgs/check_circle.svg'}
              width={40}
            />
          </div>
          <h2>Approved</h2>
          <p>Welcome to your personal medical portal</p>
          <div className='buttons_con'>
            <div className='single_btn'> Get started </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function SubscibePopup({ onClose }) {
  return (
    <div className='popup_overlay' onClick={onClose}>
      <div className='popup modern_alert' onClick={(e) => e.stopPropagation()}>
        <div className='popup_content'>
          <div className='icon'>
            <Image alt='' height={40} src={'/assets/dashboard-media/svgs/email.svg'} width={40} />
          </div>
          <h2>Subscribe</h2>
          <p>Subscribe to our newsletter & stay updated.</p>
          <div className='email_form'>
            <input placeholder='Your Email' type='email' />
            <button type='submit'>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export function VerificationPopup({ onClose }) {
  const { toast } = useToast();
  let content = '';
  const auth = useCustomContext();
  const router = useRouter();

  const handleChange = (e) => {
    content = e.target.value;
  };

  const handleSubmit = async () => {
    if (!content || content.length < 1) {
      return toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3 className='text-center'>Please enter the code to verify.</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
    try {
      await auth.verifyOTP(content);
      let accountType = auth.acc_type[0];
      let accountTypeName;
      switch (accountType) {
        case USER_ROLE.FREELANCER:
          accountTypeName = 'freelancer';
          break;
        case USER_ROLE.CLIENT:
          accountTypeName = 'client';
          break;
        default:
          accountTypeName = 'client';
          break;
      }
      const url = window.location.href;
      // Create an anchor element to parse the URL
      const parser = document.createElement('a');
      parser.href = url;

      // Extract the pathname and search parameters
      const { pathname, search } = parser;

      // Parse the search parameters to get the 'redirect' value
      const params = new URLSearchParams(search);
      const redirectPath = params.get('redirect');
      // Get the value of the 'redirect' parameter
      if (redirectPath) router.push(redirectPath);
      else router.push(`/dashboard/${accountTypeName}/profile/${auth?.currentProfile?._id}`);
    } catch (err) {
      console.error('error', err);
    }
  };
  return (
    <div className='popup_overlay' onClick={onClose}>
      <div className='popup modern_alert' onClick={(e) => e.stopPropagation()}>
        <div className='popup_content'>
          <div className='icon'>
            <Image alt='' height={40} src={'/assets/dashboard-media/svgs/email.svg'} width={40} />
          </div>
          <h2>Verification</h2>
          <p>Enter your code to confirm your account </p>
          <div className='email_form'>
            <input onChange={handleChange} placeholder='Your Code' type='text' />
            <button onClick={handleSubmit} type='submit'>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export function CodePopup({ onClose }) {
  return (
    <div className='popup_overlay' onClick={onClose}>
      <div className='popup modern_alert' onClick={(e) => e.stopPropagation()}>
        <div className='popup_content'>
          <div className='icon'>
            <Image alt='' height={40} src={'/assets/dashboard-media/svgs/email.svg'} width={40} />
          </div>
          <h2>Code</h2>
          <p>A verification code has been sent to your email, please enter it in the form below </p>
          <div className='email_form'>
            <input placeholder="I've sent you the OTP code." type='text' />
            <button type='submit'>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export function DashboardOptions({ onClose, onSwitchPopup }) {
  return (
    <div className='popup_overlay' onClick={onClose}>
      <div className='popup welcome_popup' onClick={(e) => e.stopPropagation()}>
        <div className='popup_content'>
          <h3>
            Welcome to JOBS<span>3</span>
          </h3>
          <div className='dashboard_options'>
            <div className='sl_button sign_up' onClick={() => onSwitchPopup('SignUp')}>
              Sign Up
            </div>
            <div className='sl_button sign_in' onClick={() => onSwitchPopup('SignIn')}>
              sign In
            </div>

            {/* This Needs to be updated as the above sign up form */}
            <div className='sl_button continue_wallet'>Continue with wallet</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function TypeOfAccount({ onClose, onSwitchPopup }) {
  const { toast } = useToast();
  const account_types = [
    {
      account_desc: 'Freelancers who work on the basis of a gig',
      account_name: 'Freelancer',
      id: 0,
    },
    {
      account_desc: 'People looking for a long-term job and apply on the jobs board',
      account_name: 'Employee',
      id: 1,
    },
    {
      account_desc: 'Companies that can post jobs on the jobs board',
      account_name: 'Employer',
      id: 2,
    },
    {
      account_desc: 'Users who hire people on the basis of a gig',
      account_name: 'Client',
      id: 3,
    },
  ];
  const [choosen_account_types, setChoosenAccountType] = useState([]);

  const auth = useCustomContext();

  const handleAccounType = (name, id) => {
    setChoosenAccountType((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((accountID) => accountID !== id);
      } else {
        let arr = [...prevSelected, id];
        arr.sort((a, b) => a - b);
        return arr;
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (choosen_account_types.length == 0) {
      return toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3 className='text-center'>Please select account types!</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
    console.log('chosen -> ', choosen_account_types);
    auth.setRole(choosen_account_types);
    // onClose()
    onSwitchPopup('SignUp');
  };

  return (
    <div className='popup_overlay' onClick={onClose}>
      <div className='popup type_of_account_popup' onClick={(e) => e.stopPropagation()}>
        <div className='popup_content'>
          <div className='top_heading'>
            <div className='left_side'>
              <h2>Type Of Account</h2>
              <p>Select which account you want to create</p>
            </div>
          </div>
          <form className='form_container' onSubmit={handleSubmit}>
            <div className='all_account_types'>
              {account_types.map((single_acc) => (
                <div className='single_account_type' key={single_acc.id}>
                  <label className='account_type_text' htmlFor={`account_type_${single_acc.id}`}>
                    <h4>{single_acc.account_name}</h4>
                    <p>{single_acc.account_desc}</p>
                  </label>
                  <input
                    id={`account_type_${single_acc.id}`}
                    name='acc_type'
                    onChange={() => {
                      handleAccounType(single_acc.account_name, single_acc.id);
                    }}
                    type='checkbox'
                  />
                  <label className='checkbox_simulate' htmlFor={`account_type_${single_acc.id}`}>
                    <FaCheck />
                  </label>
                </div>
              ))}
            </div>
            <button className='submit_form' type='submit'>
              Continue as{' '}
              {choosen_account_types.length > 0
                ? choosen_account_types
                    .map((id) => account_types.find((acc) => acc.id === id).account_name)
                    .join(', ')
                : 'a selected account type'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
