import {Skin} from "../interfaces/skins";

//Creates a skin taking the name of the skin itself
export function SkinCreate(name: string): Skin {
    const basePath = `/skins/${name}`; // PUBLIC folder path
    return {
        head: `${basePath}/head.png`, 
        body: `${basePath}/body.png`,
        tail: `${basePath}/tail.png`,
        turn: `${basePath}/turn.png`
    };
}