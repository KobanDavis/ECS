import { ComponentName } from '../types'

class Component<T = any> {
	public name: ComponentName
	public value: T
	public update(value: any): void {}
}

export default Component
