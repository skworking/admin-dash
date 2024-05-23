import React from 'react'
import styles from '../../../../../styles/page.module.css'
const Button = (props) => {
    const {onClick,styles,text,disable,type}=props;
  return (
    <button
    stylediv={styles.containerdivright} inputstyle={styles.containerdivinput}
    type={type} 
    className={styles} 
    onClick={onClick}
    disabled={disable}
    >
        {text}
    </button>
  )
}

export default Button;
