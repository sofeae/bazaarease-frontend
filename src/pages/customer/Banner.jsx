// import Button from "./elements/Button";
import platter from "../../assets/images/platter.png"; 

export const Banner = () => {
    return (
        <div className="banner-wrapper pt-6">
        <div className="banner w-full md:w-2/3 px-7 mx-auto relative flex flex-col md:flex-row items-center justify-between">
            <div className="banner-description w-full md:w-full p-3 mb-4 md:mb-0">
                <h2 className="mb-6 text-3xl font-bold text-black text-center">
                    Start Order Now!
                </h2>
                <p className="font-semibold text-lg text-yellow-600 py-2 text-center">
                    Click on the '+' button to add a product to your cart and get your queue number
                    after completing your payment.
                </p>
                {/* <div className="btn-container"> */}
                    {/* <Button>Order Now</Button> */}
                    {/* <a href="/menu" className="text-yellow-400 hover:text-yellow-500 font-bold text-decoration-line px-3">
                        See Menu
                    </a> */}
                {/* </div> */}
            </div>
            {/* <div className="banner-image w-full md:w-1/2 p-3 flex justify-end">
                <img src={platter} alt="banner" className="max-h-48" />
            </div> */}
        </div>
        </div>
    );
};
