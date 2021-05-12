class Component<T = any> {
	public name: string
	public value: T
	public update(value: any): void {}
}

export default Component
