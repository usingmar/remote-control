import ws from "ws"
import { mouse_position } from "./functions/mouse_position"
import { mouse_up } from "./functions/mouse_up"
import { mouse_down } from "./functions/mouse_down"
import { mouse_left } from "./functions/mouse_left"
import { mouse_right } from "./functions/mouse_right"
import { draw_circle } from "./functions/draw_circle"
import { draw_rectangle } from "./functions/draw_rectangle"
import { draw_square } from "./functions/draw_square"
import { prnt_scrn } from "./functions/prnt_scrn"

const main = async () => {
    const server = new ws.Server({ port: 8181}, () => console.log('Server started on port 8181'));

    server.on('connection', (ws) => {
        process.stdout.write("Connected");
        process.stdout.write("WebSocket port: 8181");
        ws.on('message', (buffer: Buffer) => {
            let incomingMessage = buffer.toString();
            let command = incomingMessage.split(' ')[0];
            switch(command){
                case "mouse_position": 
                    mouse_position(ws);
                    break;
                case "mouse_up":
                    mouse_up(incomingMessage.split(' ')[1]);
                    break;

                case "mouse_down":
                    mouse_down(incomingMessage.split(' ')[1]);
                    break;

                case "mouse_left":
                    mouse_left(incomingMessage.split(' ')[1]);
                    break;

                case "mouse_right":
                    mouse_right(incomingMessage.split(' ')[1]);
                    break;
                case "draw_circle":{
                    draw_circle(parseInt(incomingMessage.split(' ')[1]));
                    break;
                }
                case "draw_rectangle":{
                    draw_rectangle(parseInt(incomingMessage.split(' ')[1]), parseInt(incomingMessage.split(' ')[2]));
                    break;
                }
                case "draw_square":{
                    draw_square(parseInt(incomingMessage.split(' ')[1]));
                    break;
                }
                case "prnt_scrn":
                    prnt_scrn(ws);
                    break;
            }
        });
        ws.on('close', () => {
            process.stdout.write('Closed');
            ws.close();
        });
        process.on('SIGINT', function() {
            console.log("Caught interrupt signal");
            ws.close();
            process.exit();
        });
    })
}

main();
