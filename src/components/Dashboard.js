import React, { useReducer} from "react";
import "./dashboard.css";
import LogTransactions from "./LogTransactions";
import Transactions from "./Transactions";
import categories from "../categories";
import CategoryCard from "./CategoryCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Rectangle } from "recharts";

const initState = {
    totalExpense: 0,
    totalSavings: 0,
    transactions: [],
    categoryWisetotal: { 'Foods': 0, 'Payments': 0, 'Travels': 0 },
    monthlyData: []
}



const reducer = (state = initState, action) => {
    console.log(action.transaction);
    let amount = parseFloat(action.transaction.amount);
    let date = new Date(action.transaction.date);
    const month = date.toLocaleString('default', { month: 'short' });
    let innerKey = parseInt(date.getFullYear() + "" + (date.getMonth() + 1).toString().padStart(2, "0"));
    let currentIndex =  month + ' ' + date.getFullYear();
    const addMonthlyData = (currentIndex, innerKey, amount) => {
        let object = {'key' : innerKey};
        object[currentIndex] = amount;
        state.monthlyData.push(object);
    }

    switch (action.type) {
        case "add":
            state.categoryWisetotal[action.transaction.category] += amount;
            if(state.monthlyData.length){
                let isElementPresent = false;
                state.monthlyData.forEach((element, index) => {
                    if(element.hasOwnProperty(currentIndex)){
                        element[currentIndex] += amount;
                        isElementPresent = true;
                    }
                });
                if(false == isElementPresent){
                    addMonthlyData(currentIndex, innerKey, amount);
                }
            }else{
                addMonthlyData(currentIndex, innerKey, amount);
            }
            return {
                ...state,
                transactions: [...state.transactions, { ...action.transaction }]
            }
        case 'delete':
            state.categoryWisetotal[action.transaction.category] -= amount;
            if(state.monthlyData.length){
                state.monthlyData.forEach((element, index) => {
                    if(element.hasOwnProperty(currentIndex)){
                        element[currentIndex] -= amount;
                    }
                });
            }
            state.transactions = state.transactions.filter((element) => {
                return element.id != action.transaction.id
            }); 
            return {
                ...state,
                transactions: state.transactions
            }
        default:
            return {
                state
            }
    }
}

const Dashboard = () => {
    let currentState = sessionStorage.getItem('spendwise_state') ? JSON.parse(sessionStorage.getItem('spendwise_state')) : initState;
    const [state, dispatch] = useReducer(reducer, currentState);
    sessionStorage.setItem('spendwise_state', JSON.stringify(state));

    const SortedData = (monthlyData) => {
        let sortedData = monthlyData.sort(function(a, b){
            return a.key - b.key;
        });
        return sortedData;
    }
    
    const getBarChartData = (monthlyData) => {
        let data = [];
        monthlyData.forEach((element, index) => {
            let object = {};
            object['name'] = Object.keys(element)[1];
            object['Expense Tracker'] = element[Object.keys(element)[1]];
            data.push(object);
        });
        return data;
    }

    const sortedMonthlyData = SortedData(state.monthlyData);
    const barData = getBarChartData(sortedMonthlyData);
    console.log('barData:', barData);


    return (
        <div className="dashboard">
            <div className="dashboard-upper">
                <div className="category-list">
                    <h3>Summary</h3>
                    {categories.map(({ id, title }) => <CategoryCard key={id} title={title} total={state.categoryWisetotal[title]} />)}
                </div>
                <LogTransactions onAdd={(transaction) => {
                    dispatch({ type: "add", transaction })
                }} />
                <Transactions transactions={state.transactions} onDelete={(transaction) => {
                    dispatch({type:"delete", transaction})
                }}/>
            </div>
            <div className="dashboard-lower">
                <h3>Graphical Overview</h3>
                {(barData && barData.length > 0)?
                <div className="financial-overview">
                    
                    <BarChart width={400} height={300} data={barData}>
                        <CartesianGrid strokeDasharray={"3 3"} />
                        <XAxis dataKey="name"/>
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={"Expense Tracker"} fill="#008000" stroke="green" activeBar={<Rectangle stroke="green"/>}/>
                    </BarChart>
                </div>
                 : 
                  <h4>Log your expenses for Graphical Overview</h4>  
             }
            </div>
        </div>
    );
}

export default Dashboard;