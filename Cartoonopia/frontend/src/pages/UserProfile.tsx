import { Header} from "../components/LoginSignup";
import UserProfileComponents from "../components/UserProfileComponents";

function UserProfile() {
  const signupHeading = "User Profile";
  return (
    <>
      <Header heading={signupHeading} />
      <UserProfileComponents/>
    </>
  );
}

export default UserProfile;
