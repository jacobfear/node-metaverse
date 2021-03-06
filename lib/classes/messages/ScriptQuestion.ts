// This file has been automatically generated by writeMessageClasses.js

import { UUID } from '../UUID';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class ScriptQuestionMessage implements MessageBase
{
    name = 'ScriptQuestion';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.ScriptQuestion;

    Data: {
        TaskID: UUID;
        ItemID: UUID;
        ObjectName: Buffer;
        ObjectOwner: Buffer;
        Questions: number;
    };
    Experience: {
        ExperienceID: UUID;
    };

    getSize(): number
    {
        return (this.Data['ObjectName'].length + 1 + this.Data['ObjectOwner'].length + 1) + 52;
    }

    // @ts-ignore
    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.Data['TaskID'].writeToBuffer(buf, pos);
        pos += 16;
        this.Data['ItemID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.Data['ObjectName'].length, pos++);
        this.Data['ObjectName'].copy(buf, pos);
        pos += this.Data['ObjectName'].length;
        buf.writeUInt8(this.Data['ObjectOwner'].length, pos++);
        this.Data['ObjectOwner'].copy(buf, pos);
        pos += this.Data['ObjectOwner'].length;
        buf.writeInt32LE(this.Data['Questions'], pos);
        pos += 4;
        this.Experience['ExperienceID'].writeToBuffer(buf, pos);
        pos += 16;
        return pos - startPos;
    }

    // @ts-ignore
    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjData: {
            TaskID: UUID,
            ItemID: UUID,
            ObjectName: Buffer,
            ObjectOwner: Buffer,
            Questions: number
        } = {
            TaskID: UUID.zero(),
            ItemID: UUID.zero(),
            ObjectName: Buffer.allocUnsafe(0),
            ObjectOwner: Buffer.allocUnsafe(0),
            Questions: 0
        };
        newObjData['TaskID'] = new UUID(buf, pos);
        pos += 16;
        newObjData['ItemID'] = new UUID(buf, pos);
        pos += 16;
        varLength = buf.readUInt8(pos++);
        newObjData['ObjectName'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        varLength = buf.readUInt8(pos++);
        newObjData['ObjectOwner'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        newObjData['Questions'] = buf.readInt32LE(pos);
        pos += 4;
        this.Data = newObjData;
        const newObjExperience: {
            ExperienceID: UUID
        } = {
            ExperienceID: UUID.zero()
        };
        newObjExperience['ExperienceID'] = new UUID(buf, pos);
        pos += 16;
        this.Experience = newObjExperience;
        return pos - startPos;
    }
}

