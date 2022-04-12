import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Button onClick={() => loginWithRedirect()}>
        ログイン
      </Button>
    </>
  )
}

export default Login;