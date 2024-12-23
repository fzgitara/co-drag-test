'use client';

import Image from "next/image";
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

  const [dragging, setDragging] = useState();

  const handleDragStart = e => {
    setDragging(e.target);
  };

  const handleDragEnter = (e, group) => {
    let updatedOptions = [...options];
    updatedOptions[dragging.id - 1].group = group;
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
          onDragEnter={e => handleDragEnter(e, "available")}
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
                >
                  {option.value}
                </div>
              )
            }
          })}
        </div>
        <div
          className={styles.selectedOptionsContainer}
          onDragEnter={e => handleDragEnter(e, "selected")}
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
