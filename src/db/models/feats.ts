import { STRING, INTEGER, Model, Sequelize, UUID, UUIDV4, DataTypes } from "sequelize";

class Feats extends Model {

    id!: number
    name!: string
    class_name!: string
    source_name!: string

    str!: number
    int!: number
    cos!: number
    cha!: number
    dex!: number
    wis!: number
    abilityChooseAmount!: number
    prerequisiteLevel_Class!: string
    prerequisiteBg!: string
    prerequisiteFeat!: string
    prerequisiteProf!: string
    prerequisiteOther!: string
    prerequisiteRace!: string
    prerequisitePsionic!: string
    prerequisiteAbility!: string
    toolProficiencies!: string
    langProficiencies!: string
    features!: string
    // i purposely left spells out

    static initialize(sequelize: Sequelize) {
        this.init(
            {
                id: {
                    primaryKey: true,
                    type: UUID,
                    defaultValue: UUIDV4
                },
                name: {
                    type: STRING(2000)
                },
                class_name: {
                    type: STRING(2000)
                },
                source_name: {
                    type: STRING(2000)
                },
                str: {
                    type: INTEGER
                },
                int: {
                    type: INTEGER
                },
                cos: {
                    type: INTEGER
                },
                cha: {
                    type: INTEGER
                },
                dex: {
                    type: INTEGER
                },
                wis: {
                    type: INTEGER
                },
                abilityChooseAmount: {
                    type: INTEGER
                },
                prerequisiteLevel_Class: {
                    type: STRING(2000)
                },
                prerequisiteBg: {
                    type: STRING(2000)
                },
                prerequisiteFeat: {
                    type: STRING(2000)
                },
                prerequisiteProf: {
                    type: STRING(2000)
                },
                prerequisiteOther: {
                    type: STRING(2000)
                },
                prerequisiteRace: {
                    type: STRING(2000)
                },
                prerequisitePsionic: {
                    type: STRING(2000)
                },
                prerequisiteAbility: {
                    type: STRING(2000)
                },
                toolProficiencies: {
                    type: STRING(2000)
                },
                langProficiencies: {
                    type: STRING(2000)
                },
                features: {
                    type: STRING(2000)
                },

            },
            {
                sequelize,
                timestamps: true,
                modelName: "Feats",
            }
        );
    }
}

export default Feats;
