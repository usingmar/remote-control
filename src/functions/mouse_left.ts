import robot from "robotjs"

export const mouse_left = (offset: string) => {
    robot.moveMouse(robot.getMousePos().x - parseInt(offset), robot.getMousePos().y);
    console.log("mouse_left\n");
}