import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import CustomButton from '../CustomButton';

import { check, question } from '../../Assets/images';

import './style.css'

const CustomModal = (props) => {
    return (
        <Modal show={props?.show} centered onHide={props?.close}>
            <button className='closeButton' onClick={props?.close}><FontAwesomeIcon icon={faTimes} /></button>
            <Modal.Body className='text-center'>
                {props?.success ?
                    <img src={check} alt="check" className='modalImage' />
                    :
                    <img src={question} alt="question" className='modalImage' />
                }
                <div className="modalContent">
                    <h2 className="modalHeading">{props?.heading}</h2>
                    {props?.success ? <CustomButton onClick={props?.close} variant='primaryButton' text={props?.btnTxt ? props?.btnTxt : 'Ok'} loading={props.loading} />
                        :
                        <>
                            <CustomButton onClick={props?.action} variant='primaryButton' text="Yes" className="me-2" loading={props.loading} />
                            <CustomButton onClick={props?.close} variant='secondaryButton' text="No" />
                        </>
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default CustomModal