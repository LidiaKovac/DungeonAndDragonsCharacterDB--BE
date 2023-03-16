import { ARRAY } from "sequelize";
import { JSON } from "sequelize";
import { STRING, INTEGER, Model, Sequelize, UUID, UUIDV4 } from "sequelize";
import Classes from "./classes";
import Race from "./races";
import RacialTrait from "./racial_feat";
interface Char {
    
}

class Character extends Model {
    [key: string]: string | number | Function | any //any added to support under-the-hood sequelize props
    id!: number;
    name!: string;

    str!: number;
    con!: number;
    dex!: number;
    int!: number;
    cha!: number;
    wis!: number;
    initiativeMod!: number;
    currentInitiative!: number;
    hit_points!: number
    level!: number
    addClass!: Function //this function will be created by Sequelize, we need to add it here so that TS will recognize it
    Class!: Classes
    Race!: RacialTrait
    description!: string 
    deathScore!: number
    createdAt!: Date;
    updatedAt!: Date;

    static initialize(sequelize: Sequelize) {
        this.init(
            {
                id: {
                    primaryKey: true,
                    type: UUID,
                    defaultValue: UUIDV4
                },
                name: {
                    type: STRING(100),
                    allowNull: false,
                },
                
                str: {
                    type: INTEGER
                },
                int: {
                    type: INTEGER
                },
                con: {
                    type: INTEGER
                },
                dex: {
                    type: INTEGER
                },
                cha: {
                    type: INTEGER
                },
                wis: {
                    type: INTEGER
                },
                initiativeMod: {
                    type: INTEGER
                }, 
                currentInitiative: {
                    type: INTEGER
                },
                deathScore: {
                    type: INTEGER
                },
                description: {
                    type: STRING(5000)
                },
                hit_points: {
                    type: INTEGER
                },
                level: {
                    type: INTEGER,
                    allowNull: false,
                    defaultValue: 1
                }

            },
            {
                sequelize,
                timestamps: true,
                modelName: "Char",
            }
        );
    }
}

export default Character;
