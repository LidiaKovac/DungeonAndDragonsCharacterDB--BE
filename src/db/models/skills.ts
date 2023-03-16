import { ENUM } from "sequelize"
import {
    STRING,
    INTEGER,
    Model,
    Sequelize,
    UUID,
    UUIDV4,
    DataTypes,
} from "sequelize"

class Skill extends Model {
    id!: number
    name!: string
    ab!: "str" | "dex" | "con" | "wis" | "int" | "cha"

    static initialize(sequelize: Sequelize) {
        this.init(
            {
                id: {
                    primaryKey: true,
                    type: UUID,
                    defaultValue: UUIDV4,
                },

                name: {
                    type: STRING(100),
                    allowNull: false,
                },

                ab: {
                    type: STRING(3),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                modelName: "Skill",
            }
        )
    }
}

export default Skill
