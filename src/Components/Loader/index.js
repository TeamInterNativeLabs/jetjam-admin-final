import React from 'react'
import { Spinner } from 'react-bootstrap'
import './style.css'

const Loader = ({ shimmer }) => {

    return (
        shimmer ? <div className='shimmer' /> : (
            <div className='spinner-wrapper' >
                <Spinner className='spinner-main' />
            </div >
        )
    )
}

export default Loader
