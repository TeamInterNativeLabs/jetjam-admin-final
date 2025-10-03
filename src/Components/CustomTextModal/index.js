import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'react-bootstrap';

import CustomInput from '../CustomInput';

import './style.css';
import CustomButton from '../CustomButton';

const CustomTextModal = (props) => {
    return (
        <Modal show={props?.show} centered onHide={props?.close}>
            <button className='closeButton' onClick={props?.close}><FontAwesomeIcon icon={faTimes} /></button>
            <Modal.Body className='text-center'>
                <div className="modalContent">
                    <h2 className="modalHeading">{props?.heading}</h2>
                    {
                        props?.textboxes?.map((item, index) => (
                            <CustomInput
                                value={item.value}
                                label={item?.label}
                                required
                                id='userEmail'
                                type={item?.type || "text"}
                                placeholder={item?.placeholder}
                                labelClass='mainLabel'
                                inputClass='mainInput'
                                onChange={item?.onChange} />
                        ))
                    }
                    <CustomButton onClick={props?.action} variant='primaryButton' text="Save" className="me-2" loading={props?.loading} />
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default CustomTextModal