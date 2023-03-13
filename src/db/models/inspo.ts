import { STRING, INTEGER, Model, Sequelize, UUID, UUIDV4, DataTypes } from "sequelize";

class Inspo extends Model {

    id!: number
    url!: string

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
