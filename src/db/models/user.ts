import { STRING, INTEGER, Model, Sequelize, UUID, UUIDV4 } from "sequelize";

class User extends Model {

    id!: number
    full_name!: string
    nickname!: string
    password!: string
    access_token!: string


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
                access_token: {
                    type: STRING(100),
                    allowNull: false,
                },



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
