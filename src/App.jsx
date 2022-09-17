import React from "react"
import globals from "./Styles/globals.scss"
import styles from "./Styles/App.module.scss"
import FunctionButtons from "./Components/FunctionButtons/FunctionButtons.jsx"
import Form from "./Components/Form/Form.jsx"
import Item from "./Components/Item/Item.jsx"

export default function App() {

  const [userInput, setUserInput] = React.useState("")
  const [listItems, setListItems] = React.useState([])
  const [editActive, setEditActive] = React.useState(false)
  const [filterActive, setFilterActive] = React.useState(false)
  const [status, setStatus] = React.useState("all")
  const [filteredItems, setFilteredItems] = React.useState([])

  React.useEffect(() => {
    const check = localStorage.getItem("listItems")
    if (check) {
      setListItems(JSON.parse(check))
    }
  }, [])

  React.useEffect(() => {
    if (listItems.length < 1) {
      setEditActive(false)
    }
    localStorage.setItem("listItems", JSON.stringify(listItems))
  }, [listItems])

  const itemElements = filteredItems.map(item =>
    <Item
      key={item.id}
      id={item.id}
      itemName={item.name}
      quantity={item.quantity}
      completed={item.completed}
      userInput={userInput}
      setUserInput={setUserInput}
      listItems={listItems}
      setListItems={setListItems}
      editActive={editActive}
    />
  )

  return (
    <div className={styles.appContainer}>
      <div className={styles.functionButtonsContainer}>
        <FunctionButtons
          listItems={listItems}
          editActive={editActive}
          setEditActive={setEditActive}
          filterActive={filterActive}
          setFilterActive={setFilterActive}
        />
      </div>
      <div className={styles.shoppingListContainer}>
        <div className={styles.formContainer}>
          <Form
            userInput={userInput}
            setUserInput={setUserInput}
            listItems={listItems}
            setListItems={setListItems}
            status={status}
            setStatus={setStatus}
            filterActive={filterActive}
            setFilteredItems={setFilteredItems}
          />
        </div>
        <div className={styles.itemsContainer}>
          {itemElements}
        </div>
      </div>
    </div>
  )
}