import { useContext } from 'react';
import UserInfo from './UserInfo';
import UserContext from '../UserContext';

function ProfilePage() {
  const userData = useContext(UserContext);
  return <UserInfo />;
}

export default ProfilePage;