import { useSelector, useDispatch } from "react-redux";
import { clearCart, cartProducts } from "../../stores/cart/cartSlice";
import { useNavigate,useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Button from "../../components/elements/Button";
import { backendBaseURL } from "../../utils/imageUrl.js";

//payment form 
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export const PaymentWrapper = () => {
    return (
        <PaymentForm />
    )
}

const PaymentForm = () => {
    const {userId} = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //Redux
    const dispatch = useDispatch();
    const cart = useSelector(cartProducts);

    //React-Router
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        //Prevent refresh
        e.preventDefault();

        if (!cart?.length) {
            return; //If cart is empty, return/stop
        }

        setLoading(true);
        try {

            const card = 1123103103123 ; //DUMMY DATA
            const response = await fetch(backendBaseURL + `/api/order`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({  //Data to send = cart, sellerId
                    cart:cart,
                    sellerId: userId,
                    card: card,
                })
            })
 
            const { queueNum, paymentStatus } = await response.json()
            console.log(queueNum,paymentStatus)
            if(paymentStatus == "paid"){
                // dispatch(clearAddress());
                dispatch(clearCart());
                navigate('payment-success',{state: {queueNum: queueNum}});
            }

            console.log("Tak Jadi")
            


        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    // export default function PaymentForm() {
    return (
        <form className="md:-2/3 md:mx-auto px-2 pt-1" id="payment-form" onSubmit={handleSubmit}>
            <label className="pt-4 text-2xl md:text-center">Please enter your card details</label>

            <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>

            {/* <div className="my-4">
                <CardElement id="card-element" />
            </div> */}
            <div className="bg-yellow-500 flex justify-center p-1 mt-4 rounded">
                <Button type="submit" disabled={loading}>
                    {
                        loading ?
                            'Loading...' :
                            'Pay Now'
                    }
                </Button>
            </div>
        </form>
    )
};
