import { Direction, Frames, Model } from '../../types'

function flipCanvas(canvas: HTMLCanvasElement, size: number) {
	const ctx = canvas.getContext('2d')
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
	const { data } = imageData

	const flippedData = new Uint8ClampedArray(data.length)
	const lineLength = size * 4

	for (let i = 0; i < size; i++) {
		const lineIndex = i * lineLength
		for (let j = 0; j < size; j++) {
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

function upscaleImage(image: HTMLImageElement, flip?: boolean): Promise<ImageBitmap> {
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
		flipCanvas(upscaledCanvas, newSize)
	}

	return createImageBitmap(upscaledCanvas)
}

interface Config {
	directionOrder: Direction[]
	activeFrames: number
	idleFrames: number
	name: string
	path: string
}

class AssetManager {
	public models: Map<string, Frames[][]>
	constructor(_baseDirectory: string) {
		this.models = new Map()
	}

	public async loadSpriteSheet(config: Config): Promise<void> {}

	private _getImage(path: string, shouldFlip?: boolean) {
		return new Promise<ImageBitmap>((resolve, reject) => {
			const image = new Image()
			image.src = path
			image.onerror = reject
			image.onload = async () => {
				const bitmap = upscaleImage(image, shouldFlip)
				resolve(bitmap)
			}
		})
	}
}

export default AssetManager
