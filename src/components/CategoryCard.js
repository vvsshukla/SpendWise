import React from "react";
import "./categorycard.css";

const CategoryCard = ({ id, title }) => {
    return (
        <div className="category-card">
            <div className="category-title">{title}</div>
            <div className="category-total">INR 1000</div>
        </div>
    );
}

export default CategoryCard;