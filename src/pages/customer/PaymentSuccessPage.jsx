import { useLocation } from "react-router-dom";
import { Alert } from "../../components/elements/Alert";
import queue from "../../assets/images/queue.png";

const PaymentSuccessPage = () => {
  const { queueNum } = useLocation().state;
  return (
    <div className="flex flex-col items-center justify-top h-screen">
      <img src={queue} alt="Queue Image" className="h-96 mt-0"/>
      <div className="max-w-lg mx-auto p-4">
        <Alert variant="success">
          Your payment was successful
          <hr />
          Your Queue Number: #{queueNum}
        </Alert>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
