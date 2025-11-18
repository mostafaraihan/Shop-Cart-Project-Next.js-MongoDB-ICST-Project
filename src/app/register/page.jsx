"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import classes from "@/app/login/login.module.css";

const Register = () => {
	const [name, setName] = useState("");
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
			const res = await fetch("/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, password }),
			});
			const data = await res.json();
			if (!res.ok) {
				setLoading(false);
				setErrorMessage(data?.err || "Registration failed");
			} else {
				router.push("/login");
			}
		} catch (error) {
			setLoading(false);
			setErrorMessage(error.message);
		}
	};

	return (
		<main className={classes.body}>
			<section className={classes.auth}>
				<h1>Register a New User</h1>
				<hr />
				<form onSubmit={submitHandler}>
					<div className={classes.control}>
						<label htmlFor="name">Name</label>
						<input
							type="text"
							id="name"
							required
							value={name}
							placeholder="Username"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
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
						{!isLoading && <button>Register</button>}
						{isLoading && <p>Creating account...</p>}
						{errorMessage && (
							<p className={classes.errorMessage}>{errorMessage}</p>
						)}
					</div>
				</form>
			</section>
		</main>
	);
};

export default Register;


// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import classes from "@/app/login/login.module.css";

// const Register = () => {
// 	const [name, setName] = useState("");
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [isLoading, setLoading] = useState(false);
// 	const [errorMessage, setErrorMessage] = useState("");

// 	const router = useRouter();

// 	const submitHandler = async (e) => {
// 		e.preventDefault();
// 		setLoading(true);
// 		try {
// 			const res = await fetch("/api/register", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({ name, email, password }),
// 			});
// 			const data = await res.json();
// 			if (!res.ok) {
// 				setLoading(false);
// 				setErrorMessage(data?.err);
// 			} else {
// 				router.push("/login");
// 			}
// 		} catch (error) {
// 			setLoading(false);
// 			setErrorMessage(error.message);
// 		}
// 	};

// 	return (
// 		<main className={classes.body}>
// 			<section className={classes.auth}>
// 				<h1>Register a New User</h1>
// 				<hr />
// 				<br />
// 				<form onSubmit={submitHandler}>
// 					<div className={classes.control}>
// 						<label htmlFor="name">Name</label>
// 						<input
// 							type="text"
// 							id="name"
// 							required
// 							value={name}
//                             placeholder="username"
// 							onChange={(e) => setName(e.target.value)}
// 						/>
// 					</div>
// 					<div className={classes.control}>
// 						<label htmlFor="email">Email</label>
// 						<input
// 							type="email"
// 							id="email"
// 							required
// 							value={email}
//                             placeholder="user@gmail.com"
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
// 						{!isLoading && <button>Register</button>}
// 						{isLoading && <p>Create a New User</p>}
// 						<br />
// 						{errorMessage && (
// 							<p style={{ color: "red", fontSize: "20px" }}>User already exists</p>
// 						)}
// 					</div>
// 				</form>
// 			</section>
// 		</main>
// 	);
// };

// export default Register;