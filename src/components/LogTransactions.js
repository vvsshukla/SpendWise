import React, {useReducer} from "react";
import "./logtransactions.css";
import categories from "../categories";
import {v4 as uuidv4} from "uuid";

const initState = {
    title:'',
    amount:0,
    category:'',
    date:''
}

const reducer = (state = initState, action) => {
    switch(action.type){
        case 'update':
            return {
                ...state,
                ...action.payload
            }
        default: 
        return {  
            state
        }
    }
}

const LogTransactions = ({onAdd}) => {
    const [state, dispatch] = useReducer(reducer, initState);
    const onSaveHandler = () => {
        const validate = Object.values(state).map(elem => {
            if (typeof elem === "string" && elem === "") {
                return false;
            }
            if (typeof elem === "object" && Array.isArray(elem) && elem.length === 0) {
                return false;
            }
            return true;
         }).reduce((prev, curr) => prev && curr);
         if (validate) {
            onAdd({...state, id: uuidv4()})
            document.getElementById('title').value = "";
            document.getElementById('amount').value = "";
         } else {
            alert('All the inputs are mandatory.');
         }
        
    }
    return (
        <div className="transaction-input">
             <h3>Log Transactions</h3>
             <div className="transaction-form">
                <input 
                        type="text"
                        id="title"
                        className="tr-input" 
                        onBlur={(e) => {
                            let strRegex = new RegExp(/^[a-z\d\-_\s]+$/i);
                            // match the regex with the string
                            let result = strRegex.test(e.target.value);
                            if (result) {
                                document.getElementById('title_msg').innerHTML = "";
                                dispatch({type:"update", payload:{title: e.target.value}})
                            } else {
                                document.getElementById('title_msg').innerHTML = "Title must be alphanumeric!";
                                e.target.value = "";
                            }                            
                        }} 
                        placeholder="Transaction Title"
                />
                <div id="title_msg"></div>
                <input 
                        type="text"
                        id="amount" 
                        className="tr-input" 
                        onBlur={(e) => {
                            let strRegex = new RegExp(/^\d+$/);
                            // match the regex with the string
                            let result = strRegex.test(e.target.value);
                            console.log('result:', result);
                            if (result) {
                                document.getElementById('amount_msg').innerHTML = "";
                                dispatch({type:"update", payload: {amount: e.target.value}})
                            } else {
                                document.getElementById('amount_msg').innerHTML = "Amount must be postive.";
                                e.target.value = "";
                            }                            
                        }}  
                        placeholder="Transaction Amount"
                />
                <div id="amount_msg"></div>
                <select className="tr-input" onChange={(e) => dispatch({type:"update", payload:{category: e.target.value}})}>
                    <option value="">Select Category</option>
                    {categories.map(({id, title}) => {
                       return <option key={id} value={title}>{title}</option>
                    })}
                </select>
                <input type="date"
                       className="tr-input"
                       onChange={(e) => dispatch({type:"update", payload:{date:e.target.value}})}
                       placeholder="Select date"
                />
                <button type="button" className="tr-input" onClick={onSaveHandler} >Add</button>
            </div>
        </div>
    );
}

export default LogTransactions;