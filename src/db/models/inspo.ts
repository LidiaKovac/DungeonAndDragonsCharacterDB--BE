import { STRING, INTEGER, Model, Sequelize, UUID, UUIDV4, DataTypes } from "sequelize";

class Inspo extends Model {

    id!: number
    url!: string
    x!: number
    y!: number

    static initialize(sequelize: Sequelize) {
        this.init(
            {
                id: {
                    primaryKey: true,
                    type: UUID,
                    defaultValue: UUIDV4
                },
                url: {
                    type: STRING(1000)
                },
                CharId: {
                    type: UUID,
                },
                x: {
                    type: INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
                y: {
                    type: INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                }
            },
            {
                sequelize,
                timestamps: true,
                modelName: "Inspo",
            }
        );
    }
}

export default Inspo;
