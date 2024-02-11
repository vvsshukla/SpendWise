import React from "react";
import "./transactions.css";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Transactions = ({transactions, onDelete}) => {
    const addDialog = ({transaction}) => ({onClose}) => {
        const handleClickYes = () => {
            onDelete({...transaction});
            onClose();
        }
        
        const handleClickNo = () => {
            onClose();
        }
        return (
            <div className="add-dialog">
                <h3>Are you sure you want to delete the transaction?</h3>
                <div className="add-dialog-buttons">
                    <button onClick={handleClickYes} className="btn-yes">Yes</button>
                    <button onClick={handleClickNo} className="btn-no">No</button>
                </div>
            </div>
        );
    }
    
    const deleteTransaction = ({...transaction}) => {
        confirmAlert({customUI:addDialog({transaction})});
    }
    return (
        <div className="transactions-history">
            <h3>Expenses History</h3>
            <div className="transactions">
                {
                    transactions.length ? 
                    transactions.map(({id, title, date, category, amount}) => 
                    <div key={id} className={`transaction-card`}>
                        <div>
                            <span className="capitalize">{title} = &#8377;<b>{amount}</b></span>
                        </div>
                        <div className="actions">
                            <button className="delete" title="delete" onClick={(e) => deleteTransaction({id, title, date, category, amount})}>&#9249;</button>
                        </div>
                    </div>
                    )
                    : <h3>No expenses found</h3>
                }
            </div>
        </div>
    );
}

export default Transactions;