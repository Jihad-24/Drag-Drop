



const Featured = () => {
    return (
        <div className="my-12">
            <div className="text-center space-y-4 mb-8">
                <h1 className="font-bold text-5xl" data-aos="fade-up">Our Task<span className="text-blue-500"> Features & Benefit</span></h1>
                <p className="font-bold text-[#494848]" data-aos="fade-down">Transform Your Task Journey with Task Management <br /> Your Ultimate Task Management Destination</p>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                    <div className="card  bg-base-100 shadow-xl" data-aos="fade-left">
                        <figure className="pt-8">
                            <img src="https://i.ibb.co/XDHs98g/SOFTWARE-TEAMS-2x.png" className="h-60" alt="" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Software teams</h2>
                            <p className="text-[#494848]">
                            Keep your teams and organization in sync with project timelines. Give teams the context needed to make quick decisions while staying aligned with the bigger goals.</p>

                        </div>
                    </div>
                </div>
                <div>
                    <div className="card  bg-base-100 shadow-xl" data-aos="fade-down">
                        <figure className="pt-8">
                          <img src="https://i.ibb.co/PM3y7my/MARKETING-CALENDAR-2x.png" alt="" className="h-60" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Marketing teams
</h2>
                            <p className="text-[#494848]">
                            Use a drag and drop form builder to build a custom intake process. Easily manage every new graphic request or media buy that comes your way.</p>

                        </div>
                    </div>
                </div>
                <div>
                    <div className="card  bg-base-100 shadow-xl" data-aos="fade-right">
                        <figure className="pt-8">
                            <img src="https://i.ibb.co/yWcw6cb/OPERATIONS-2x.png" className="h-60" alt="" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">
                            Operations</h2>
                            <p className="text-[#494848]">
                            Operations teams shine when they refine their own processes. Experiment and improve your workflows to see which process wins out in the end. </p>

                        </div>
                    </div>
                </div>
                <div>
                    <div className="card  bg-base-100 shadow-xl" data-aos="fade-left">
                        <figure className="pt-8">
                           <img src="https://i.ibb.co/XZm8dSd/PRODUCT-TEAMS-2x.png" className="h-60" alt="" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Product teams</h2>
                            <p className="text-[#494848]">
                            Quickly sort your ideas to help your team tackle the highest priority items first and stay on top of your most important tasks.</p>

                        </div>
                    </div>
                </div>
                <div>
                    <div className="card  bg-base-100 shadow-xl" data-aos="fade-up">
                        <figure className="pt-8">
                            <img src="https://i.ibb.co/VqBms74/DESIGN-TEAMS-2x.png" className="h-60" alt="" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Design teams</h2>
                            <p className="text-[#494848]">
                            Design teams can easily map dependencies with a timeline view. Bypass the blockers to ensure work gets done on time.</p>

                        </div>
                    </div>
                </div>
                <div>
                    <div className="card  bg-base-100 shadow-xl" data-aos="fade-right">
                        <figure className="pt-8">
                           <img src="https://i.ibb.co/FzFr68b/TRACK-PROGRESS-2x.png" className="h-60" alt="" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Track Prograss</h2>
                            <p className="text-[#494848]">
                            Easily track your team’s progress, priorities, and workload. Identify blockers, celebrate wins, and plan ahead for your team.</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;