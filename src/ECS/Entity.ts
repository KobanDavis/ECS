import Component from './Component'

class Entity {
	private _components = new Map<string, Component>()
	public id = Math.random().toString().slice(2)

	constructor() {
		this.hasComponent = this.hasComponent.bind(this)
		this.addComponent = this.addComponent.bind(this)
		this.getComponent = this.getComponent.bind(this)
	}

	public getComponent<T = any>(name: string): Component<T> {
		return this._components.get(name)
	}
	public hasComponent(name: Component['name']): boolean {
		return this._components.has(name)
	}
	public addComponent(component: Component): this {
		this._components.set(component.name, component)
		return this
	}

	public removeComponent(name: Component['name']): this {
		this._components.delete(name)
		return this
	}

	public print() {
		const self = { ...this } as any
		self._components = Object.fromEntries(self._components.entries())
		console.log(JSON.stringify(this, null, '\t'))
		return this
	}
}

export default Entity
