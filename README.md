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

## About

Inside this project, there are multiple folders:

-   `src/ECS`

    This folder is the core of the ECS architecture, relying on the principle of composition over inheritance.  
    This folder contains the 3 main classes used throughout the rest of the source:

    -   `Entity`
    -   `Component`
    -   `System`

    These classes are made to be implemented by other classes, using the `class x implements y {}` syntax.

-   `src/Assemblages`

    This folder contains an `Assemblage` class, which is used to easily group a set of components together to be re-used again.
    Everything else is an assemblage which implements the `Assemblage` class.

-   `src/Components`

    This folder contains all of the components, as defined by the developer.

-   `src/Systems`

    This folder contains all of the systems, once again, as defined by the developer.
    A system will have 3 public methods:

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

-   `src/Classes`

    This folder contains the developer defined classes used to help the game run.
    In this case, it contains:

    -   `Game`
        This class acts as the engine, where systems are setup and where the game loop is started.
    -   `AssetManager`
        This class loads in spritesheets, just before the game loop starts.  
        This is so asynchronous process can happen before the synchronous game loop
