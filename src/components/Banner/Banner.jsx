/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

const Banner = () => {
    const carousalText = <>
        <div className='text-white space-y-7 pl-12 w-1/2 '>
        <div className="badge badge-secondary">TaskManagement</div>
            <h2 className='lg:text-6xl md:text-4xl text-2xl font-bold'>FREE ONLINE TASK MANAGER</h2>
            <p className="hidden md:block ">Organize and manage your task like a boss with TaskManagement, a free task management tool packing more capabilities than you can imagine.</p>
            <div>
                <Link to={'/login'}><button className="btn btn-primary mr-5">Let's Exlpore</button></Link>
            </div>
        </div>

    </>

    return (
        <div className="carousel w-full h-full md:h-[550px]">
            <div id="slide1" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/zPMPHtH/pngtree-business-team-banner-task-management-picture-image-1859335.png" className="w-full rounded-xl" />
                <div className="absolute rounded-xl flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    {carousalText}
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href="#slide4" className="btn btn-circle mr-5">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/yQtpvJ2/task-management-concept-banner-header-vector-24529047.jpg" className="w-full rounded-xl" />
                <div className="absolute rounded-xl flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    {carousalText}
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href="#slide1" className="btn btn-circle mr-5">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/HVpV6kH/Task-banner.jpg" className="w-full rounded-xl" />
                <div className="absolute rounded-xl flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    {carousalText}
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href="#slide2" className="btn btn-circle mr-5">❮</a>
                    <a href="#slide4" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/V3kkxkS/banner-2.jpg" className="w-full rounded-xl" />
                <div className="absolute rounded-xl flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    {carousalText}
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href="#slide3" className="btn btn-circle mr-5">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Banner;