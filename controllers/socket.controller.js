import { response } from 'express';
import { readFileSync, writeFileSync } from 'fs';

export default class SocketController {
    static async onConnection(socketHandler, incomingMessage) {
        console.log("Incoming Request for ID: " + incomingMessage + " from " + socketHandler.id);
        socketHandler.join(incomingMessage);
        const existingData = JSON.parse(readFileSync(`./data/${incomingMessage}.json`, (err, data) => {return data;}));
        socketHandler.emit('info', 'connection established sucessfully')
        socketHandler.emit('relay', existingData);
    }

    static async onRelay(socketHandler, incomingMessage, roomID) {
        console.log(JSON.stringify(incomingMessage));
        const formData = JSON.parse(JSON.stringify(incomingMessage));
        const formID = formData.formid;
        delete formData.formid;

        const formDataKeys = Object.keys(formData)
        
        var infodata = JSON.parse(readFileSync('./data/info.json', (err, data) => {return data;}));
        console.log(infodata, formID, formDataKeys);
        
        var formDatabase = {};
        console.log()
        if (infodata.available.includes(formID)) {
            formDatabase = JSON.parse(readFileSync(`./data/${formID}.json`, (err, data) => {return data;}));
          for (var iterable = 0; iterable < formDataKeys.length; iterable++){
          
            // console.log(iterable, formDatabase[`question${iterable}`])
            formDatabase[`question${iterable}`]["choices"][formData[formDataKeys[iterable]]] += 1
          }
        }
        writeFileSync(`./data/${formID}.json`, JSON.stringify(formDatabase))
        socketHandler.to(roomID).emit('relay', formDatabase);
    }
    
}
