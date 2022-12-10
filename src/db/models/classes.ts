import { STRING, INTEGER, Model, Sequelize, UUID, UUIDV4 } from "sequelize";

class Classes extends Model {

    id!: number
    name!: string
    source_id!: number

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
                source_id: {
                    type: UUID
                },



            },
            {
                sequelize,
                timestamps: true,
                modelName: "Classes",
            }
        );
    }
}

export default Classes;
