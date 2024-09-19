import {describe, it} from "vitest";
import {MainApp} from "../App.tsx";
import {render} from "@testing-library/react";

describe("MainApp.tsx", () => {
  it("App renders without crashing ", () => {
    render(MainApp());
  })
});

/*
@TODO
- test component render (if it's OK and is on page)
- test passing props and set to state, render in span
- test changes in UI based on changing props (editMode true/false) + by default
 */
