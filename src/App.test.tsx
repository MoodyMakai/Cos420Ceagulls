import App from './App.tsx';
import {test, expect, describe} from 'vitest';
import {render, screen} from "@testing-library/react";

describe("App Tests", () => {
       
    render(<App/>);

    test("Logo apppears on the Page", () => {
        const Logo = screen.getByAltText(/SUPER SNAKE/i);
        expect(Logo.getAttribute("src")).toContain("../src/assets/super_snake_logo.png");
    });

    test("Skin Button Image Exists", () => {
        const skin = screen.getByAltText(/Skins/i);
        expect(skin.getAttribute('src')).toContain('../src/assets/super_snake_skins.png');
    });
});

