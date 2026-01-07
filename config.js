// config.js
// Centralized configuration for Fruits Game
var GAME_CONFIG = {
    // list of fruit image names (without extension)
    fruits: ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'],

    // initial number of lives/trials
    initialTrials: 3,

    // spawn horizontal range in pixels (used to position fruits randomly)
    spawnXRange: 550,

    // step (speed) range for falling fruits (inclusive)
    stepMin: 1,
    stepMax: 6,

    // interval tick in milliseconds for moving fruits
    intervalDelay: 10,

    // paths for assets
    fruitImagePath: 'images/',
    heartImagePath: 'images/heart.png',

    // id of the audio element for slicing sound (kept for convenience)
    sliceSoundElementId: 'slicesound'
};
