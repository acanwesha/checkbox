import React, { useState } from "react"
import Category from "./Category"
import axios from 'axios';

const AllCategories = props => {
  const { data, methods, finalCategoryArray } = props
  const [selectedCategory, setSelectedCategory] = useState(-1)
  console.log("data", data)
  return (
    <div>
      <h3>Category</h3>
      <p></p>
      {data.length > 0
        ? data.map((item, index_1) => {
            return (
              <Category
                key={index_1}
                category={item}
                categoryIndex={index_1}
                finalCategoryArray={finalCategoryArray}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                methods={methods}
              />
            )
          })
        : "No categories available"}
    </div>
  )
}
export default AllCategories
