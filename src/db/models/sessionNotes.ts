import { STRING, INTEGER, Model, Sequelize, UUID, UUIDV4 } from "sequelize";
import Skill from "./skills";

class SessionNotes extends Model {
    [key: string]: string | number | any //any added to support under-the-hood sequelize props

    id!: number
    title!: string
    content!: string

    static initialize(sequelize: Sequelize) {
        this.init(
            {
                id: {
                    primaryKey: true,
                    type: UUID,
                    defaultValue: UUIDV4
                },
                title: {
                    type: STRING(200)
                },
                content: {
                    type: STRING(10000)
                }
            },
            {
                sequelize,
                timestamps: true,
                modelName: "SessionNotes",
            }
        );
    }
}

export default SessionNotes;
