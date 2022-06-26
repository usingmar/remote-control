import robot from "robotjs"

export const draw_rectangle = (a: number, b: number) => {
    const startPos = robot.getMousePos();
    robot.mouseToggle("down");
    robot.dragMouse(startPos.x + a, startPos.y);
    robot.dragMouse(startPos.x + a, startPos.y + b);
    robot.dragMouse(startPos.x, startPos.y + b);
    robot.dragMouse(startPos.x, startPos.y);
    robot.mouseToggle("up");
    process.stdout.write(`draw_rectangle ${a},${b}\0`);
}