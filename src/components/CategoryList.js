import React from "react";
import categories from "../categories";
import CategoryCard from "./CategoryCard";

const CategoryList = ({categoryWisetotal}) => {
    return (
        <div className="category-list">
            <h3>Summary</h3>
            {categories.map(({id, title}) => <CategoryCard key = {id} title = {title} total = {categoryWisetotal[title]}/>)}
        </div>
    );
}

export default CategoryList;