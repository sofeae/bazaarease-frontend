import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../../hooks/useSignup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogin } from '../../hooks/useLogin';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [open, setOpen] = useState(false);
  const { signup, error, isLoading } = useSignup();
  const { login } = useLogin();
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = async () => {
    await login(email, password);
    navigate('/');
  };

  // State to track signup errors
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await signup(email, password, businessName);

      // Open the success dialog only if userData is truthy
      if (userData) {
        handleClickOpen();
      }
    } catch (error) {
      // Handle signup error
      setHasError(true);
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3 className="text-2xl font-bold mb-4">Sign Up</h3>

      <label className="mb-2">Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="mb-2 p-2 w-full"
        autoComplete="new-email"
      />

      <label className="mb-2">Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="mb-2 p-2 w-full"
        autoComplete="new-password"
      />
      <p className="text-xs text-gray-400 mb-2">Strong password should contain (A-Z), (a-z), (0-9), and any one of (!@#$%^&*)</p>

      <label className="mb-2">Business Name:</label>
      <input
        type="text"
        onChange={(e) => setBusinessName(e.target.value)}
        value={businessName}
        className="mb-4 p-2 w-full"
        autoComplete="new-business-name"
      />

      {error && <div className="error">{error}</div>}

      <React.Fragment>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded mb-4"
          disabled={isLoading || hasError} // Disable the button if isLoading or hasError is true
          onClick={handleSubmit} // Trigger handleSubmit instead of handleClickOpen
        >
          Sign up
        </button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Sign Up Successful!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Click below to log in
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleLogin}>Log in</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </form>
  );
};

export default Signup;
