const Balance = () => {
    return (
        <>
            <div className="flex justify-around py-16">
                <i className="fa-solid fa-wallet fa-10x text-cyan-500"/>
                <div className="flex flex-col justify-around">
                    <button className="py-4 px-8 rounded-lg bg-blue-950 text-white">Check Balance</button>
                    <button className="py-4 px-8 bg-blue-950 rounded-lg text-white">Send Money</button>
                </div>
            </div>
            
        </>
    )
}

export default Balance