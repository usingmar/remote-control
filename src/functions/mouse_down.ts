import robot from "robotjs"

export const mouse_down = (offset: string) => {
    robot.moveMouse(robot.getMousePos().x, robot.getMousePos().y + parseInt(offset));
    console.log("mouse_down\n");
}