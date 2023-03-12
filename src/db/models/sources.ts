import { STRING, Model, Sequelize, UUID, UUIDV4 } from "sequelize";

class Source extends Model {

    id!: string
    name!: string
    shorthand!: string
    sourceId!: string

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
                shorthand: {
                    type: STRING(100),
                    allowNull: false,
                    unique: true
                }




            },
            {
                sequelize,
                timestamps: true,
                modelName: "Source",
            }
        );
    }
}

export default Source;
