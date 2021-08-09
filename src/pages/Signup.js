import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import FirebaseContext from "../context/firebase";
import { doesUserNameExists } from "../services/firebase";
import * as ROUTES from "../constants/routes";

const Signup = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");

  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const isInvalid = password === "" || emailAddress === "";

  useEffect(() => {
    document.title = "Signup - Instagram";
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    const userNameExists = await doesUserNameExists(username);

    if (!userNameExists) {
      try {
        //  Authentication
        // -> emailAddress & password & username

        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);
        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        // Firestore user collection (create a document)
        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
          followers: []
        });

        // Push to Dashboard
        history.push(ROUTES.DASHBOARD);
      } catch (err) {
        setFullName("");
        setEmailAddress("");
        setPassword("");
        setError(err.message);
      }
    } else {
      // Set username to '' and setError
      setUsername("");
      setError("Username is already taken, please try another.");
    }
  };

  return (
    <div className="container flex max-w-screen-md items-center mx-auto h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="Iphone with Instagram"
        />
      </div>
      <div className="flex flex-col w-2/5 ">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="images/logo.png"
              alt="Instagram"
              className="mt-2 w-6/12  mb-4"
            />
          </h1>

          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleLogin}>
            <input
              aria-label="Enter your Username"
              type="text"
              value={username}
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              aria-label="Enter your Full Name"
              type="text"
              value={fullName}
              placeholder="Your Full Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(event) => setFullName(event.target.value)}
            />
            <input
              aria-label="Enter your email address"
              type="email"
              value={emailAddress}
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(event) => setEmailAddress(event.target.value)}
            />
            <input
              aria-label="Enter your Password"
              type="password"
              value={password}
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                isInvalid && `opacity-50`
              }`}
            >
              SignUp
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
