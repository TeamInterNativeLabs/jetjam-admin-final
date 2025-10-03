const ImageCard = props => {
    return (
        <img className="mx-2" src={props?.src} style={{ width: '200px', height: '200px', objectFit: 'contain', borderRadius: 12, backgroundColor: '#F0F0F0' }} />
    )
}

export default ImageCard