import Button from '../../../../components/Button/Button'
import Container from '../../../../components/Container/Container'
import { useImageStore } from '../../store'
import './ImageControls.scss'

function ImageControls() {

    const setWatermark = useImageStore(store => store.setWatermark)
    const saveWatermarkedImage = useImageStore(store => store.saveWatermarkedImage)
    const watermark = useImageStore(store => store.watermark)
    const setWatermarkOpacity = useImageStore(store => store.setWatermarkOpacity)

    const isWatermarkAdded = watermark instanceof File

    return (
        <div className='image-controls'>
            <Container>
                <Button className='image-controls__submit'
                    onClick={saveWatermarkedImage}
                    disabled={!isWatermarkAdded}>
                    Get Image
                </Button>
                <Button
                    className='image-controls__input'
                >
                    <label htmlFor="watermark-input">
                        <input
                            type="file"
                            accept="image/"
                            id='watermark-input'
                            onChange={(e) => setWatermark(e.target.files![0])}
                            hidden
                        />
                        Add Watermark
                    </label>
                </Button>
                {isWatermarkAdded ? <label htmlFor="opacity-range" className='image-controls__opacity'>
                    <input
                        type="range"
                        name="opacity-range"
                        id="opacity-range"
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={(e) => { setWatermarkOpacity(+e.target!.value!) }}
                    />
                    <span>Opacity</span>
                </label> : <></>}
            </Container>
        </div>
    )
}
export default ImageControls