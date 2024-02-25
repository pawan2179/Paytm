const TransactionHistory = () => {
    return (
        <>
            <div className="text-center text-blue-950 text-3xl font-bold py-16">Transaction History</div>
            <div id="transaction-history-list">
                {
                    [1,2,3,4,5].map((item) => <TransactionListItem key={item}/>)
                }
            </div>
        </>
    )
}

const TransactionListItem = ({id}) => {
    return (
        <>
            <div className="transaction-item-main-div flex justify-between items-center mx-16 my-4 px-16 py-4 border-solid border-2 rounded-lg" key={id}>
                <div>
                    <div className="transaction-item-name">Transaction Name</div>
                    <div className="transaction-item-id">Transaction id</div>
                </div>
                <div className="bg-blue-950 text-white border-2 border-cyan-500 rounded-lg px-4 py-2">Resend</div>
            </div>
        </>
    )
}

export default TransactionHistory