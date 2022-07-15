import robot from 'robotjs'

export const mouse_up = (offset: string): void => {
    robot.moveMouse(robot.getMousePos().x, robot.getMousePos().y - parseInt(offset));
    console.log("mouse_up\n");
}