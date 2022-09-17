import React from "react"
import styles from "./Item.module.scss"
import { AiFillDelete, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";

export default function Item({ id, itemName, quantity, completed, listItems, setListItems, editActive }) {

  function addItem(id) {
    const plusState = listItems.map((item) => {
      if (item.id === id && !completed) {
        return { ...item, quantity: quantity + 1 }
      }
      return item
    })
    setListItems(plusState)
  }

  function substractItem(id) {
    const minusState = listItems.map((item) => {
      if (item.id === id && !completed) {
        return { ...item, quantity: quantity - 1 }
      }
      return item
    })
    setListItems(minusState)
  }

  function deleteItem(id) {
    setListItems(listItems.filter((item) => item.id !== id))
  }

  function editName(id) {
    setListItems(
      listItems.map((item) => {
        if (item.id === id) {
          const newItemName = prompt("Nuevo Nombre: ")
          if (newItemName) {
            const newItemToUpper = newItemName.slice("", 1).toUpperCase() + newItemName.slice(1).toLowerCase();
            return { ...item, name: newItemToUpper }
          }
        }
        return item
      })
    )
  }

  function completeItem(id) {
    setListItems(
      listItems.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed }
        }
        return item
      })
    )
  }


  return (
    <div className={editActive ? styles.trashAndItemContainer : ""}>
      <div className={styles.trashContainer}>
      {editActive && <AiFillDelete onClick={() => deleteItem(id)} className={styles.trashIcon} />}
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.completeAndP}>
          <div onClick={() => completeItem(id)} className={styles.completition}>
            {completed && <BsCheckLg className={styles.checkIcon} />}
          </div>
          <p onClick={editActive ? () => editName(id) : () => completeItem(id)} className={completed ? `${styles.itemName} ${styles.itemCompleted}` : styles.itemName}>{itemName}</p>
          {editActive && <MdOutlineEdit className={styles.editPencil} onClick={() => editName(id)} />}
        </div>
        <div className={styles.quantityContainer}>
          {quantity === 1 && <div className={styles.placeholderForMinus}></div>}
          {quantity > 1 && <AiOutlineMinus onClick={() => substractItem(id)} className={`${styles.quantityIcons} ${styles.minusIcon}`} />}
          <p>{quantity}</p>
          <AiOutlinePlus onClick={() => addItem(id)} className={`${styles.quantityIcons} ${styles.plusIcon}`} />
        </div>
      </div>
    </div>
  )
};