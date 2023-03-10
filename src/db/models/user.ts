import { ENUM, EnumDataType, EnumDataTypeOptions } from "sequelize";
import { STRING, INTEGER, Model, Sequelize, UUID, UUIDV4 } from "sequelize";

class User extends Model {

    id!: number
    full_name!: string
    nickname!: string
    password!: string
    email!: string


    static initialize(sequelize: Sequelize) {
        this.init(
            {
                id: {
                    primaryKey: true,
                    type: UUID,
                    defaultValue: UUIDV4
                },
                full_name: {
                    type: STRING(100),
                    allowNull: false,
                },
                nickname: {
                    type: STRING(100),
                    allowNull: false,
                },
                password: {
                    type: STRING(100),
                    allowNull: false,
                },
                
                role: {
                    type: STRING(1000),
                    allowNull: true,
                    defaultValue: "regular"
                },
                email: {
                    type: STRING(100),
                    allowNull: false,
                    unique: true
                }
            },
            {
                sequelize,
                timestamps: true,
                modelName: "User",
            }
        );
    }
}

export default User;
