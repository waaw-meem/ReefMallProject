import UserProfile from "@/app/component/Accounts/Dashboard/UserProfile";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'My Profile - Reef Mall',
}

const UserProfilePage = () => {
  return <UserProfile />;
};

export default UserProfilePage;
