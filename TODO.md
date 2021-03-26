# TODO

-   [ ] Modularise `src/Classes/Game/index.ts` - at the moment it is hardcoded.
-   [ ] Add collision systems
    -   [ ] static using uniform grid(?)
    -   [ ] dynamic with a quadtree
-   [ ] Add rendering
    -   [x] add nearest-neighbour upscaling for pixel feel
    -   [x] add asset loading
    -   [ ] add asset rendering (spritesheet)
        -   [x] static
        -   [ ] dynamic (static animation? e.g. waterfall)
        -   [x] model based
-   [x] Create assemblage class to easier create entities with grouped components faster
-   [ ] Create a room class
    -   [ ] implement procedural map generation
    -   [ ] create room with above algorithm
-   [ ] Add gamepad input/movement system
-   [ ] Test KeyboardInput system to update direction on keypress, not on update
