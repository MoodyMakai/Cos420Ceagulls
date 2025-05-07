/* eslint-disable react-refresh/only-export-components */
import {Skin} from "../interfaces/skins";

//Creates a skin taking the name of the skin itself
export function SkinCreate(name: string): Skin {
    const basePath = `/skins/${name}`; // PUBLIC folder path
    return {
        head: `${basePath}/head.png`, 
        body: `${basePath}/body.png`,
        tail: `${basePath}/tail.png`,
        turn: `${basePath}/turn.png`,
        fruit: `${basePath}/fruit.png`
    };
}

//Creates a skin for the second player
export function SkinCreatePlayer2(name: string): Skin {
    const basePath = `/skins/${name}`; // PUBLIC folder path
    return {
        head: `${basePath}/head2.png`, 
        body: `${basePath}/body2.png`,
        tail: `${basePath}/tail2.png`,
        turn: `${basePath}/turn2.png`,
        fruit: `${basePath}/fruit.png`
    };
}

export function loadSkins(): Skin[] {
    const skinList = ["default", "square", "blurple"];
    return skinList.map((skin: string) => SkinCreate(skin));
}

export function loadSkins2(): Skin[] {
    const skinList = ["default", "square", "blurple"];
    return skinList.map((skin: string) => SkinCreatePlayer2(skin));
}

