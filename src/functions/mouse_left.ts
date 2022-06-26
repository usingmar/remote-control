import robot from "robotjs"

export const mouse_left = (offset: string) => {
    robot.moveMouse(robot.getMousePos().x - parseInt(offset), robot.getMousePos().y);
    process.stdout.write("mouse_left\0");
}