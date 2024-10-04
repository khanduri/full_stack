// import { toast } from "react-toastify";

import Title from "components/convention/title";
import { useAuth } from "components/hooks/useAuth";
import Logo from "images/logo";
import { useEffect, useState } from "react";
import { Link, redirect, useNavigate, useSearchParams } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import { access } from "fs";
import API from "utils/xhr";
import { saveLoginMeta, saveToken } from "utils/authentication";
import LoadingSVG from "images/loading";

export default function Login() {
  const [email, setEmail] = useState("");

  function sendEmailCode(e: any, email: string) {
    e.preventDefault();

    if (email === null || email === undefined || email === "") {
    } else {
      // TODO: record email

      const resolveAfter3Sec = new Promise((resolve, reject) =>
        setTimeout(reject, 3000)
      );
      let formData = new FormData() as any;
      formData.append("email", email);
      formData.append("form-name", "login");
    }
  }

  function onChange(email: string) {
    setEmail(email);
  }

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const login_google = useGoogleLogin({
    onSuccess: (response) => handleLoginSuccess("google", response),
  });

  const handleLoginSuccess = (service: string, response: any) => {
    const access_token = response.access_token;
    // login(access_token);
    // saveToken(access_token);

    const headers = {
      headers: { Authorization: "Bearer " + access_token },
    };
    const url = "/users/auth/" + service;
    API.post(url, {}, headers).then(
      (response: any) => {
        const success = response.data.meta.success;
        if (success) {
          var jwt_token = response.data.data.token;
          saveToken(jwt_token);
          saveLoginMeta(response.data.data.meta);
          login(jwt_token);
          setLoading(false);
        } else {
          alert(response.data.data.message);
        }
      },
      (error: any) => {
        setLoading(false);
      }
    );
  };

  function demoLogin(e: any) {
    e.preventDefault();

    // saveToken("DEMO_LOGIN");
    console.log(login);
    login("DEMO_LOGIN");
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex h-screen justify-center">
        <div
          className="hidden bg-auto lg:block lg:w-2/3"
          style={{
            backgroundImage: `url(static/images/zig-zag.svg)`,
          }}
        >
          <div className="flex h-full items-center bg-gray-900 bg-opacity-70 px-20 text-gray-100">
            <div>
              <Title type="section" className="mb-8 text-2xl">
                <i className="text-action-300">Full Stack</i> Assessment
              </Title>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-md items-center px-6 lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex w-full justify-center text-gray-800">
                <Link to="/" className="">
                  <Logo className="h-32 w-32"></Logo>
                </Link>
              </div>

              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Sign in to access your account
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6 ">
                <button
                  className="bg-red-600 hover:bg-red-500 text-white border py-2 w-full rounded-md mt-5 flex justify-center items-center transition-colors duration-200"
                  onClick={() => login_google()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 488 512"
                  >
                    <path
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="ml-4">Login with Google</span>
                </button>

                <button
                  className="bg-green-600 hover:bg-green-500 text-white border py-2 w-full rounded-md mt-5 flex justify-center items-center transition-colors duration-200"
                  onClick={demoLogin}
                >
                  <span className="ml-4">Demo Login</span>
                </button>
              </div>
              {loading ? (
                <div className="w-full flex justify-center p-2 ">
                  <LoadingSVG className="text-center h-10 w-10 text-green-700 " />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
