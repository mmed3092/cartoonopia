import {Header, SignupBox} from "../components/LoginSignup";

function Signup() {
  const signupHeading = "Sign up to Cartoonopia";
  return (
    <>
    <Header heading={signupHeading}/>
    <SignupBox/>
    </>
  )
}

export default Signup;
