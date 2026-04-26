"use client"
import Link from "next/link";
import styles from "./body.module.css";
import { useState } from "react";

import Session from "./component/session/Session";
import Assignment from "./component/assignment/Assignment"


export default function Body() {

    const [page, setpage] = useState(0)

    const changePage = (n: number) => {
        setpage(n)
    }

    const render = (n: number) =>{
        if (n == 0){
            return <Session/>
        } 
        return <Assignment/>
    }


  return (
    <div className={styles.body}>
      <div className={styles.sidenavbar}>

        <div className={styles.session} onClick={()=>{changePage(0)}}>
          <h4>Session</h4>
        </div>

        <div className={styles.session} onClick={()=>{changePage(1)}}>
          <h4>Assignments</h4>
        </div>
      </div>

      {render(page)}
    </div>
  );
}