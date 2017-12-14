// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class DirPopularReplyMessage implements MessageBase
{
    name = 'DirPopularReply';
    messageFlags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.Deprecated | MessageFlags.FrequencyLow;
    id = Message.DirPopularReply;

    AgentData: {
        AgentID: UUID;
    };
    QueryData: {
        QueryID: UUID;
    };
    QueryReplies: {
        ParcelID: UUID;
        Name: Buffer;
        Dwell: number;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.QueryReplies, 'Name', 1) + 20) * this.QueryReplies.length) + 33;
    }

    calculateVarVarSize(block: object[], paramName: string, extraPerVar: number): number
    {
        let size = 0;
        block.forEach((bl: any) =>
        {
            size += bl[paramName].length + extraPerVar;
        });
        return size;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.QueryData['QueryID'].writeToBuffer(buf, pos);
        pos += 16;
        const count = this.QueryReplies.length;
        buf.writeUInt8(this.QueryReplies.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.QueryReplies[i]['ParcelID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeUInt8(this.QueryReplies[i]['Name'].length, pos++);
            this.QueryReplies[i]['Name'].copy(buf, pos);
            pos += this.QueryReplies[i]['Name'].length;
            buf.writeFloatLE(this.QueryReplies[i]['Dwell'], pos);
            pos += 4;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData: {
            AgentID: UUID
        } = {
            AgentID: UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const newObjQueryData: {
            QueryID: UUID
        } = {
            QueryID: UUID.zero()
        };
        newObjQueryData['QueryID'] = new UUID(buf, pos);
        pos += 16;
        this.QueryData = newObjQueryData;
        const count = buf.readUInt8(pos++);
        this.QueryReplies = [];
        for (let i = 0; i < count; i++)
        {
            const newObjQueryReplies: {
                ParcelID: UUID,
                Name: Buffer,
                Dwell: number
            } = {
                ParcelID: UUID.zero(),
                Name: Buffer.allocUnsafe(0),
                Dwell: 0
            };
            newObjQueryReplies['ParcelID'] = new UUID(buf, pos);
            pos += 16;
            varLength = buf.readUInt8(pos++);
            newObjQueryReplies['Name'] = buf.slice(pos, pos + varLength);
            pos += varLength;
            newObjQueryReplies['Dwell'] = buf.readFloatLE(pos);
            pos += 4;
            this.QueryReplies.push(newObjQueryReplies);
        }
        return pos - startPos;
    }
}
