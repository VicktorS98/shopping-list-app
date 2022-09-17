import React from "react"
import styles from "./FunctionButtons.module.scss"
import { MdOutlineEdit } from "react-icons/md";
import { FaFilter } from "react-icons/fa";

export default function FunctionButtons({listItems, editActive, setEditActive, filterActive, setFilterActive}) {

  const [storageCleared, setStorageCleared] = React.useState(false)

  function toggleEdit() {
    if (listItems.length > 0) {
      setEditActive(!editActive)
    }
  }

  function clearStorage() {
    if (listItems.length > 0) {
      localStorage.clear();
      setStorageCleared(true);
      setTimeout(() => {
        document.location.reload();
      }, 3000)
    }
  }

  function toggleFilter() {
    setFilterActive(!filterActive)
  }

  return (
    <div className={styles.buttonsContainer}>
      <p onClick={toggleEdit} className={styles.edit}>
        {editActive ? "Dejar de editar" : "Editar"} <MdOutlineEdit />
      </p>
      <div onClick={toggleFilter} className={styles.filter}>
        {filterActive && <span></span>}
        <FaFilter />
      </div>
      <p onClick={clearStorage} className={styles.clearStorage}>
        {storageCleared ? "Espera 3seg" :"Borrar Todo"}
      </p>
    </div>
  )
};