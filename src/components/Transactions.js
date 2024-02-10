import React from "react";
import transactions from "../transactions";
import "./transactions.css";
const Transactions = () => {
    return (
        <div className="transactions-history">
            <h3>Transactions History</h3>
            <div className="transactions">
                {transactions.map(({id, title, type, category, amount}) => <div key={id} className="transaction-card">{title}-{amount}</div>)}
            </div>
        </div>
    );
}

export default Transactions;