import robot from "robotjs"
import jimp from "jimp"
import ws from "ws";

export const prnt_scrn = (socket: ws.WebSocket) => {
    process.stdout.write(`prnt_scrn\0`);
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
            socket.send(`prnt_scrn ${data_.slice(22)}`);
            process.stdout.write(`prnt_scrn ${data_.slice(22)}\0`);
        });
      });
}