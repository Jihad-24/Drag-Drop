import { Helmet } from "react-helmet";
import Banner from "../../components/Banner/Banner";
import Featured from "../../components/Featured/Featured";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";


const HomePage = () => {
    return (
        <div>
            <Helmet>
                <title>Home || Task Management</title>
            </Helmet>
            <div className="">
            <Banner></Banner>
            <Featured></Featured>
            <WhyChooseUs></WhyChooseUs>
            </div>
        </div>
    );
};

export default HomePage;