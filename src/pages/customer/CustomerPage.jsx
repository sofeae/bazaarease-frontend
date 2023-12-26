import { Banner } from "./Banner.jsx";
// import { About } from "../../components/About";
import  ProductsPreview from "./ProductsPreview.jsx";

const CustomerPage = () => {
    return (
        <div style={{ backgroundColor: 'white' }}>
            <Banner />
            <ProductsPreview />
            {/* <About /> */}
        </div>
    )
}

export default CustomerPage;