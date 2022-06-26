import ws from "ws"
import robot from "robotjs"
import {createReadStream} from 'fs'
import {Readable} from 'stream'
import jimp from 'jimp'

const main = async () => {
    const server = new ws.Server({ port: 8181}, () => console.log('Server started on port 8181'));

    server.on('connection', (ws) => {
        console.log("Connected");
        ws.on('message', (buffer: Buffer) => {
            let incomingMessage = buffer.toString();
            switch(incomingMessage.split(' ')[0]){
                case "mouse_position": 
                console.log(`mouse_position ${robot.getMousePos().x},${robot.getMousePos().y}`);
                ws.send(`mouse_position ${robot.getMousePos().x},${robot.getMousePos().y}`);
                    break;
                case "mouse_up":
                    incomingMessage.split(' ')[1]
                    robot.moveMouse(robot.getMousePos().x, robot.getMousePos().y - parseInt(incomingMessage.split(' ')[1]));
                    break;

                case "mouse_down":
                    robot.moveMouse(robot.getMousePos().x, robot.getMousePos().y + parseInt(incomingMessage.split(' ')[1]));
                    break;

                case "mouse_left":
                    robot.moveMouse(robot.getMousePos().x - parseInt(incomingMessage.split(' ')[1]), robot.getMousePos().y);
                    break;

                case "mouse_right":
                    robot.moveMouse(robot.getMousePos().x + parseInt(incomingMessage.split(' ')[1]), robot.getMousePos().y);
                    break;
                case "draw_circle":{
                    const startPos = robot.getMousePos();
                    const radius = parseInt(incomingMessage.split(' ')[1]);
                    robot.moveMouse(startPos.x + (radius * Math.cos(0.01)), startPos.y + (radius * Math.sin(0.01)));
                    robot.mouseToggle("down");
                    for (let i = 0.01 ; i <= Math.PI * 2; i += 0.01) {
                        const x = startPos.x + (radius * Math.cos(i));
                        const y = startPos.y + (radius * Math.sin(i));
                        robot.dragMouse(x, y);
                    }
                    robot.mouseToggle("up");
                    break;
                }
                case "draw_rectangle":{
                    const startPos = robot.getMousePos();
                    const a = parseInt(incomingMessage.split(' ')[1]);
                    const b = parseInt(incomingMessage.split(' ')[2]);
                    robot.mouseToggle("down");
                    robot.dragMouse(startPos.x + a, startPos.y);
                    robot.dragMouse(startPos.x + a, startPos.y + b);
                    robot.dragMouse(startPos.x, startPos.y + b);
                    robot.dragMouse(startPos.x, startPos.y);
                    robot.mouseToggle("up");
                    break;
                }
                case "draw_square":{
                    const startPos = robot.getMousePos();
                    const a = parseInt(incomingMessage.split(' ')[1]);
                    robot.mouseToggle("down");
                    robot.dragMouse(startPos.x + a, startPos.y);
                    robot.dragMouse(startPos.x + a, startPos.y + a);
                    robot.dragMouse(startPos.x, startPos.y + a);
                    robot.dragMouse(startPos.x, startPos.y);
                    robot.mouseToggle("up");
                    break;
                }
                case "prnt_scrn":
                    const startPos = robot.getMousePos();
                    if(startPos.x > 100 && startPos.y > 100 &&
                        startPos.x < robot.getScreenSize().width - 100 &&
                        startPos.y < robot.getScreenSize().height - 100){

                    startPos.x = startPos.x + 100;
                    startPos.y = startPos.y;
                        }
                    const bitmap = robot.screen.capture(startPos.x, startPos.y, 200, 200);
                    new jimp({ data: bitmap.image, width: 200, height: 200 }, (error: any, image_: any) => {
                        if(error) throw new Error(error);
                        image_.getBase64(jimp.AUTO, (err:any, data_: any) => {
                            if(err) throw new Error(err);
                            ws.send(`prnt_scrn ${data_.slice(22)}`);
                        });
                      });
                    break;
            }
        });
        ws.on('close', () => {
            console.log('Closed');
            ws.close();
        })
    })
}

main();