// import Button from "./elements/Button";
import platter from "../../assets/images/platter.png";

export const Banner = () => {
    return (
        <div className="banner-wrapper">
        <div style={{ borderTop: '1px solid #A0A0A0', marginBottom: '10px' }}></div>
        <div className="banner w-full md:w-2/3 px-7 mx-auto relative flex items-center-justify-between">
            <div className="banner-deescription w-full md:w-1/2 p-3">
                <h2 className="mb-6 text-3xl font-bold text-black">
                    Start Order Now!
                </h2>
                <p className="font-semibold text-lg text-yellow-600 py-2">
                    Click on the '+' button to add product into your cart and get your queue number
                    after completed your payment
                </p>
                {/* <div className="btn-container"> */}
                    {/* <Button>Order Now</Button> */}
                    {/* <a href="/menu" className="text-yellow-400 hover:text-yellow-500 font-bold text-decoration-line px-3">
                        See Menu
                    </a> */}
                {/* </div> */}
            </div>
            <div className="banner-image w-full md:w-1/2 p-3 flex justify-end">
                <img src={platter} alt="banner" className="max-h-48" />
            </div>
        </div>
        </div>
    )
}