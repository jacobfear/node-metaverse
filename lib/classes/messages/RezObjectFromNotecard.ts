// This file has been automatically generated by writeMessageClasses.js

import { UUID } from '../UUID';
import { Vector3 } from '../Vector3';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class RezObjectFromNotecardMessage implements MessageBase
{
    name = 'RezObjectFromNotecard';
    messageFlags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.RezObjectFromNotecard;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
        GroupID: UUID;
    };
    RezData: {
        FromTaskID: UUID;
        BypassRaycast: number;
        RayStart: Vector3;
        RayEnd: Vector3;
        RayTargetID: UUID;
        RayEndIsIntersection: boolean;
        RezSelected: boolean;
        RemoveItem: boolean;
        ItemFlags: number;
        GroupMask: number;
        EveryoneMask: number;
        NextOwnerMask: number;
    };
    NotecardData: {
        NotecardItemID: UUID;
        ObjectID: UUID;
    };
    InventoryData: {
        ItemID: UUID;
    }[];

    getSize(): number
    {
        return ((16) * this.InventoryData.length) + 157;
    }

    // @ts-ignore
    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['GroupID'].writeToBuffer(buf, pos);
        pos += 16;
        this.RezData['FromTaskID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.RezData['BypassRaycast'], pos++);
        this.RezData['RayStart'].writeToBuffer(buf, pos, false);
        pos += 12;
        this.RezData['RayEnd'].writeToBuffer(buf, pos, false);
        pos += 12;
        this.RezData['RayTargetID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8((this.RezData['RayEndIsIntersection']) ? 1 : 0, pos++);
        buf.writeUInt8((this.RezData['RezSelected']) ? 1 : 0, pos++);
        buf.writeUInt8((this.RezData['RemoveItem']) ? 1 : 0, pos++);
        buf.writeUInt32LE(this.RezData['ItemFlags'], pos);
        pos += 4;
        buf.writeUInt32LE(this.RezData['GroupMask'], pos);
        pos += 4;
        buf.writeUInt32LE(this.RezData['EveryoneMask'], pos);
        pos += 4;
        buf.writeUInt32LE(this.RezData['NextOwnerMask'], pos);
        pos += 4;
        this.NotecardData['NotecardItemID'].writeToBuffer(buf, pos);
        pos += 16;
        this.NotecardData['ObjectID'].writeToBuffer(buf, pos);
        pos += 16;
        const count = this.InventoryData.length;
        buf.writeUInt8(this.InventoryData.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.InventoryData[i]['ItemID'].writeToBuffer(buf, pos);
            pos += 16;
        }
        return pos - startPos;
    }

    // @ts-ignore
    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        const newObjAgentData: {
            AgentID: UUID,
            SessionID: UUID,
            GroupID: UUID
        } = {
            AgentID: UUID.zero(),
            SessionID: UUID.zero(),
            GroupID: UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['SessionID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['GroupID'] = new UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const newObjRezData: {
            FromTaskID: UUID,
            BypassRaycast: number,
            RayStart: Vector3,
            RayEnd: Vector3,
            RayTargetID: UUID,
            RayEndIsIntersection: boolean,
            RezSelected: boolean,
            RemoveItem: boolean,
            ItemFlags: number,
            GroupMask: number,
            EveryoneMask: number,
            NextOwnerMask: number
        } = {
            FromTaskID: UUID.zero(),
            BypassRaycast: 0,
            RayStart: Vector3.getZero(),
            RayEnd: Vector3.getZero(),
            RayTargetID: UUID.zero(),
            RayEndIsIntersection: false,
            RezSelected: false,
            RemoveItem: false,
            ItemFlags: 0,
            GroupMask: 0,
            EveryoneMask: 0,
            NextOwnerMask: 0
        };
        newObjRezData['FromTaskID'] = new UUID(buf, pos);
        pos += 16;
        newObjRezData['BypassRaycast'] = buf.readUInt8(pos++);
        newObjRezData['RayStart'] = new Vector3(buf, pos, false);
        pos += 12;
        newObjRezData['RayEnd'] = new Vector3(buf, pos, false);
        pos += 12;
        newObjRezData['RayTargetID'] = new UUID(buf, pos);
        pos += 16;
        newObjRezData['RayEndIsIntersection'] = (buf.readUInt8(pos++) === 1);
        newObjRezData['RezSelected'] = (buf.readUInt8(pos++) === 1);
        newObjRezData['RemoveItem'] = (buf.readUInt8(pos++) === 1);
        newObjRezData['ItemFlags'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjRezData['GroupMask'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjRezData['EveryoneMask'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjRezData['NextOwnerMask'] = buf.readUInt32LE(pos);
        pos += 4;
        this.RezData = newObjRezData;
        const newObjNotecardData: {
            NotecardItemID: UUID,
            ObjectID: UUID
        } = {
            NotecardItemID: UUID.zero(),
            ObjectID: UUID.zero()
        };
        newObjNotecardData['NotecardItemID'] = new UUID(buf, pos);
        pos += 16;
        newObjNotecardData['ObjectID'] = new UUID(buf, pos);
        pos += 16;
        this.NotecardData = newObjNotecardData;
        if (pos >= buf.length)
        {
            return pos - startPos;
        }
        const count = buf.readUInt8(pos++);
        this.InventoryData = [];
        for (let i = 0; i < count; i++)
        {
            const newObjInventoryData: {
                ItemID: UUID
            } = {
                ItemID: UUID.zero()
            };
            newObjInventoryData['ItemID'] = new UUID(buf, pos);
            pos += 16;
            this.InventoryData.push(newObjInventoryData);
        }
        return pos - startPos;
    }
}

