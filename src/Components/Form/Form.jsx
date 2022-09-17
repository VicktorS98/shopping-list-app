import React from "react"
import { nanoid } from "nanoid";
import styles from "./Form.module.scss"
import { BsPlusLg } from "react-icons/bs";

export default function Form({userInput, setUserInput, listItems, setListItems, status, setStatus, filterActive, setFilteredItems}) {

  function changeHandler(e) {
    setUserInput(e.target.value)
  }

  function addItem(e) {
    const firstCapitalized = userInput.slice("", 1).toUpperCase() + userInput.slice(1).toLowerCase();
    e.preventDefault();
    if (userInput.length > 0) {
      const newItem = { name: firstCapitalized, completed: false, quantity: 1, id: nanoid(8) }
      setListItems((prevItems => {
        return [newItem, ...prevItems]
      }))
    }
    setUserInput("")
  }

  function selectHandler(e) {
    setStatus(e.target.value)
  }

  React.useEffect(() => {
    filterHandler();
  }, [listItems, status])

  function filterHandler() {
    switch (status) {
      case "completed":
        setFilteredItems(listItems.filter((item) => item.completed === true))
        break;
      case "uncompleted":
        setFilteredItems(listItems.filter((item) => item.completed === false))
        break;
      default:
        setFilteredItems(listItems);
        break;
    }
  }


  return (
    <form className={styles.form} onSubmit={addItem}>
      <input 
        type="text" 
        onChange={changeHandler}
        value={userInput}
        name="userInput"
        placeholder="¿Qué vas a comprar?"
      />
      <button className={styles.buttonAddItem} type="submit">
        <BsPlusLg />
      </button>
      {filterActive && <select onChange={selectHandler} name="items">
        <option value="all">Todos</option>
        <option value="completed">Comprados</option>
        <option value="uncompleted">Falta Comprar</option>
      </select>}
    </form>
  )
};