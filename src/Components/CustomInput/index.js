import React, { useState } from 'react'
import "./style.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { formatTime } from "../../Utils/index"

const CustomInput = (props) => {

  const [typePass, setTypePass] = useState(true)

  const togglePassType = () => {
    setTypePass(!typePass)
  }

  const onChange = (e) => {

    if (props?.type === "time") {

      let formatted_time = formatTime(e?.target?.value)
      props?.onChange({ target: { value: formatted_time } })

    } else {

      if (props?.maxLength) {

        if (e.target.value > props.maxLength) {
          e.target.value = e.target.value.slice(0, props.maxLength)
        }

        return props?.onChange(e)

      }

      return props?.onChange(e)

    }

  }

  return (
    <div className={`inputWrapper ${props?.containerClass}`}>
      {props?.label && <label htmlFor={props?.id} className={props?.labelClass}>{props?.label}<span>{props?.required ? ' *' : ''}</span></label>}
      {props?.type === 'password'
        ?
        <div className="passwordWrapper">
          <input maxLength={props?.maxLength} type={typePass ? 'password' : 'text'} placeholder={props?.placeholder} value={props && props.value ? props.value : ''} required={props?.required} id={props?.id} name={props?.name} className={`${props?.inputClass} passInput`} onChange={onChange} />
          <button type='button' className='eyeButton' onClick={togglePassType}><FontAwesomeIcon icon={typePass ? faEyeSlash : faEye} /></button>
        </div>
        :
        props?.type === "textarea" ?
          <textarea maxLength={props?.maxLength} type={props?.type} placeholder={props?.placeholder} value={props && props.value ? props.value : ''} required={props?.required} id={props?.id} name={props?.name} className={props?.inputClass} onChange={onChange} />
          :
          <input style={props?.error ? { border: '1px red solid' } : {}} maxLength={props?.maxLength} type={props?.type === "time" ? "text" : props?.type} placeholder={props?.placeholder} value={props && props.value ? props.value : ''} required={props?.required} id={props?.id} name={props?.name} className={props?.inputClass} onChange={onChange} />
      }
      {props?.error && <p className='mt-1 text-danger text-small'>{props?.error}</p>}
    </div>
  )
}
export default CustomInput;
