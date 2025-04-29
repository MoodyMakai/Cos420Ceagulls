/*
    Interface for creating Skins
*/
export interface Skin {
    head: string, //the head of the snake
    body: string, //the body of the snake
    tail: string, //the tail of the snake
    turn: string, //the turning animation of the snake
    fruit: string, //the sprite of the fruit the snake can eat
}