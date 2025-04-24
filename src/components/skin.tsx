import {Skin} from "../interfaces/skins";

//Creates a skin taking the name of the skin itself
export function SkinCreate(name: string): Skin {

    const newSkin: Skin = {
        head: `../assets/skins/${name}/head.png`, 
        body: `../assets/skins/${name}/body.png`,
        tail: `../assets/skins/${name}/tail.png`,
        turn: `../assets/skins/${name}/turn.png`
    }

    return newSkin;
}