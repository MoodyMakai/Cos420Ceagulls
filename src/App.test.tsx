import App from './App.tsx';
import {test, expect} from 'vitest';
import {render, screen} from "@testing-library/react";

test("Logo apppears on the Page", () => {

    render(<App/>);
    const Logo = screen.getByAltText(/SUPER SNAKE/i)
    expect(Logo.getAttribute("src")).toContain("../src/assets/super_snake_logo.png");
 

});

