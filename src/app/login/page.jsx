"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import classes from "./login.module.css";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const router = useRouter();

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const result = await signIn("credentials", {
				redirect: false,
				email,
				password,
			});

			if (result?.error) {
				setLoading(false);
				setErrorMessage(result.error);
			} else {
				router.push("/shop");
			}
		} catch (error) {
			setLoading(false);
			setErrorMessage(error.message);
		}
	};

	return (
		<main className={classes.body}>
			<section className={classes.auth}>
				<h1>Login User</h1>
				<hr />
				<form onSubmit={submitHandler}>
					<div className={classes.control}>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							required
							value={email}
							placeholder="user@gmail.com"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor="password">Password</label>
						<div className={classes.passwordWrapper}>
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								required
								value={password}
								placeholder="Enter your password"
								onChange={(e) => setPassword(e.target.value)}
							/>
							<span
								className={classes.togglePassword}
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? "🙈" : "👁️"}
							</span>
						</div>
					</div>
					<div className={classes.actions}>
						{!isLoading && <button>Login</button>}
						{isLoading && <p>Sending request...</p>}
						{errorMessage && (
							<h3 className={classes.errorMessage}>{errorMessage}</h3>
						)}
					</div>
				</form>
			</section>
		</main>
	);
}


// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import classes from "./login.module.css";
// import { signIn } from "next-auth/react";

// export default function Login() {
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [isLoading, setLoading] = useState(false);
// 	const [errorMessage, setErrorMessage] = useState("");

// 	const router = useRouter();

// 	const submitHandler = async (e) => {
// 		e.preventDefault();
// 		setLoading(true);
// 		try {
// 			const result = await signIn("credentials", {
// 				redirect: false,
// 				email,
// 				password,
// 			});

// 			if (result?.error) {
// 				setLoading(false);
// 				setErrorMessage(result.error);
// 			} else {
// 				router.push("/shop");
// 			}
// 		} catch (error) {
// 			setLoading(false);
// 			setErrorMessage(error.message);
// 		}
// 	};

// 	return (
// 		<main className={classes.body}>
// 			<section className={classes.auth}>
// 				<h1>Login User</h1>
// 				<hr />
// 				<br />
// 				<form onSubmit={submitHandler}>
// 					<div className={classes.control}>
// 						<label htmlFor="email">Email</label>
// 						<input
// 							type="email"
// 							id="email"
// 							required
// 							value={email}
// 							placeholder="user@gmail.com"
// 							onChange={(e) => setEmail(e.target.value)}
// 						/>
// 					</div>
// 					<div className={classes.control}>
// 						<label htmlFor="password">Password</label>
// 						<input
// 							type="password"
// 							id="password"
// 							required
// 							value={password}
// 							placeholder="Enter your password"
// 							onChange={(e) => setPassword(e.target.value)}
// 						/>
// 					</div>
// 					<div className={classes.actions}>
// 						{!isLoading && <button>Login</button>}
// 						{isLoading && <p>Sending request...</p>}
// 						<br />
// 						{errorMessage && (
// 							<h3 style={{ color: "red", fontSize: "20px" }}>{errorMessage}</h3>
// 						)}
// 					</div>
// 				</form>
// 			</section>
// 		</main>
// 	);
// }