import { StyleImageGallery } from "./ImageGallery.styled"

export const ImageGallery = ({children}) => {
    return (
        <StyleImageGallery className="gallery">
            {children}
        </StyleImageGallery>
    )
}