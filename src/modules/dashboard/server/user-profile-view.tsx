import { ProfileEditForm } from "../client/profile-edit-form";

export async function UserProfileView() {
  const userProfileData = {
    name: "হৃদয় চৌধুরী",
    phone: "01800000000",
    email: "hridoy@example.com",
    role: "ভেরিফাইড ইউজার",
  };

  return <ProfileEditForm user={userProfileData} />;
}