import React from "react";
import categories from "../categories";
import CategoryCard from "./CategoryCard";
import "./categorylist.css";

const CategoryList = () => {
    return (
        <div className="category-list">
            <h3>Summary</h3>
            {categories.map(({id, title}) => <CategoryCard key={id} id={id} title={title}/>)}
        </div>
    );
}

export default CategoryList;