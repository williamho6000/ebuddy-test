import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../apis/userApi';
import { fetchUserStart, fetchUserSuccess, fetchUserError } from '../store/reducers';

const UpdateButton = ({ onSuccess }: any) => {
  const dispatch = useDispatch();
  const handleClick = async () => {
    dispatch(fetchUserStart());
    try {
      const userInfo = await fetchUserData('8zlazhFtJDiiMENDyWRY');
      onSuccess(userInfo)
      dispatch(fetchUserSuccess(userInfo));
    } catch (error) {
      dispatch(fetchUserError('Failed to fetch user data'));
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      Fetch User Data
    </Button>
  );
};

export default UpdateButton;