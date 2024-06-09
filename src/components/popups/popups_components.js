import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useRouter, useSearchParams } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";
import { useCustomContext } from "@/context/use-custom";
import { useToast } from "@/components/ui/use-toast";

// Icons
import { FaCheck } from "react-icons/fa";

export function SignUpPopup({ onClose, onSwitchPopup }) {
    const { toast } = useToast();
	const searchParams = useSearchParams();
	const [email, setEmail] = useState(null)
	const [name, setName] = useState(null)
	const [password, setPassword] = useState(null)
	const [confirmPwd, setConfirmPwd] = useState(null)
	const [referralUser, setReferralUser] = useState(null)
	const [referrer, setReferrer] = useState("");
	const [accept, setAccept] = useState(null)
	
	const auth = useCustomContext()
	const { open } = useWeb3Modal()
	const router = useRouter()
	
	const { address, isConnected, isDisconnected } = useAccount()
	
	useEffect(() => {
		const tmp = searchParams.get('referrer');
		setReferrer(tmp);
	}, []);

	useEffect(() => {
		if (isConnected) {
			try {
				auth.signUpwithWallet(address)
				onClose()
			} catch (err) {
				console.log(err)
				// router.replace('/')
			}
		}
	}, [isConnected, isDisconnected, address, auth, onClose])

	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};
	function checkInput(ev, attr) {
		// Check if input is empty
		if (ev.target.value.trim() !== "") {
			ev.target.classList.add("not_empty");

			// Validate Email If input is not empty
			console.log(ev.target.getAttribute("type"));
			if (ev.target.getAttribute("type") == "email") {
				if (!validateEmail(ev.target.value)) {
					ev.target
						.closest(".field_container")
						.classList.add("field_error");
				} else {
					ev.target
						.closest(".field_container")
						?.classList.remove("field_error");
					setEmail(ev.target.value)
				}
			}
			if (attr === "name") {
				if (ev.target.value.length < 1) {
					ev.target
						.closest(".field_container")
						.classList.add("field_error");
				} else {
					ev.target
						.closest(".field_container")
						?.classList.remove("field_error");
					setName(ev.target.value)
				}
			}
			if (attr === "password") {
				console.log(ev.target.value)
				if (ev.target.value.length < 8) {
					ev.target
						.closest(".field_container")
						.classList.add("field_error");
				} else {
					ev.target
						.closest(".field_container")
						?.classList.remove("field_error");
					setPassword(ev.target.value)
				}
			}
			if (attr === "confirmPassword") {
				console.log(password, "   ===   ", ev.target.value)
				if (ev.target.value.length < 8 || !password || password !== ev.target.value) {
					ev.target
						.closest(".field_container")
						.classList.add("field_error");
				} else {
					ev.target
						.closest(".field_container")
						?.classList.remove("field_error");
					setConfirmPwd(ev.target.value)
				}
			}
			if (attr === "referralUser") {
				console.log(referralUser, "   ===   ", ev.target.value);
				ev.target
						.closest(".field_container")
						?.classList.remove("field_error");
					setReferralUser(ev.target.value);
			}
			if (attr === "accept") {
				if (!ev.target.checked) {
					ev.target
						.closest(".acceptance")
						.classList.add("field_error");
				} else {
					ev.target
						.closest(".acceptance")
						?.classList.remove("field_error");
				}
				setAccept(ev.target.value)
			}
		} else {
			ev.target.classList.remove("not_empty");
		}
	}

	const validateUserInfo = () => {
		if (!name || !email || !password || !confirmPwd || !accept) {
			return false;
		}
		console.log('1111')
		if (name.length === 0 || !validateEmail(email) || password.length < 8 || confirmPwd.length < 8 || password !== confirmPwd || !accept) {
			return false
		}
		console.log('222')
		return true
	}

	const onRegisterSubmit = async (e) => {
		if (!validateUserInfo()) {
			console.log('validate error!')
			window.alert('Please check your infomation')
			return false;
		}
		console.log('clicked')
		try {
			const verified = await auth.register({ name, email, password, referralUser, referrer })
			if (!verified) onSwitchPopup("Verification")
			else router.push('/jobs')
		} catch (err) {
			console.log('error => ', err);
			return toast({
				variant: "destructive",
				title: <h1 className='text-center'>Error</h1>,
                description: <h3 className='text-center'>Email already Exists!</h3>,
                className: "bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center"
			})
		}
	}

	return (
		<div className="popup_overlay" onClick={onClose}>
			<div className="popup" onClick={(e) => e.stopPropagation()}>
				<div className="popup_content">
					<div className="top_heading">
						<div className="left_side">
							<h2>Sign up</h2>
							<p>Enter your details below</p>
						</div>
						<div className="right_side">
							<button
								onClick={() => {
									onSwitchPopup("SignIn");
								}}
							>
								Log in
							</button>
						</div>
					</div>
					<div className="form_container sign_up">
						<div className="field_container">
							<input
								type="text"
								id="sign_up_full_name"
								onChange={(ev) => {
									checkInput(ev, 'name');
								}}
							/>
							<label htmlFor="sign_up_full_name">Full name</label>
							<span className="error_message">
								Please enter your full name.
							</span>
						</div>
						<div className="field_container">
							<input
								type="email"
								id="sign_up_email"
								onChange={(ev) => {
									checkInput(ev, 'email');
								}}
							/>
							<label htmlFor="sign_up_email">Email address</label>
							<span className="error_message">
								That format doesn&apos;t look right. Make sure
								there aren&apos;t any typos.
							</span>
						</div>
						<div className="field_container">
							<input
								type="password"
								id="sign_up_password"
								onChange={(ev) => {
									checkInput(ev, 'password');
								}}
							/>
							<label htmlFor="sign_up_password">
								Create Password
							</label>
							<span className="error_message">
								The length of password should be more than 8 characters.
							</span>
						</div>
						<div className="field_container">
							<input
								type="password"
								id="sign_up_confirm_password"
								onChange={(ev) => {
									checkInput(ev, 'confirmPassword');
								}}
							/>
							<label htmlFor="sign_up_confirm_password">
								Confirm Password
							</label>
							<span className="error_message">
								The confirm password should be more than 8 characters and matched with your password.
							</span>
						</div>
						{!referrer &&
							<div className="field_container">
								<input
									type="text"
									id="referral_user"
									onChange={(ev) => {
										checkInput(ev, 'referralUser');
									}}
								/>
								<label htmlFor="referral_user">
									Referral User
								</label>
								<span className="error_message">
									
								</span>
							</div>
						}
						<div className="acceptance">
							<input
								type="checkbox"
								id="acceptance"
								onChange={(ev) => {
									checkInput(ev, 'accept');
								}}
							/>
							<label htmlFor="acceptance" style={{ marginLeft: 10 }}>
								By creating an account you agree to Privacy
								Policy
							</label>
						</div>
						<button type="submit" className="submit_form" onClick={onRegisterSubmit}>Sign Up</button>
						<button className="wallet_continue" onClick={() => open()}>
							Continue with wallet
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
export function SignInPopup({ onClose, onSwitchPopup }) {
	const [email, setEmail] = useState(null)
	const [password, setPassword] = useState(null)
	const [accept, setAccept] = useState(null)

	const auth = useCustomContext()
	const { open } = useWeb3Modal()
	const router = useRouter()

	const { address, isConnected, isDisconnected } = useAccount()

	useEffect(() => {
		if (isConnected) {
			try {
				auth.signInwithWallet(address)
			} catch (err) {
				console.log(err)
				// router.replace('/')
			}
		}
	}, [isConnected, isDisconnected, address, auth])

	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};
	function checkInput(ev, type) {
		// Check if input is empty
		if (ev.target.value.trim() !== "") {
			ev.target.classList.add("not_empty");

			// Validate Email If input is not empty
			console.log(ev.target.getAttribute("type"));
			if (ev.target.getAttribute("type") == "email") {
				if (!validateEmail(ev.target.value)) {
					ev.target
						.closest(".field_container")
						.classList.add("field_error");
				} else {
					ev.target
						.closest(".field_container")
						.classList.remove("field_error");
					setEmail(ev.target.value)
				}
			}
			if (type === 'password') {
				if (ev.target.value.length < 8) {
					ev.target
						.closest(".field_container")
						.classList.add("field_error");
				} else {
					ev.target
						.closest(".field_container")
						.classList.remove("field_error");
					setPassword(ev.target.value)
				}
			}
			if (type === "accept") {
				if (!ev.target.checked) {
					ev.target
						.closest(".acceptance")
						.classList.add("field_error");
				} else {
					ev.target
						.closest(".acceptance")
						?.classList.remove("field_error");
				}
				setAccept(ev.target.checked)
			}
		} else {
			ev.target.classList.remove("not_empty");
		}
	}

	const handleLogin = async (e) => {
		console.log(email, password, accept)
		if (!email || !password || password.length < 8 || !validateEmail(email)) {
			alert("Please check your information.")
			return false;
		}
		try {
			await auth.login({ email, password });
			router.push('/jobs')
		} catch (err) {
			alert("Please register first.")
			console.log(err)
		}
	}
	return (
		<div className="popup_overlay" onClick={onClose}>
			<div className="popup sign_in" onClick={(e) => e.stopPropagation()}>
				<div className="popup_content">
					<div className="top_heading">
						<div className="left_side">
							<h2>Sign In</h2>
							<p>Welcome back</p>
						</div>
						<div className="right_side">
							<button
								onClick={() => {
									onSwitchPopup("SignUp");
								}}
							>
								Sign up
							</button>
						</div>
					</div>
					<div className="form_container">
						<div className="field_container">
							<input
								type="email"
								id="sign_in_email"
								onChange={(ev) => {
									checkInput(ev, 'email');
								}}
							/>
							<label htmlFor="sign_in_email">Email address</label>
							<span className="error_message">
								That format doesn&apos;t look right. Make sure
								there aren&apos;t any typos.
							</span>
						</div>
						<div className="field_container">
							<input
								type="password"
								id="sign_in_password"
								onChange={(ev) => {
									checkInput(ev, 'password');
								}}
							/>
							<label htmlFor="sign_in_password">
								Create Password
							</label>
							<span className="error_message">
								Please type your password here.
							</span>
						</div>
						<div className="acceptance">
							<input
								type="checkbox"
								id="acceptance"
								onChange={(ev) => {
									checkInput(ev, 'accept');
								}}
							/>
							<label htmlFor="acceptance">
								Keep me logged in
							</label>
						</div>
						<button className="submit_form" onClick={handleLogin}>Log in</button>
						<button className="wallet_continue" onClick={() => open()}>
							Continue with wallet
						</button>
						<span className="forgot_password">
							Forgot password?
						</span>
					</div>
				</div>
				<div className="divider">
					<span>or</span>
				</div>
				<div className="popup_content">
					<div className="login_options">
						<div className="option_login facebook">
							<div className="icon">
								<Image
									src={
										"/assets/dashboard-media/svgs/social/facebook.svg"
									}
									width={40}
									height={40}
									alt=""
								/>
							</div>
							<span>Sign in with Facebook</span>
						</div>
						<div className="option_login twitter">
							<div className="icon">
								<Image
									src={
										"/assets/dashboard-media/svgs/social/x_twitter.svg"
									}
									width={40}
									height={40}
									alt=""
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
		if (ev.target.value.trim() !== "") {
			ev.target.classList.add("not_empty");

			// Validate Email If input is not empty
			console.log(ev.target.getAttribute("type"));
			if (ev.target.getAttribute("type") == "email") {
				if (!validateEmail(ev.target.value)) {
					ev.target
						.closest(".field_container")
						.classList.add("field_error");
				} else {
					ev.target
						.closest(".field_container")
						.classList.remove("field_error");
				}
			}
		} else {
			ev.target.classList.remove("not_empty");
		}
	}
	return (
		<div className="popup_overlay" onClick={onClose}>
			<div
				className="popup reset_password"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="popup_content">
					<div className="top_heading">
						<div className="left_side">
							<h2>Password reset</h2>
							<p>
								We&apos;ll help you reset it and get back on
								track.
							</p>
						</div>
						<div className="right_side">
							<span>Back</span>
						</div>
					</div>
					<div className="form_container">
						<div className="field_container">
							<input
								type="email"
								id="sign_in_email"
								onChange={(ev) => {
									checkInput(ev);
								}}
							/>
							<label htmlFor="sign_in_email">Email address</label>
							<span className="error_message">
								That format doesn&apos;t look right. Make sure
								there aren&apos;t any typos.
							</span>
						</div>
						<div className="acceptance">
							<input
								type="checkbox"
								id="acceptance"
								onChange={(ev) => {
									checkInput(ev);
								}}
							/>
							<label htmlFor="acceptance">
								Keep me logged in
							</label>
						</div>
						<button className="submit_form">Reset password</button>
					</div>
				</div>
			</div>
		</div>
	);
}
export function DeleteNotePopup({ onClose }) {
	return (
		<div className="popup_overlay" onClick={onClose}>
			<div
				className="popup modern_alert"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="popup_content">
					<div className="icon">
						<Image
							src={"/assets/dashboard-media/svgs/help.svg"}
							width={40}
							height={40}
							alt=""
						/>
					</div>
					<h2>Delete Note</h2>
					<p>
						Deleting a note will permanently remove it from your
						library
					</p>
					<div className="buttons_con">
						<div className="single_btn" onClick={onClose}>
							{" "}
							No, Keep Note{" "}
						</div>
						<div className="single_btn"> Yes, Delete note </div>
					</div>
				</div>
			</div>
		</div>
	);
}
export function DeactivateAccount({ onClose }) {
	return (
		<div className="popup_overlay" onClick={onClose}>
			<div
				className="popup modern_alert small_title"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="popup_content">
					<h2>Deativate Account</h2>
					<p>
						Are you sure you want to deactivate your account? By
						doing this you will lose all of your saved data and will
						not be able to retrieve it.
					</p>
					<div className="buttons_con">
						<div className="single_btn" onClick={onClose}>
							{" "}
							Cancel{" "}
						</div>
						<div className="single_btn"> Apply </div>
					</div>
				</div>
			</div>
		</div>
	);
}
export function ApprovedPopup({ onClose }) {
	return (
		<div className="popup_overlay" onClick={onClose}>
			<div
				className="popup modern_alert"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="popup_content">
					<div className="icon">
						<Image
							src={
								"/assets/dashboard-media/svgs/check_circle.svg"
							}
							width={40}
							height={40}
							alt=""
						/>
					</div>
					<h2>Approved</h2>
					<p>Welcome to your personal medical portal</p>
					<div className="buttons_con">
						<div className="single_btn"> Get started </div>
					</div>
				</div>
			</div>
		</div>
	);
}
export function SubscibePopup({ onClose }) {
	return (
		<div className="popup_overlay" onClick={onClose}>
			<div
				className="popup modern_alert"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="popup_content">
					<div className="icon">
						<Image
							src={"/assets/dashboard-media/svgs/email.svg"}
							width={40}
							height={40}
							alt=""
						/>
					</div>
					<h2>Subscribe</h2>
					<p>Subscribe to our newsletter & stay updated.</p>
					<div className="email_form">
						<input type="email" placeholder="Your Email" />
						<button type="submit">Submit</button>
					</div>
				</div>
			</div>
		</div>
	);
}
export function VerificationPopup({ onClose }) {
	let content = "";
	const auth = useCustomContext()
	const router = useRouter()

	const handleChange = (e) => {
		content = e.target.value
	}

	const handleSubmit = async (e) => {
		if (!content || content.length < 1) {
			alert('Please enter the code to verify')
			return false;
		}
		try {
			await auth.verifyOTP(content)
			router.push('/jobs')
		} catch (err) {
			console.log('error', err)
		}
	}
	return (
		<div className="popup_overlay" onClick={onClose}>
			<div
				className="popup modern_alert"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="popup_content">
					<div className="icon">
						<Image
							src={"/assets/dashboard-media/svgs/email.svg"}
							width={40}
							height={40}
							alt=""
						/>
					</div>
					<h2>Verification</h2>
					<p>Enter your code to confirm your account </p>
					<div className="email_form">
						<input type="text" placeholder="Your Code" onChange={handleChange} />
						<button type="submit" onClick={handleSubmit}>Submit</button>
					</div>
				</div>
			</div>
		</div>
	);
}
export function CodePopup({ onClose }) {
	return (
		<div className="popup_overlay" onClick={onClose}>
			<div
				className="popup modern_alert"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="popup_content">
					<div className="icon">
						<Image
							src={"/assets/dashboard-media/svgs/email.svg"}
							width={40}
							height={40}
							alt=""
						/>
					</div>
					<h2>Code</h2>
					<p>
						A verification code has been sent to your email, please
						enter it in the form below{" "}
					</p>
					<div className="email_form">
						<input type="text" placeholder="I've sent you the OTP code." />
						<button type="submit">Submit</button>
					</div>
				</div>
			</div>
		</div>
	);
}
export function DashboardOptions({ onClose, onSwitchPopup }) {
	return (
		<div className="popup_overlay" onClick={onClose}>
			<div
				className="popup welcome_popup"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="popup_content">
					<h3>
						Welcome to JOBS<span>3</span>
					</h3>
					<div className="dashboard_options">
						<div
							className="sl_button sign_up"
							onClick={() => onSwitchPopup("SignUp")}
						>
							Sign Up
						</div>
						<div
							className="sl_button sign_in"
							onClick={() => onSwitchPopup("SignIn")}
						>
							sign In
						</div>

						{/* This Needs to be updated as the above sign up form */}
						<div className="sl_button continue_wallet">
							Continue with wallet
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export function TypeOfAccount({ onClose, onSwitchPopup }) {
	const account_types = [
		{
			id: 0,
			account_name: 'Freelancer',
			account_desc: 'Freelancers who work on the basis of a gig',
		},
		{
			id: 1,
			account_name: 'Employee',
			account_desc: 'People looking for a long-term job and apply on the Jobs Board',
		},
		{
			id: 2,
			account_name: 'Employer',
			account_desc: 'Companies that can post jobs on the Jobs Board',
		},
		{
			id: 3,
			account_name: 'Client',
			account_desc: 'Users who hire people on the basis of a gig',
		}
	]
	const [choosen_account_type, setChoosenAccountType] = useState(account_types[0].account_name)

	const auth = useCustomContext()

	const handleAccounType = (name, id) => {
		auth.setRole(id)
		setChoosenAccountType(name)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		// onClose()
		onSwitchPopup("SignUp")
	}

	return (
		<div className="popup_overlay" onClick={onClose}>
			<div
				className="popup type_of_account_popup"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="popup_content">
					<div className="top_heading">
						<div className="left_side">
							<h2>
								Type Of Account
							</h2>
							<p>Select which account you want to create</p>
						</div>
					</div>
					<form className="form_container" onSubmit={handleSubmit}>
						<div className="all_account_types">
							{account_types.map((single_acc) => (
								<div className="single_account_type" key={single_acc.id}>
									<label
										className="account_type_text"
										htmlFor={`account_type_${single_acc.id}`}>
										<h4>{single_acc.account_name}</h4>
										<p>{single_acc.account_desc}</p>
									</label>
									<input id={`account_type_${single_acc.id}`} type="radio" name="acc_type"
										onChange={() => { handleAccounType(single_acc.account_name, single_acc.id) }}
									/>
									<label className="checkbox_simulate"
										htmlFor={`account_type_${single_acc.id}`}>
										<FaCheck />
									</label>
								</div>
							))}
						</div>
						<button className="submit_form" type="submit">Continue as a {choosen_account_type}</button>
					</form>
				</div>
			</div>
		</div>
	);
}
