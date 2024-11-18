'use client'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Card, Container, TextField, Typography } from '@mui/material';
import { auth } from "@/apis/firebaseConfig";
import { useDispatch } from 'react-redux';
import { setToken } from "@/apis/fetch";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setToken((userCredential?.user as any)?.accessToken)

      router.push('/main');
    } catch (error) {
      setError('Failed to login');
    }
  };

  return (
    <div className="flex h-[100vh] items-center justify-center">
      <div className="max-w-[400px]">
        <Card className="flex flex-col p-4 gap-4">
          <Typography variant="h6" component="h6">Login</Typography>
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
          <Button variant="contained" onClick={handleLogin}>Login</Button>
          {error && <Typography color="error">{error}</Typography>}
        </Card>
      </div>
    </div>
  );
}
