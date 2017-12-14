"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const MessageFlags_1 = require("../../enums/MessageFlags");
class AgentThrottlePacket {
    constructor() {
        this.name = 'AgentThrottle';
        this.flags = MessageFlags_1.MessageFlags.Zerocoded | MessageFlags_1.MessageFlags.FrequencyLow;
        this.id = 4294901841;
    }
    getSize() {
        return (this.Throttle['Throttles'].length + 1) + 40;
    }
    writeToBuffer(buf, pos) {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt32LE(this.AgentData['CircuitCode'], pos);
        pos += 4;
        buf.writeUInt32LE(this.Throttle['GenCounter'], pos);
        pos += 4;
        buf.write(this.Throttle['Throttles'], pos);
        pos += this.Throttle['Throttles'].length;
        return pos - startPos;
    }
    readFromBuffer(buf, pos) {
        const startPos = pos;
        const newObjAgentData = {
            AgentID: UUID_1.UUID.zero(),
            SessionID: UUID_1.UUID.zero(),
            CircuitCode: 0
        };
        newObjAgentData['AgentID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        newObjAgentData['SessionID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        newObjAgentData['CircuitCode'] = buf.readUInt32LE(pos);
        pos += 4;
        this.AgentData = newObjAgentData;
        const newObjThrottle = {
            GenCounter: 0,
            Throttles: ''
        };
        newObjThrottle['GenCounter'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjThrottle['Throttles'] = buf.toString('utf8', pos, length);
        pos += length;
        this.Throttle = newObjThrottle;
        return pos - startPos;
    }
}
exports.AgentThrottlePacket = AgentThrottlePacket;
//# sourceMappingURL=AgentThrottle.js.map