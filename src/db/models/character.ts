import { ARRAY } from "sequelize";
import { JSON } from "sequelize";
import { STRING, INTEGER, Model, Sequelize, UUID, UUIDV4 } from "sequelize";
import Race from "./races";

class Character extends Model {

    id!: number;
    name!: string;
    race_id!: string;
    class_id!: string;
    // owner_id!: string;
    str!: number;
    cos!: number;
    dex!: number;
    int!: number;
    cha!: number;
    wis!: number;
    ab_prof_1!: number
    ab_prof_2!: number
    ab_prof_3!: number
    ab_prof_4!: number
    hit_points!: number
    level!: number

    created!: Date;
    updated!: Date;

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
                race_id: {
                    type: UUID
                },
                class_id: {
                    type: UUID
                },
                race: {
                    type: JSON
                },
                classes: {
                    type: ARRAY(JSON)
                },
                // owner_id: {
                //     type: UUID
                // },
                str: {
                    type: INTEGER
                },
                int: {
                    type: INTEGER
                },
                cos: {
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
                ab_prof_1: {
                    type: STRING(100)
                },
                ab_prof_2: {
                    type: STRING(100)
                },
                ab_prof_3: {
                    type: STRING(100)
                },
                ab_prof_4: {
                    type: STRING(100)
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
