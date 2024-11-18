'use client'
import * as React from 'react';
import { useSelector } from 'react-redux';
import UpdateButton from '../../components/UpdateButton';
import { Button, Card, TextField, Typography } from '@mui/material';
import { updateUserData } from '@/apis/userApi';

type Form = {
  name?: string;
  address?: string;
}

export default function MainPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorForm, setErrorForm] = React.useState('');
  const [values, setValues] = React.useState<Form | undefined>();

  const { loading, user, error } = useSelector((state: any) => state.user);

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      await updateUserData("8zlazhFtJDiiMENDyWRY", values);
      setIsLoading(false);
    } catch (error) {
      setErrorForm('Failed to login');
    }
  };

  const onHandleChange = React.useCallback((name: string, value?: string) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }))
  }, [user])

  return (
    <div className="flex flex-col gap-2 h-[100vh] items-center justify-center">
      <UpdateButton 
        onSuccess={(values: any) => {
          setValues(values);
        }}
      />
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {user && (
        <div className="max-w-[400px]">
          <Card className="flex flex-col p-4 gap-4">
            <TextField label="Name" value={values?.name || undefined} onChange={(e) => onHandleChange("name", e.target.value)} fullWidth />
            <TextField label="Address" value={values?.address || undefined} onChange={(e) => onHandleChange("address", e.target.value)} fullWidth />
            <Button variant="contained" onClick={handleUpdate} disabled={isLoading}>Update Data</Button>
            {errorForm && <Typography color="error">{errorForm}</Typography>}
          </Card>
        </div>
      )}
    </div>
  );
}