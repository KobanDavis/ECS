# ECS

This is a simple ECS engine written in TypeScript, intended to learn about the ECS architecture within game development.  
I use the library `@kobandavis/canvas` as a utility.

## Concept

ECS stands for Entity-Component-System.  
This pattern follows the idea that:

1. Everything is a game is an Entity,
2. an Entity will contain Components, or essentially data, that
3. are passed into a series of Systems every frame of the game loop.

![ECS screenshot](https://miro.medium.com/max/960/1*yoLxDyQoFzC0je_oHkcppw.png)

## Exports

-   `@kobandavis/ecs`

    > The following classes are the core of the ECS architecture, relying on the principle of composition over inheritance.  
    > These classes are made to be imported, and then implemented by other classes, using the `class x implements y {}` syntax.

    -   `Entity`

        An entity is the base object of the project. It will have 4 public methods for manipulating Components:

        -   `getComponent` -> `Component`
        -   `hasComponent` -> `boolean`
        -   `addComponent` -> `void`
        -   `removeComponent` -> `void`

        It also has a `print` method, useful for debugging.

    -   `Component`

        A component is a piece of data that is tied to an entity. Think of it as a key/value pair. It will have 1 public method:

        -   `update`

            This method should be called when the value of the component needs to be updated.
            It will also have 2 public properties:

        -   `name`

            The name of the component, or essentially the key, which is used when `<Entity>.getComponent(name)` is called

        -   `value`

            The value of the component, which is used as state.

    -   `System`

        A system is the logic of the project. It will have 3 public methods:

        -   `enter`

            This method is called whenever a new entity is added to the engine,
            usually to add entities to a local store.

        -   `update`

            This method is called every frame of the game loop. This is where the logic happens,
            usually applied to the entities stored prior.

        -   `exit`

            This method is called whenever an entity is removed from the engine.
            A common use case is to remove the entity from the local store,
            and to take necessary steps to teardown the entity.

    > Also included is an engine. This class helps to run the project.

    -   `Engine`

        This class has 2 public properties:

        -   `canvas`

            This is an instance of `@kobandavis/canvas`'s Canvas class. This is useful for rendering the project, especially when used inside `nextTick` as explained below.

        -   `systems`

            This is an array of the systems used to process the projects logic. Each of the lifecycle methods below will call the respective methods on each system in the array.

        This class also has 3 public methods:

        -   `nextTick`

            This method clears the canvas, then calls `<System>.update()` on each system in the `Engine.systems` array.

        -   `addEntity`

            This method accepts an `entity`, which will be fed into all of the systems, using `<System>.enter(entity)`

        -   `removeEntity`

            This method accepts an entity `id`, or string, which will call `<System>.exit(entityId)` for each system.
