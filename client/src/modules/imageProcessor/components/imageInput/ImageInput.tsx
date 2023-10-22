import { createRef, useEffect, } from 'react'
import { useImageStore } from '../../store'
import uploadImage from './imgs/upload-icon.png'
import './ImageInput.scss'

function ImageInput() {
    const setImage = useImageStore(store => store.setImage)

    const dragoverAreaRef = createRef<HTMLLabelElement>()

    useEffect(() => {
        dragoverAreaRef.current?.addEventListener('dragover', (e) => {
            e.preventDefault()
        })
        dragoverAreaRef.current?.addEventListener('drop', (e) => {
            e.preventDefault()
            setImage(e.dataTransfer!.files![0])
        })
    }, [])
    return (
        <div className='image-upload'>
            <label
                htmlFor="image-input"
                className='image-upload__dragover'
                ref={dragoverAreaRef}
            >
                <input
                    type="file"
                    accept="image/"
                    id='image-input'
                    hidden
                    onChange={(e) => setImage(e.target.files![0])}
                />
                <img src={uploadImage} alt="upload-icon" />
                <p>Drag and Drop or Click to Upload Your Image</p>
            </label>
        </div>
    )
}
export default ImageInput