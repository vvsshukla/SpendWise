import React from "react";
import "./dashboard.css";
import CategoryList from "./CategoryList";
import LogTransactions from "./LogTransactions";
import Transactions from "./Transactions";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <CategoryList/>
            <LogTransactions/>
            <Transactions/>
        </div>
    );
}

export default Dashboard;