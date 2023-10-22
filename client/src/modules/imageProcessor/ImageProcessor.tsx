import './ImageProcessor.scss'
import ImageCanvas from './components/imageCanvas/ImageCanvas'
import ImageControls from './components/imageControls/ImageControls'
import ImageInput from './components/imageInput/ImageInput'
import { useImageStore } from './store'

interface ImageEditorProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLDivElement> {
}
export default function ImageEditor(props: ImageEditorProps) {

    const { ...rest } = props

    const image = useImageStore(state => state.image)

    return (
        <section className='image-processor' {...rest}>
            {image === undefined ? <ImageInput /> : <>
                <ImageCanvas />
                <ImageControls />
            </>}
        </section>
    )
}