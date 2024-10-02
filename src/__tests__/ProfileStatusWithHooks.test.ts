// import {describe, test, vitest} from "vitest";
// import {render} from "@testing-library/react";
// import {ProfileStatus} from "../components/profile/info/ProfileStatus.tsx";
// import React from "react";

// describe("ProfileStatus", () => {
//   test("status from props in state", () => {
// const initState = {
//   status: "test status",
// };
// const setState = vitest.fn();
// vitest
//   .spyOn(React, "useState")
//   .mockImplementationOnce(() => [initState, setState]);
//
// render(ProfileStatus({status: "test status"}));
// const {getByTestId} = render(ProfileStatus({status: "test status"}));
// expect(getByTestId("status").innerText).toBe("test status");

// const component = render(ProfileStatus({status: "test status"}));
// component.getByTestId("status")
// expect(component.getByTestId("status").innerText).toBe("test status");
// })
// });
