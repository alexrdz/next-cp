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

    if (authData.username) {
      router.push(referer);
    }
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <input onChange={handleInputChange} name="user" type="text" />
      <input onChange={handleInputChange} name="password" type="password" />
      <button type="submit">login</button>
    </form>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { referer } = context.query;

  return {
    props: { referer },
  };
}

export default Login;
