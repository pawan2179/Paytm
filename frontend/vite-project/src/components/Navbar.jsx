
const Navbar = () => {
    return (
        <>
            <div className="mainDiv flex justify-around py-8">
                 <span className="mainDiv-header text-xl">Paytm</span>
                 <div className="profileDiv flex flex-col justify-center items-center">
                    <i className="fa-regular fa-user w-min"></i>
                    <span id="user-name">User Name</span>
                 </div>
            </div>
        </>
    )
}

export default Navbar