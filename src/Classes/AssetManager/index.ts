import { Position } from '@kobandavis/canvas'
import { CardinalDirection, Model } from '../../types'

const createCanvas = (width: number, height: number) => {
	const canvas = document.createElement('canvas')
	canvas.width = width
	canvas.height = height
	return canvas
}

function upscaleCanvas(canvas: HTMLCanvasElement, oldSize: number, newSize: number): HTMLCanvasElement {
	const zoom = newSize / oldSize
	const newWidth = canvas.width * zoom
	const newHeight = canvas.height * zoom
	const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data
	const upscaledCanvas = createCanvas(newWidth, newHeight)

	const upscaledCtx = upscaledCanvas.getContext('2d')

	for (let x = 0; x < canvas.width; ++x) {
		for (let y = 0; y < canvas.height; ++y) {
			const i = (y * canvas.width + x) * 4
			const r = imageData[i]
			const g = imageData[i + 1]
			const b = imageData[i + 2]
			const a = imageData[i + 3]
			upscaledCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`
			upscaledCtx.fillRect(x * zoom, y * zoom, zoom, zoom)
		}
	}

	return upscaledCanvas
}

export interface SpriteSheetConfig {
	resolution: number
	desiredResolution?: number
	name: string
	width: number
	height: number
	count: number
	imageNames: string[][]
	spriteSheet: string
}

export interface AnimatedSpriteSheetConfig {
	resolution: number
	desiredResolution?: number
	name: string
	width: number
	height: 4
	spriteSheet: string
	order: [CardinalDirection, CardinalDirection, CardinalDirection, CardinalDirection]
	idleFrameIndex: number
	animationOrder: number[]
}

interface ImageInfo {
	bitmap: ImageBitmap
	width: number
	height: number
}

interface ImageData {
	resolution: number
	bitmap: ImageBitmap
	images: {
		[key: string]: Position
	}
}

interface AnimatedImageData {
	resolution: number
	bitmap: ImageBitmap
	model: Model
	animationOrder: number[]
}

class AssetManager {
	private _animatedSpriteSheets = new Map<string, AnimatedImageData>()
	private _spriteSheets = new Map<string, ImageData>()

	public getSpriteSheet(name: string): ImageData {
		return this._spriteSheets.get(name)
	}

	public getAnimatedSpriteSheet(name: string): AnimatedImageData {
		return this._animatedSpriteSheets.get(name)
	}

	public async loadAnimatedSpriteSheet(config: AnimatedSpriteSheetConfig): Promise<void> {
		const imageData = await this._getImageInfo(config.spriteSheet, config.resolution, config.desiredResolution)
		const resolution = config.desiredResolution || config.resolution
		const model = {} as Model

		for (let i = 0; i < config.height; i++) {
			const animation: Position[] = []
			for (let j = 0; j < config.width; j++) {
				animation.push({
					x: resolution * j,
					y: resolution * i,
				})
			}
			model[config.order[i]] = {
				active: animation,
				idle: animation[config.idleFrameIndex],
			}
		}

		this._animatedSpriteSheets.set(config.name, {
			resolution,
			bitmap: imageData.bitmap,
			model,
			animationOrder: config.animationOrder,
		})
	}

	public async loadSpriteSheet(config: SpriteSheetConfig): Promise<void> {
		const imageData = await this._getImageInfo(config.spriteSheet, config.resolution, config.desiredResolution)
		const resolution = config.desiredResolution || config.resolution
		let count = 0
		const images: ImageData['images'] = {} as any
		for (let i = 0; i < config.height; i++) {
			for (let j = 0; j < config.width; j++) {
				if (count === config.count) break
				images[config.imageNames[i][j]] = {
					x: resolution * j,
					y: resolution * i,
				}
				count++
			}
		}

		this._spriteSheets.set(config.name, {
			resolution,
			bitmap: imageData.bitmap,
			images,
		})
	}

	private _getImageInfo(path: string, resolution: number, desiredResolution?: number): Promise<ImageInfo> {
		return new Promise<ImageInfo>((resolve, reject) => {
			const image = new Image()
			image.src = path
			image.onerror = reject
			image.onload = async () => {
				let canvas = createCanvas(image.width, image.height)
				canvas.getContext('2d').drawImage(image, 0, 0)
				if (desiredResolution !== undefined) {
					canvas = upscaleCanvas(canvas, resolution, desiredResolution)
				}
				const bitmap = await createImageBitmap(canvas)
				resolve({ bitmap, height: canvas.height, width: canvas.width })
			}
		})
	}
}

export default AssetManager
