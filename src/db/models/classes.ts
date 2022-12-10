import { STRING, INTEGER, Model, Sequelize, UUID, UUIDV4 } from "sequelize";

class Classes extends Model {

    id!: number
    name!: string
    
    source_name!: string
    hit_die!: number
    prof_1!: string
    prof_2!: string
    prof_3!: string
    prof_4!: string
    spellProgression!: string
    spellAbility!: string

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
                
                source_name: {
                    type: STRING(100)
                },
                hit_die: {
                    type: INTEGER
                },
                prof_1: {
                    type: STRING(3)
                },
                prof_2: {
                    type: STRING(3)
                }, 
                prof_3: {
                    type: STRING(3)
                }, 
                prof_4: {
                    type: STRING(3)
                },
                spellProgression: {
                    type: STRING(1000)
                },
                spellAbility: {
                    type: STRING(3)
                }


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
