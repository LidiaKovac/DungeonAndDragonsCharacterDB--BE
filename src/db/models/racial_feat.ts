import { STRING, INTEGER, Model, Sequelize, UUID, UUIDV4, DataTypes } from "sequelize";

class RacialTrait extends Model {

    id!: number
    name!: string
    RaceId!: string
    text!: string
    SourceId!: string
    source_name!: string
    race_name!: string


    static initialize(sequelize: Sequelize) {
        this.init(
            {
                id: {
                    primaryKey: true,
                    type: UUID,
                    defaultValue: UUIDV4
                },
                RaceId: {
                    type: UUID
                },
                race_name: {
                    type: STRING(100)
                },
                name: {
                    type: STRING(100),
                    allowNull: false,
                },

                source_name: {
                    type: STRING(100)
                },
                SourceId: {
                    type: UUID
                },
                text: {
                    type: STRING(1000)
                }

            },
            {
                sequelize,
                timestamps: true,
                modelName: "RacialTrait",
            }
        );
    }
}

export default RacialTrait;
