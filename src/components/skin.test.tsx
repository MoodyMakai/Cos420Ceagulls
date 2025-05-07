import {SkinCreate} from './skin.tsx';
import {test, expect, describe} from 'vitest';
//import {render, screen} from "@testing-library/react";

describe("App Tests", () => {
       
    test("Head sprite loads correct", () => {
        const skin = SkinCreate("default");
        expect(skin.head === "../default/head.png");
    });

    test("Body sprite loads correct", () => {
        const skin = SkinCreate("default");
        expect(skin.body === "../default/body.png");
    });

    test("Tail sprite loads correct", () => {
        const skin = SkinCreate("default");
        expect(skin.tail === "../default/tail.png");
    });

    test("Turn sprite loads correct", () => {
        const skin = SkinCreate("default");
        expect(skin.turn === "../default/turn.png");
    });

    test("Different Sprites are created when using SkinCreate", () => {
        const skin = SkinCreate("default");
        const skin2 = SkinCreate("blurple");
        expect(skin != skin2);
    });

    test("Different Sprites are created when using SkinCreate", () => {
        const skin = SkinCreate("default");
        const skin2 = SkinCreate("blurple");
        expect(skin != skin2);
    });    

});