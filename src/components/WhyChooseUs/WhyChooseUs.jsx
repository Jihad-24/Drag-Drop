

const WhyChooseUs = () => {
    return (
        <div className="my-16 rounded-2xl shadow-2xl">
            <div className="text-center w-3/4 mx-auto pt-6 md:pt-20 my-10">
                <h1 className="text-4xl font-medium" data-aos="fade-up"><span className="text-blue-500">Why Task</span>  Management</h1>
            </div>
            <div>
                <div className="hero">
                    <div className="hero-content lg:gap-5 mb-12 my-6 flex-col md:flex-row lg:flex-row">
                        <div className="flex items-center justify-center">
                            <img src="https://i.ibb.co/2YyR91y/img-why-png.jpg" className=" md
                            w-2/3 lg:max-w-xl lg:h-full rounded-lg md:max-w-2xl " data-aos="fade-left" />
                        </div>
                        <div className="flex flex-col w-1/2 md:max-w-2xl">
                            <div className="">
                                <h1 className="text-lg lg:text-2xl font-normal" data-aos="fade-right">When it comes down to choosing task manager freeware, all you need is three things:</h1>
                            </div>
                            <div className="py-6 ml-8" data-aos="fade-right">
                                <ul className="list-disc">
                                    <li className="text-lg lg:text-xl"><span className="text-cyan-500 font-normal underline">FREE</span>(that’s right, in capitals)</li>
                                    <li className="text-lg lg:text-xl"> <span className="text-cyan-500 font-normal underline">Ease of use</span></li>
                                    <li className="text-lg lg:text-xl"><span className="text-cyan-500 font-normal underline">Versatility</span></li>
                                </ul>
                            </div>
                            <div className="">
                                <h1 className="text-lg lg:text-xl font-normal" data-aos="fade-right">Coincidentally, that’s exactly what you get from Task Management - a free online task management app that’s easy to use and features dozens of collaboration tools.</h1>
                            </div>
                            <div className=" flex justify-center items-center md:justify-start md:items-start">
                                <button className="btn bg-blue-500 ml-6 text-white text-lg lg:text-xl rounded-r-full rounded-l-full text-center my-6" data-aos="fade-left">Get Started</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;