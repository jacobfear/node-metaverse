"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const MessageFlags_1 = require("../../enums/MessageFlags");
class CopyInventoryItemPacket {
    constructor() {
        this.name = 'CopyInventoryItem';
        this.flags = MessageFlags_1.MessageFlags.Zerocoded | MessageFlags_1.MessageFlags.FrequencyLow;
        this.id = 4294902029;
    }
    getSize() {
        return ((this.calculateVarVarSize(this.InventoryData, 'NewName', 1) + 52) * this.InventoryData.length) + 33;
    }
    calculateVarVarSize(block, paramName, extraPerVar) {
        let size = 0;
        block.forEach((bl) => {
            size += bl[paramName].length + extraPerVar;
        });
        return size;
    }
    writeToBuffer(buf, pos) {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        const count = this.InventoryData.length;
        buf.writeUInt8(this.InventoryData.length, pos++);
        for (let i = 0; i < count; i++) {
            buf.writeUInt32LE(this.InventoryData[i]['CallbackID'], pos);
            pos += 4;
            this.InventoryData[i]['OldAgentID'].writeToBuffer(buf, pos);
            pos += 16;
            this.InventoryData[i]['OldItemID'].writeToBuffer(buf, pos);
            pos += 16;
            this.InventoryData[i]['NewFolderID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.write(this.InventoryData[i]['NewName'], pos);
            pos += this.InventoryData[i]['NewName'].length;
        }
        return pos - startPos;
    }
    readFromBuffer(buf, pos) {
        const startPos = pos;
        const newObjAgentData = {
            AgentID: UUID_1.UUID.zero(),
            SessionID: UUID_1.UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        newObjAgentData['SessionID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const count = buf.readUInt8(pos++);
        this.InventoryData = [];
        for (let i = 0; i < count; i++) {
            const newObjInventoryData = {
                CallbackID: 0,
                OldAgentID: UUID_1.UUID.zero(),
                OldItemID: UUID_1.UUID.zero(),
                NewFolderID: UUID_1.UUID.zero(),
                NewName: ''
            };
            newObjInventoryData['CallbackID'] = buf.readUInt32LE(pos);
            pos += 4;
            newObjInventoryData['OldAgentID'] = new UUID_1.UUID(buf, pos);
            pos += 16;
            newObjInventoryData['OldItemID'] = new UUID_1.UUID(buf, pos);
            pos += 16;
            newObjInventoryData['NewFolderID'] = new UUID_1.UUID(buf, pos);
            pos += 16;
            newObjInventoryData['NewName'] = buf.toString('utf8', pos, length);
            pos += length;
            this.InventoryData.push(newObjInventoryData);
        }
        return pos - startPos;
    }
}
exports.CopyInventoryItemPacket = CopyInventoryItemPacket;
//# sourceMappingURL=CopyInventoryItem.js.map