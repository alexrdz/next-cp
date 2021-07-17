import Link from "next/link";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

interface LoginProps {
  referer: string;
}
function Login({ referer }: LoginProps) {
  const router = useRouter();
  const [userData, setUserData] = useState<{
    user: string;
    password: string;
  }>({
    user: "",
    password: "",
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { user, password } = userData;

    const authRes = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        password,
      }),
    });

    const authData = await authRes.json();
    if (authData.user) {
      router.push(referer);
    }
  }

  return (
    <div className="bg-gray-100 h-screen pt-48">
      <div className="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage: `url(
            "https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80"
          )`,
          }}
        ></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">
            <Link href="/">Brand</Link>
          </h2>

          <p className="text-xl text-center text-gray-600 dark:text-gray-200">
            Welcome back!
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <a
              href="#"
              className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              login with your username
            </a>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          <form onSubmit={handleOnSubmit}>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingEmailAddress"
              >
                Username
              </label>
              <input
                id="user"
                name="user"
                onChange={handleInputChange}
                value={userData.user}
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                type="text"
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
                >
                  Forget Password?
                </a>
              </div>

              <input
                id="password"
                type="password"
                onChange={handleInputChange}
                name="password"
                value={userData.password}
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Login
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <a
              href="#"
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or sign up
            </a>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
    /*
    <div className="h-screen bg-gray-900 font-nunito">
      <div id="app">
        <nav className="bg-gray-800 shadow-sm">
          <div className="container flex justify-between items-center mx-auto px-6 py-4">
            <div>
              <Link href="/">
                <a className="text-xl text-white">Brand</a>
              </Link>
            </div>

            <div>
              <Link href="/login">
                <a className="text-gray-400 font-light mx-4 hover:underline">
                  Login
                </a>
              </Link>
              <Link href="/register">
                <a className="text-gray-400 font-light hover:underline">
                  Register
                </a>
              </Link>
            </div>
          </div>
        </nav>

        <main>
          <div className="flex items-center justify-center mt-16 mx-6">
            <div className="p-6 max-w-sm w-full bg-gray-800 shadow rounded-md">
              <h3 className="text-white text-xl text-center">Login</h3>

              <form className="mt-4" onSubmit={handleOnSubmit}>
                <label className="block">
                  <span className="text-white text-sm">Username</span>
                  <input
                    type="text"
                    id="name"
                    name="user"
                    onChange={handleInputChange}
                    className="form-input mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
                    value={userData.user}
                    required
                    autoFocus
                  />
                </label>

                <label className="block mt-3">
                  <span className="text-white text-sm">Password</span>
                  <input
                    id="password"
                    type="password"
                    onChange={handleInputChange}
                    className="form-input mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
                    name="password"
                    value={userData.password}
                    required
                    autoComplete="current-password"
                  />
                </label>

                <div className="flex justify-between items-center mt-4">
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox text-blue-500 bg-gray-800 border-gray-600"
                        name="remember"
                        id="remember"
                      />
                      <span className="mx-2 text-gray-200 text-sm">
                        Remember Me
                      </span>
                    </label>
                  </div>

                  <div>
                    <a
                      className="block text-sm text-blue-500 hover:underline"
                      href="http://localhost:8000/password/reset"
                    >
                      Forgot Your Password?
                    </a>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 text-center bg-blue-600 rounded-md text-white text-sm hover:bg-blue-500 focus:outline-none"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
    */
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { referer } = context.query;

  return {
    props: { referer: referer || "/" },
  };
}

export default Login;
