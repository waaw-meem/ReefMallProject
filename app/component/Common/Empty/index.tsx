import React from 'react'
import style from "./index.module.scss"

const Empty = () => {
  return (
    <div className={style.emptyWrapper}>
      <h5 className={style.text}>No Brands Found</h5>
    </div>
  )
}

export default Empty