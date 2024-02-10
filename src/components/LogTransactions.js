import React, {useState} from "react";
import "./logtransactions.css";
import categories from "../categories";


const LogTransactions = () => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    return (
        <div className="transaction-input">
             <h3>Log Transactions</h3>
             <div className="transaction-form">
                <input type="text" className="tr-input" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Transaction Title"/>
                <input type="float" className="tr-input" onChange={(e) => setAmount(e.target.value)} value={amount} placeholder="Transaction Amount"/>
                <select className="tr-input" onChange={(e) => setType(e.target.value)} value={type}>
                    <option value="">Select Type</option>
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                </select>
                <select className="tr-input" onChange={(e) => setCategory(e.target.value)} value={category}>
                    <option value="">Select Category</option>
                    {categories.map(({id, title}) => {
                       return <option key={id} value={title}>{title}</option>
                    })}
                </select>
                <button type="button" className="tr-input">Add</button>
            </div>
        </div>
    );
}

export default LogTransactions;