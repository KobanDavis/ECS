import Entity from './Entity'

class System {
	/**
	 * Called when entity added
	 */
	public enter(entity: Entity): void {
		throw Error('Not implemented')
	}
	/**
	 * Called when entity removed
	 */
	public exit(id: Entity['id']): void {
		throw Error('Not implemented')
	}
	/**
	 * Called every gameloop
	 */
	public update(): void {
		throw Error('Not implemented')
	}
}

export default System
