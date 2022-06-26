import robot from "robotjs"

export const draw_circle = (radius: number) => {
    const startPos = robot.getMousePos();
    robot.moveMouse(startPos.x + (radius * Math.cos(0.01)), startPos.y + (radius * Math.sin(0.01)));
    robot.mouseToggle("down");
    for (let i = 0.01 ; i <= Math.PI * 2; i += 0.01) {
        const x = startPos.x + (radius * Math.cos(i));
        const y = startPos.y + (radius * Math.sin(i));
        robot.dragMouse(x, y);
    }
    robot.mouseToggle("up");
    console.log(`draw_circle ${radius}\n`);
}