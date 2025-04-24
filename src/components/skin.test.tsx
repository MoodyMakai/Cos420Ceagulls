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
        expect(skin.head === "../default/head.png");
    });

    test(" sprite loads correct", () => {
        const skin = SkinCreate("default");
        expect(skin.head === "../default/head.png");
    });

    test("Head sprite loads correct", () => {
        const skin = SkinCreate("default");
        expect(skin.head === "../default/head.png");
    });

});