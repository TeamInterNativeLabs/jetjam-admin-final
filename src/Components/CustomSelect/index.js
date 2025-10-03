import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './style.css'

export const SelectBox = (props) => {
    const handleClick = (e) => {
        console.log(e)
    }

    return (
        <div className="inputWrapper">
            {
                props?.iconShow &&
                <div className="inputIcon">
                    <FontAwesomeIcon icon={props?.iconShow} />
                </div>
            }
            {props?.label && <label htmlFor={props?.id} className={props?.labelClass}>{props?.label}<span className='text-danger'>{props?.required ? ' *' : ''}</span></label>}
            <div className="fieldData">
                <select className={props?.selectClass} name={props?.name} value={props?.value} onChange={props?.onChange}>
                    <option value="">{props?.name}</option>
                    {Array.isArray(props.option) && props.option.map(item => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                </select>
                {props?.buttonAction && (
                    <button type='button' onClick={handleClick}><FontAwesomeIcon icon={faTrashAlt} className="removeField"></FontAwesomeIcon></button>
                )
                }
            </div>

        </div>
    )
}
