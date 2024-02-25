
const Navbar = () => {
    return (
        <>
            <div className="mainDiv flex justify-around py-8">
                <div>
                    <span className="text-3xl font-bold text-blue-950">Pay</span><span className="text-3xl font-bold text-cyan-500">tm</span>
                </div>
                 <div className="profileDiv flex flex-col justify-center items-center">
                    <i className="fa-regular fa-user w-min"></i>
                    <span id="user-name">User Name</span>
                 </div>
            </div>
            <div className="flex">
                <div className="w-1/2 h-0.5 bg-blue-950"></div><div className="w-1/2 h-0.5 bg-cyan-500"></div>
            </div>
        </>
    )
}

export default Navbar