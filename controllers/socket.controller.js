import { response } from 'express';
import pkg from 'jsonfile'
const { readFile, writeFile } = pkg

export default class SocketController {
    static async onConnection(socketHandler, incomingMessage) {
        console.log("Incoming Request for ID: " + incomingMessage + " from " + socketHandler.id);
        socketHandler.join(incomingMessage);
    }

    static async onLoad(source, heap){
        
    }
    static async onRelay(socketHandler, incomingMessage, roomID) {
        const formData = JSON.parse(incomingMessage);
        const formDataKeys = Object.keys(formData)
        const formID = formData.formid;
        delete formData.formid;
        const infodata = JSON.parse(readFile("./data/info.json"))
        var formDatabase = {};
        if (formID in infodata.available) {
            formDatabase = readFile(`./data/${formID}.json`)
        }
        for (var iterable = 0; iterable < formDataKeys.length; iterable++){
            formDatabase[`question${iterable}`]["choices"][formData[formDataKeys[i]]] += 1
        }

        
        socketHandler.to(roomID).emit('relay', incomingMessage);
    }
    
}