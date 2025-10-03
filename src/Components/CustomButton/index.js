import React from 'react'
import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Spinner } from 'react-bootstrap'

const CustomButton = (props) => {
  return (
    <>
      <button type={props?.type} disabled={props?.loading} className={`customButton ${props?.variant} ${props?.className}`} onClick={props?.onClick}>
        {
          props?.loading ? <Spinner  size="sm" /> : (
            <>
              {props?.text} {props?.icon && <FontAwesomeIcon icon={props.icon} />}
            </>
          )}
      </button>
    </>
  )
}
export default CustomButton;
