import robot from "robotjs"
import ws from "ws"

export const mouse_position = (socket: ws.WebSocket) => {
    process.stdout.write(`mouse_position\0`);
    process.stdout.write(`mouse_position ${robot.getMousePos().x},${robot.getMousePos().y}\0`);
    socket.send(`mouse_position ${robot.getMousePos().x},${robot.getMousePos().y}\0`);
}