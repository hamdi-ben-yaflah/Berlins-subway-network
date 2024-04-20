import { lines } from "../../data";
import { getRoute } from "../getRoute";

it(`finds route on the same line U7 Siemensdamm -> Jungfernheide`, () => {
  const route = getRoute("Siemensdamm", "Jungfernheide", lines);

  expect(route).toBeDefined();
  expect(route).toHaveLength(2);

  const [enter, exit] = route!;
  expect(enter.action).toBe("enter");
  expect(enter.station).toBe("Siemensdamm");
  expect(enter.line.name).toBe("U7");

  expect(exit.action).toBe("exit");
  expect(exit.station).toBe("Jungfernheide");
  expect(exit.line.name).toBe("U7");
});

it(`works when switching lines`, () => {
  const route = getRoute("Kochstraße", "Yorckstraße", lines);

  expect(route).toBeDefined();
  expect(route).toHaveLength(3);

  const [enter, $switch, exit] = route!;
  expect(enter.action).toBe("enter");
  expect(enter.station).toBe("Kochstraße");
  expect(enter.line.name).toBe("U6");

  expect($switch.action).toBe("switch");
  expect($switch.station).toBe("Mehringdamm");
  expect($switch.line.name).toBe("U7");

  expect(exit.action).toBe("exit");
  expect(exit.station).toBe("Yorckstraße");
  expect(exit.line.name).toBe("U7");
});

it(`works with 2 switches`, () => {
  const route = getRoute("Kochstraße", "Yorckstraße", lines);

  expect(route).toBeDefined();
  expect(route).toHaveLength(3);

  const [enter, $switch1, exit] = route!;
  expect(enter.action).toBe("enter");
  expect(enter.station).toBe("Kochstraße");
  expect(enter.line.name).toBe("U6");

  expect($switch1.action).toBe("switch");
  expect($switch1.station).toBe("Mehringdamm");
  expect($switch1.line.name).toBe("U7");

  expect(exit.action).toBe("exit");
  expect(exit.station).toBe("Yorckstraße");
  expect(exit.line.name).toBe("U7");
});

// ignore these for now - we'll talk about it in the interview
xdescribe("cyclic lines", () => {
  it(`chooses S41 for Westend -> Ostkreuz`, () => {
    const route = getRoute("Westend", "Ostkreuz", lines);

    expect(route).toBeDefined();
    expect(route).toHaveLength(2);

    const [enter, exit] = route!;
    expect(enter.action).toBe("enter");
    expect(enter.station).toBe("Westend");
    expect(enter.line.name).toBe("S41");

    expect(exit.action).toBe("exit");
    expect(exit.station).toBe("Ostkreuz");
    expect(exit.line.name).toBe("S41");
  });

  it(`chooses S42 for Ostkreuz -> Westend`, () => {
    const route = getRoute("Ostkreuz", "Westend", lines);

    expect(route).toBeDefined();
    expect(route).toHaveLength(2);

    const [enter, exit] = route!;
    expect(enter.action).toBe("enter");
    expect(enter.station).toBe("Ostkreuz");
    expect(enter.line.name).toBe("S42");

    expect(exit.action).toBe("exit");
    expect(exit.station).toBe("Westend");
    expect(exit.line.name).toBe("S42");
  });
});
