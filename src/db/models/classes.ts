import { STRING, INTEGER, Model, Sequelize, UUID, UUIDV4 } from "sequelize";

class Classes extends Model {
    [key: string]: string | number | Function | any //any added to support under-the-hood sequelize props

    id!: number
    name!: string
    parent_class!: string
    source_name!: string
    hit_die!: number
    prof_1!: string
    prof_2!: string
    prof_3!: string
    prof_4!: string
    spellProgression!: string
    spellAbility!: string
    armorProf!: string
    weaponProf!: string
    toolsProf!: string
    skillProfNum!: number
    skillProf!: string | string[]
    startEquip!: string

    static initialize(sequelize: Sequelize) {
        this.init(
            {
                id: {
                    primaryKey: true,
                    type: UUID,
                    defaultValue: UUIDV4
                },
                type: {
                    type: STRING(100),
                    defaultValue: "class",
                    allowNull: false
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
                    type: STRING
                },
                armorProf: {
                    type: STRING(1000)
                },
                weaponProf: {
                    type: STRING(1000)
                },
                toolsProf: {
                    type: STRING(1000)
                },
                skillProfNum: { 
                    type: INTEGER 
                },
                skillProf: {
                    type: STRING(1000)
                },
                startEquip: {
                    type: STRING(1000)
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
