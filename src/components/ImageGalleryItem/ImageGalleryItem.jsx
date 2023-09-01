export const ImageGalleryItem = (content) => {
    console.log(content);
    return (
            content.map(({ id, webformatURL, largeImageURL }) => (
                <li className="gallery-item" key={id}>
                    <img src={webformatURL} alt={largeImageURL} />
                </li> 
            ))
    )
}