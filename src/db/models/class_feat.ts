import { STRING, INTEGER, Model, Sequelize, UUID, UUIDV4, DataTypes } from "sequelize";

class ClassTrait extends Model {

    id!: number
    name!: string
    class_name!: string
    level!: string
    source_name!: string


    static initialize(sequelize: Sequelize) {
        this.init(
            {
                id: {
                    primaryKey: true,
                    type: UUID,
                    defaultValue: UUIDV4
                },
                name: {
                    type: STRING(100)
                },
                class_name_origin: {
                    type: STRING(100)
                },
                source_name: {
                    type: STRING(100)
                },
                level: {
                    type: INTEGER
                }
            },
            {
                sequelize,
                timestamps: true,
                modelName: "ClassTrait",
            }
        );
    }
}

export default ClassTrait;
