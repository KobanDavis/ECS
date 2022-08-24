import { ComponentName, Components } from './types'
import Component from './Component'

class Entity {
	private _components = new Map<string, Component>()
	public id = Math.random().toString().slice(2)

	public getComponent<T extends ComponentName>(name: T): Components[T] {
		return this._components.get(name) as Components[T]
	}
	public hasComponent(name: ComponentName): boolean {
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

	public print(): this {
		const self = { ...this } as any
		self._components = Object.fromEntries(self._components.entries())
		console.log(JSON.stringify(self, null, '\t'))
		return this
	}
}

export default Entity
