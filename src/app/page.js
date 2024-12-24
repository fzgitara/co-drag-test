'use client';

import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {

  const groups = ["available", "selected"];
  const [options, setOptions] = useState([
    { id: 1, group: groups[0], value: "Sales Cloud"},
    { id: 2, group: groups[0], value: "Service Cloud"},
    { id: 3, group: groups[0], value: "Community Cloud"},
    { id: 4, group: groups[0], value: "Financial Cloud"},
    { id: 5, group: groups[0], value: "Eintstein AI"},
    { id: 6, group: groups[0], value: "Wave Analytics"},
    { id: 7, group: groups[0], value: "Health Cloud"}
  ]);
  const [dragStartId, setDragStartId] = useState();
  const [dragEnterId, setDragEnterId] = useState();

  const handleDragStart = e => {
    const dragId = Number(e.target.id)
    setDragStartId(dragId);
  };

  const handleDragEnter = group => {
    let updatedOptions = [...options];
    const indexDragStart =
      updatedOptions.findIndex(option => option.id === dragStartId);
    const indexDragEnter =
      updatedOptions.findIndex(option => option.id === dragEnterId);

    updatedOptions[indexDragStart].group = group;
    const optionMove = updatedOptions[indexDragStart];
    updatedOptions.splice(indexDragStart, 1);
    updatedOptions.splice(indexDragEnter - 1, 0 , optionMove);

    setOptions(updatedOptions);
  };

  return (
    <div className={styles.page}>
      <div className={styles.selectedBox} >
        {options.map(option => {
          if (option.group === "selected") {
            return (
              <div className={styles.selectedOptionBox} key={option.id}>
                {option.value}
              </div>
            )
          }
        })}
      </div>

      <div className={styles.optionsContainer}>
        <div
          className={styles.availableOptionsContainer}  
          onDragEnter={() => handleDragEnter("available")}
        >
          <h4>Available Options</h4>
          {options.map(option => {
            if (option.group === "available") {
              return (
                <div
                  key={option.id}
                  id={option.id}
                  className={styles.availableOptionContainer}
                  draggable
                  onDragStart={e => handleDragStart(e)}
                  onDragEnter={() => setDragEnterId(option.id)}
                >
                  {option.value}
                </div>
              )
            }
          })}
        </div>
        <div
          className={styles.selectedOptionsContainer}
          onDragEnter={() => handleDragEnter("selected")}
        >
          <h4>Selected Options</h4>
          {options.map(option => {
            if (option.group === "selected") {
              return (
                <div
                  key={option.id}
                  id={option.id}
                  className={styles.selectedOptionContainer}
                  draggable
                  onDragStart={e => handleDragStart(e)}
                  onDragEnter={() => setDragEnterId(option.id)}
                >
                  {option.value}
                </div>
              )
            }
          })}
        </div>
      </div>
    </div>
  );
}
