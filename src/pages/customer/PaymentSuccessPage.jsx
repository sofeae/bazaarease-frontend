import  { Alert }  from "../../components/elements/Alert";
const PaymentSuccessPage = () => {
    return (
        <div className="max-w-lg mx-auto p-4">
            <Alert variant="success">
                Your payment was successful
            </Alert>
        </div>
    )
}

export default PaymentSuccessPage;