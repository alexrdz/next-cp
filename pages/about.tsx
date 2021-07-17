import useLogin from "../hooks/useLogin";

function AboutPage() {
  const isLoggedin = useLogin(`/about`);

  if (isLoggedin) {
    return <h2>About page</h2>;
  }

  return <p>Loading...</p>;
}

export default AboutPage;
