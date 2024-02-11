import React from "react";
import "./categorycard.css";

const CategoryCard = ({ title, total}) => {
    return (
        <div className="category-card">
            <div className="category-title">{title}</div>
            <div className="category-total">{total}</div>
        </div>
    );
}

export default CategoryCard;