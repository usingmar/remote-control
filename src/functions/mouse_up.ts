import robot from 'robotjs'

export const mouse_up = (offset: string): void => {
    robot.moveMouse(robot.getMousePos().x, robot.getMousePos().y - parseInt(offset));
    process.stdout.write("mouse_up\0");
}