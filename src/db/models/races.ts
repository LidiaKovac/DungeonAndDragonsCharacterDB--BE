import { STRING, INTEGER, Model, Sequelize, UUID, UUIDV4, DataTypes } from "sequelize";

class Race extends Model {

    id!: number
    name!: string
    source_id!: string
    source_name!: string
    str!: number;
    con!: number;
    dex!: number;
    int!: number;
    cha!: number;
    wis!: number;
    speed!: number;
    type!: "race" | "subrace"


    static initialize(sequelize: Sequelize) {
        this.init(
            {
                id: {
                    primaryKey: true,
                    type: UUID,
                    defaultValue: UUIDV4
                },
                type: {
                    type: STRING(50)
                },
                name: {
                    type: STRING(100),
                    allowNull: false,
                },
                speed: {
                    type: INTEGER
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
                source_name: {
                    type: STRING(100)
                },
                SourceId: {
                    type: UUID
                }

            },
            {
                sequelize,
                timestamps: true,
                modelName: "Race",
            }
        );
    }
}

export default Race;
