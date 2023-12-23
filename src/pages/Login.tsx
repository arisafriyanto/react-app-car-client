import styled from '@emotion/styled';
import { Button, TextField, Alert, AlertProps } from '@mui/material';
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import PublicProvider from '../providers/PublicProvider';

const LoginContainerStyled = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: stretch;
    height: 100vh;
`;

const Form = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Background = styled.div`
    flex: 2;
`;

interface IAlert extends AlertProps {
    message: string;
}

export default function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [alert, setAlert] = useState<IAlert | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', { username, password });

            localStorage.setItem('token', response?.data?.data.token);

            setAlert({
                message: 'Login success!',
                severity: 'success',
            });
        } catch (error) {
            if (error instanceof AxiosError) {
                return setAlert({
                    message: error?.response?.data?.message || 'An error occurred',
                    severity: 'error',
                });
            }
            setAlert({
                message: 'Failed',
                severity: 'error',
            });
        }
    };

    return (
        <PublicProvider>
            <LoginContainerStyled>
                <Form onSubmit={handleSubmit}>
                    <div style={{ width: '75%' }}>
                        {alert && alert.message && <Alert severity={alert.severity}>{alert.message}</Alert>}

                        <img
                            src={
                                'https://res.cloudinary.com/dhwwzz0u2/image/upload/v1703311049/chapter-8/logo-cmd_uhvujj.svg'
                            }
                        />
                        <h2>Welcome, Admin BCR</h2>
                        <TextField
                            label="Username"
                            name="username"
                            id="username"
                            placeholder="Type your username"
                            sx={{ width: '100%', mb: 3 }}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            id="password"
                            placeholder="Type your password"
                            type="password"
                            sx={{ width: '100%', mb: 3 }}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" variant="contained" size="large" sx={{ width: '100%' }}>
                            Sign In
                        </Button>
                    </div>
                </Form>
                <Background>
                    <img
                        src={
                            'https://res.cloudinary.com/dhwwzz0u2/image/upload/v1703311051/chapter-8/bg-cover_hrnerv.png'
                        }
                        alt="bg-cover"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: 'contrast(170%)',
                        }}
                    />
                </Background>
            </LoginContainerStyled>
        </PublicProvider>
    );
}
