
const PageError = () => {

    return (
        <div className="banner-wrapper pt-6">
            <div className="banner w-full md:w-2/3 px-7 mx-auto relative flex flex-col md:flex-row items-center justify-between">
                <div className="banner-description w-full md:w-full p-3 mb-4 md:mb-0">
                    <p className="font-semibold text-lg text-yellow-600 py-2 text-center">
                        Sorry, the stall is closed right now :(
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PageError;