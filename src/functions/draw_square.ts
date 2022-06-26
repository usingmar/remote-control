import robot from "robotjs"

export const draw_square = (a: number) => {
    const startPos = robot.getMousePos();
    robot.mouseToggle("down");
    robot.dragMouse(startPos.x + a, startPos.y);
    robot.dragMouse(startPos.x + a, startPos.y + a);
    robot.dragMouse(startPos.x, startPos.y + a);
    robot.dragMouse(startPos.x, startPos.y);
    robot.mouseToggle("up");
    console.log(`draw_square ${a}\n`);
}