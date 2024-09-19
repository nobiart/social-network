// import {describe, test, vitest} from "vitest";
// import {render} from "@testing-library/react";
// import {ProfileStatusWithHooks} from "../components/profile/info/ProfileStatusWithHooks.tsx";
// import React from "react";

// describe("ProfileStatusWithHooks", () => {
//   test("status from props in state", () => {
// const initState = {
//   status: "test status",
// };
// const setState = vitest.fn();
// vitest
//   .spyOn(React, "useState")
//   .mockImplementationOnce(() => [initState, setState]);
//
// render(ProfileStatusWithHooks({status: "test status"}));
// const {getByTestId} = render(ProfileStatusWithHooks({status: "test status"}));
// expect(getByTestId("status").innerText).toBe("test status");

// const component = render(ProfileStatusWithHooks({status: "test status"}));
// component.getByTestId("status")
// expect(component.getByTestId("status").innerText).toBe("test status");
// })
// });
