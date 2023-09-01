export const ImageGalleryItem = ({content}) => {
    return (
            content.map(({ id, webformatURL, largeImageURL }) => (
                <li className="gallery-item" key={id}>
                    <img src={webformatURL} alt={largeImageURL} width={250}/>
                </li> 
            ))
    )
}