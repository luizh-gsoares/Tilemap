import * as maps from "./map.js";

const GAME_HEIGHT = 224;
const GAME_WIDTH = 400;
const GAME_TILE = 16;
const ROWS = GAME_HEIGHT / GAME_TILE;
const COLS = GAME_WIDTH / GAME_TILE;

let debug = false;

function getTile(map, col, row) {
    return map[row * COLS + col];
}


window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    // canvas settings
    ctx.imageSmoothingEnabled = false;
    const TILE_IMAGE = document.getElementById("tilemap");
    const IMAGE_TILE = 16;
    const IMAGE_COLS = TILE_IMAGE.width / IMAGE_TILE;

    console.log(ROWS);
    
    let area = maps.AREA1;

    function drawLevel(area) {
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const tile = getTile(area, col, row);
                ctx.drawImage(
                    TILE_IMAGE,
                    ((tile - 1) * IMAGE_TILE) % TILE_IMAGE.width,
                    Math.floor((tile - 1) / IMAGE_COLS) * IMAGE_TILE,
                    IMAGE_TILE,
                    IMAGE_TILE,
                    col * GAME_TILE,
                    row * GAME_TILE,
                    GAME_TILE,
                    GAME_TILE);
                if (debug) {
                    ctx.strokeRect(col * GAME_TILE, row * GAME_TILE, GAME_TILE, GAME_TILE);
                }
            }
        }
    }

    drawLevel(area);

    const debugButton = document.getElementById('debugButton');

    debugButton.addEventListener('click', function () {
        debug = !debug;
        drawLevel(area);
    });

});