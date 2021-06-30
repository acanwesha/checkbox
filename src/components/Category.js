import React, { useEffect, useState } from "react"
import { Collapse, ListGroup, ListGroupItem } from "react-bootstrap"

const Category = props => {
  const {
    category,
    categoryIndex,
    selectedCategory,
    setSelectedCategory,
    methods,
    finalCategoryArray,
  } = props
  const { setCategoryArray } = methods

  const [collapsedState, setCollapsedState] = useState(
    categoryIndex === selectedCategory //  ===-1
  )
  const [subCheckbox, setSubCheckbox] = useState(false)

  useEffect(() => {
    setCollapsedState(categoryIndex === selectedCategory)
  }, [categoryIndex, selectedCategory])

  return (
    <div>
      <ListGroup>
        <span>
          <ListGroupItem>
            <div>
              <input
                type='checkbox'
                name='categoryId'
                //  id={category.id}
                onChange={e => {
                  setSubCheckbox(!subCheckbox)
                  const displayName = category.displayName
                  if (e.target.checked) {
                    //  if selected then added new category
                    const updatedArray = [
                      ...finalCategoryArray,
                      { displayName: displayName },
                    ]
                    setCategoryArray(updatedArray)
                    //                    console.log("added category", updatedArray)
                  } else {
                    //  if unselected then remove category from array
                    const updatedArray = finalCategoryArray.filter(
                      obj => obj.displayName !== displayName
                    )
                    setCategoryArray(updatedArray)
                    //                  console.log("removed category", updatedArray)
                  }
                }}
              />
              <label
                //    htmlFor={category.id}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectedCategory(categoryIndex)
                  setCollapsedState(!collapsedState)
                }}
                className='ml-2'
              >
                {category.displayName}
              </label>
            </div>
            <Collapse
              in={collapsedState}
              style={{
                position: "absolute",
                left: "348px",
                top: "0px",
                width: "450px",
              }}
            >
              <div id={category.id}>
                {category.result.map((item, index) => {
                  if (Object.keys(item).length === 0) {
                    return ""
                  }
                  //  if we unselect the main category then also need to unselect the sub categories
                  if (!subCheckbox) {
                    var checkboxElement = document.getElementById(item.id)
                    if (checkboxElement !== null) {
                      if (checkboxElement.checked === true) {
                        checkboxElement.checked = false
                      }
                    }
                  }
                  return (
                    <ListGroup key={index}>
                      <span>
                        <ListGroupItem>
                          <div>
                            <input
                              type='checkbox'
                              name='itemId'
                              id={item.id}
                              disabled={!subCheckbox}
                              onChange={e => {
                                const displayName = item.displayName

                                //  first get the category index
                                const currentCategoryId =
                                  finalCategoryArray.findIndex(
                                    obj =>
                                      obj.displayName === category.displayName
                                  )
                                //  create a duplicate array for modification
                                const duplicateArray = [...finalCategoryArray]
                                var resultArray = []
                                if (
                                  duplicateArray[currentCategoryId].result !==
                                  undefined
                                ) {
                                  resultArray = [
                                    ...duplicateArray[currentCategoryId].result,
                                  ]
                                }
                                if (e.target.checked) {
                                  //  added into array
                                  const resultObject = {
                                    displayName: displayName,
                                  }
                                  if (item.value !== undefined) {
                                    resultObject["value"] = item.value
                                  }
                                  resultArray.push(resultObject)
                                  duplicateArray[currentCategoryId].result =
                                    resultArray
                                  setCategoryArray(duplicateArray)
                                  console.log(
                                    "sub-category added ",
                                    duplicateArray
                                  )
                                } else {
                                  // removed from array
                                  duplicateArray[currentCategoryId].result =
                                    resultArray.filter(
                                      obj => obj.displayName !== item.displayName
                                    )

                                  setCategoryArray(duplicateArray)
                                  console.log(
                                    "sub-category removed ",
                                    duplicateArray
                                  )
                                }
                              }}
                            />
                            <label
                              htmlFor={item.id}
                              style={{ cursor: "pointer" }}
                              className='ml-2'
                            >
                              {item.displayName}
                            </label>
                            {item.value !== undefined && (
                              <span>
                                : <b> {item.value}</b>
                              </span>
                            )}
                          </div>
                        </ListGroupItem>
                      </span>
                    </ListGroup>
                  )
                })}
              </div>
            </Collapse>
          </ListGroupItem>
        </span>
      </ListGroup>
    </div>
  )
}
export default Category
