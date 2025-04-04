import {LoginBox, Header} from "../components/LoginSignup";


function Login() {
  const loginHeading = "Log in to Cartoonopia";
    return (
      <>
        <Header heading={loginHeading}/>
        <LoginBox />
      </>
    );
}

export default Login