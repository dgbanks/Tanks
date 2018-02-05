# Tanks ([play here](https://dgbanks.github.io/Tanks/))

### Background / Overview

Tanks is a clone of similar 2D toy tanks games like the Wii Play minigame of the same name.

Users can play multiple levels containing enemy tanks of increasing difficulty (as denoted by color).

### Functionality & MVP

Users will be able to:
* control the movements of their tank
* fire projectiles at enemy tanks
* ascend to more difficult levels after each success

Controls:
* WASD or arrow buttons will be used to control tank movements
* the cursor and clicking will be used to aim and shoot

### Wireframe

(https://github.com/dgbanks/Tanks/blob/master/images/tanks_mockup.png)

### Architecture and Technology

* JavaScript will be used to handle the game's overall structure and logic
* Canvas will be used to render and manipulate the board's boundaries and barriers, as well as the tanks themselves

Separate script files will be used to handle:

* Tanks: the primary moving objects in the game
* Board: the environment in which the tanks will be housed
* Game: whether the user has lost a life or moved on to the next level
* Level: adding additional barriers or enemies to augment difficulty after each victory

### Implementation Timeline

###### Day 1
Have a basic board with boundaries and a single, user controllable tank.

###### Day 2
Make projectiles for the tank to shoot on command, and an enemy tank whose defeat triggers a victory message.

###### Day 3
Work on writing some enemy tank logic, such as a time interval for firing missiles, some random movements, ability to 'see' user's tank.

###### Day 4
Have each victory render a new 'level' with additional barriers and enemy tanks.
