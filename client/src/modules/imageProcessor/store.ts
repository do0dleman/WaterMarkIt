import saveAs from 'file-saver'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import Pos from '../../models/Pos'
import Transformation from '../../models/Transformation'

type State = {
    image: File | undefined
    watermark: File | undefined
    watermarkPosition: Pos
    watermarkTransformation: Transformation
    watermarkOpacity: number
}

type Actions = {
    setImage: (image: File) => void
    setWatermark: (watermark: File) => void
    setWatermarkPosition: (watermarkPosition: Pos) => void
    setWatermarkTransformation: (watermarkTransformation: Transformation) => void
    saveWatermarkedImage: () => void
    setWatermarkOpacity: (opacity: number) => void
}

export const useImageStore = create(
    immer<State & Actions>((set) => ({
        image: undefined,
        watermark: undefined,
        watermarkPosition: {
            x: 0,
            y: 0,
        },
        watermarkTransformation: {
            angle: 0,
            scaleX: 1,
            scaleY: 1,
        },
        watermarkOpacity: 1,

        setImage: (image: File) =>
            set(state => {
                state.image = image
            }),

        setWatermark: (watermark: File) =>
            set(state => {
                state.watermark = watermark
            }),
        setWatermarkPosition: (watermarkPosition: Pos) =>
            set(state => {
                state.watermarkPosition.x = watermarkPosition.x
                state.watermarkPosition.y = watermarkPosition.y
            }),
        setWatermarkTransformation: (watermarkTransformation: Transformation) =>
            set(state => {
                state.watermarkTransformation.angle = watermarkTransformation.angle
                state.watermarkTransformation.scaleX = watermarkTransformation.scaleX
                state.watermarkTransformation.scaleY = watermarkTransformation.scaleY
            }),

        saveWatermarkedImage: () => {
            set(async state => {
                const formData = new FormData()
                const { image, watermark, watermarkPosition, watermarkTransformation, watermarkOpacity } = state

                formData.append('watermark-position', `${watermarkPosition.x}:${watermarkPosition.y}`)
                formData.append('watermark-opacity', `${watermarkOpacity}`)
                formData.append('watermark-transformation',
                    `${watermarkTransformation.angle}:
                    ${watermarkTransformation.scaleX}:
                    ${watermarkTransformation.scaleY}`
                )
                formData.append('image', image!)
                formData.append('watermark', watermark!)

                const res = await fetch(`${import.meta.env.VITE_API_URL}/image`, {
                    method: 'POST',
                    body: formData
                })
                saveAs(await res.blob(), image?.name)
            })
        },
        setWatermarkOpacity: (opacity: number) =>
            set(state => {
                state.watermarkOpacity = opacity
            }),

    }))
)
