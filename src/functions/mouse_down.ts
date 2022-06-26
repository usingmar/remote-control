import robot from "robotjs"

export const mouse_down = (offset: string) => {
    robot.moveMouse(robot.getMousePos().x, robot.getMousePos().y + parseInt(offset));
    process.stdout.write("mouse_down\0");
}