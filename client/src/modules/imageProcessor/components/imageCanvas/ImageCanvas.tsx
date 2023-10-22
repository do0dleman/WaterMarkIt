import './ImageCanvas.scss'
import { useEffect, useState } from "react"
import { useImageStore } from "../../store"
import { fabric } from 'fabric'
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'

function ImageCanvas() {

    const imageURL = URL.createObjectURL(useImageStore(state => state.image!))

    const { editor, onReady } = useFabricJSEditor()
    const [mainImage, setMainImage] = useState<fabric.Image>()
    const [fabricWatermark, setFabricWatermark] = useState<fabric.Image | undefined>(undefined)

    const watermark = useImageStore(state => state.watermark)
    const watermarkOpacity = useImageStore(state => state.watermarkOpacity)
    const setWatermarkPosition = useImageStore(state => state.setWatermarkPosition)
    const setWatermarkTransformation = useImageStore(state => state.setWatermarkTransformation)

    useEffect(() => {
        fabricWatermark?.set({
            opacity: watermarkOpacity
        })
    }, [watermarkOpacity])

    useEffect(() => {
        if (watermark === undefined) return

        const watermarkURL = URL.createObjectURL(watermark)

        if (fabricWatermark) {
            editor?.canvas.remove(fabricWatermark)
        }

        fabric.Image.fromURL(watermarkURL, (img) => {
            img.left = editor?.canvas.getCenter().left! / editor?.canvas.getZoom()! - img.get('width')! / 2
            img.top = editor?.canvas.getCenter().top! / editor?.canvas.getZoom()! - img.get('height')! / 2

            const setWatermarkCenterPosition = () => {
                const centerPos = img.getPointByOrigin('center', 'center') // gets center of an image
                setWatermarkPosition({
                    x: centerPos.x - mainImage!.left!,
                    y: centerPos.y - mainImage!.top!
                })
            }
            img.on('moving', () => {
                setWatermarkCenterPosition()
            })
            img.on('modified', (imgEvent) => {
                setWatermarkTransformation({
                    angle: imgEvent.transform?.target?.angle!,
                    scaleX: imgEvent.transform?.target?.scaleX!,
                    scaleY: imgEvent.transform?.target?.scaleY!,
                })
                setWatermarkCenterPosition()
            })

            editor?.canvas.add(img)

            setWatermarkCenterPosition()
            setFabricWatermark(img)

        })
    }, [watermark])

    useEffect(() => {
        editor?.canvas.setWidth(window.innerWidth)
        editor?.canvas.setHeight(window.innerHeight - 60 - 100) // 60px - size of ImageControls 100px - header
    }, [onReady])

    const [renderCount, setRenderCount] = useState(1) // probably there is more elegant solution but it works
    useEffect(() => {
        if (renderCount > 2) return
        fabric.Image.fromURL(imageURL, (img) => {
            let scaleFactor = 1

            if (img.height! > editor?.canvas.height!) {
                scaleFactor = editor?.canvas.height! / img.height!
                editor?.canvas.setZoom(scaleFactor)
            }

            if (img.width! > editor?.canvas.width!) {
                scaleFactor = editor?.canvas.width! / img.width!
                editor?.canvas.setZoom(scaleFactor)
            }

            img.left = (editor?.canvas.getCenter().left! / scaleFactor - img.get('width')! / 2)
            img.top = (editor?.canvas.getCenter().top! / scaleFactor - img.get('height')! / 2)

            img.selectable = false
            img.evented = false

            editor?.canvas.add(img)
            setMainImage(img)
        })

        setRenderCount(renderCount + 1)

    }, [onReady, fabric])


    return (
        <div>
            <FabricJSCanvas className="image-canvas" onReady={onReady} />
        </div>
    )
}
export default ImageCanvas