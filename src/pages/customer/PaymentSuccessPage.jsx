import { useLocation } from "react-router-dom";
import  { Alert }  from "../../components/elements/Alert";
const PaymentSuccessPage = () => {
    const {queueNum} = useLocation().state
    return (
        <div className="max-w-lg mx-auto p-4">
            <Alert variant="success">
                Your payment was successful
                <hr/>
                Your Queue Number: #{queueNum}
            </Alert>
        </div>
    )
}

export default PaymentSuccessPage;