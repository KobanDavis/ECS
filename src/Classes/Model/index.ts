import { Direction, Frames } from '../../types'

interface Model {
	movement: Record<Direction, Frames>
}

class Model {
	public async imageToBitmap(image: string): Promise<ImageBitmap> {
		return this.getImage(image)
	}

	private getImage(path: string, flip?: boolean) {
		return new Promise<ImageBitmap>((resolve, reject) => {
			const image = new Image()
			image.src = path
			image.onerror = reject
			image.onload = async () => {
				const bitmap = this.upscaleImage(image, flip)
				resolve(bitmap)
			}
		})
	}

	private upscaleImage(image: HTMLImageElement, flip?: boolean): Promise<ImageBitmap> {
		const createCanvas = (d: number) => {
			const canvas = document.createElement('canvas')
			canvas.width = d
			canvas.height = d
			return canvas
		}

		const oldSize = 32
		const newSize = 128
		const zoom = newSize / oldSize

		const initialCanvas = createCanvas(oldSize)
		const initialCtx = initialCanvas.getContext('2d')

		initialCtx.drawImage(image, 0, 0)
		const imageData = initialCtx.getImageData(0, 0, image.width, image.height).data

		const upscaledCanvas = createCanvas(newSize)
		const upscaledCtx = upscaledCanvas.getContext('2d')

		for (let x = 0; x < image.width; ++x) {
			for (let y = 0; y < image.height; ++y) {
				const i = (y * image.width + x) * 4
				const r = imageData[i]
				const g = imageData[i + 1]
				const b = imageData[i + 2]
				const a = imageData[i + 3]
				upscaledCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`
				upscaledCtx.fillRect(x * zoom, y * zoom, zoom, zoom)
			}
		}

		if (flip) {
			this.flipCanvas(upscaledCanvas)
		}

		return createImageBitmap(upscaledCanvas)
	}

	private flipCanvas(canvas: HTMLCanvasElement) {
		const ctx = canvas.getContext('2d')
		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
		const { data } = imageData

		const flippedData = new Uint8ClampedArray(data.length)
		const lineLength = 128 * 4

		for (let i = 0; i < 128; i++) {
			const lineIndex = i * lineLength
			for (let j = 0; j < 128; j++) {
				const pixelIndex = j * 4
				const oldIndex = lineIndex + pixelIndex
				const newIndex = lineIndex + (lineLength - pixelIndex - 4)
				flippedData[oldIndex] = data[newIndex]
				flippedData[oldIndex + 1] = data[newIndex + 1]
				flippedData[oldIndex + 2] = data[newIndex + 2]
				flippedData[oldIndex + 3] = data[newIndex + 3]
			}
		}

		imageData.data.set(flippedData)
		ctx.putImageData(imageData, 0, 0)
	}
}

export default Model
