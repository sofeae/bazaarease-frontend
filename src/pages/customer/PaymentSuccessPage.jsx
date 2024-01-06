import { useLocation } from "react-router-dom";
import { Alert } from "../../components/elements/Alert";
import queue from "../../assets/images/queue.png";

const PaymentSuccessPage = () => {
  const { queueNum } = useLocation().state;

  return (
    <div className="flex flex-col items-center justify-top h-screen">
      <Alert variant="success" className="mb-4 mt-10 bg-yellow-300">
        Your payment was successful
      </Alert>
      <img src={queue} alt="Queue Image" className="h-64 mt-0 mb-0" />
      <div className="max-w-lg mx-auto p-4">
        <div className="p-6 rounded-lg text-xl text-center">
          Your Queue Number:<br /> <br />
          <span className="font-bold text-5xl"> #{queueNum}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
