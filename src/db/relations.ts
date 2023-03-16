import Character from "./models/character"
import Classes from "./models/classes"
import ClassTrait from "./models/class_feat"
import Feats from "./models/feats"
import Inspo from "./models/inspo"
import Race from "./models/races"
import RacialTrait from "./models/racial_feat"
import SessionNotes from "./models/sessionNotes"
import Skill from "./models/skills"
import Source from "./models/sources"
import User from "./models/user"

export const initRelations = () => {
    //all character relations

    //one char has one class, each class can be usaed by many chars
    Character.belongsTo(Classes)
    Classes.hasMany(Character)

    //one char has one race, each race can be used by multiple chars
    Character.belongsTo(Race)
    Race.hasMany(Character)

    //each char has one owner, each user can have many chars 
    Character.belongsTo(User)
    User.hasMany(Character)

    //each char can have many pics, but each pic can only be added to one char
    Character.hasMany(Inspo)
    Inspo.belongsTo(Character)

    Character.hasMany(Skill)
    Skill.belongsToMany(Character, { through: "CharSkill", as: "profSkills" })

    //each class belongs has one source, but sources can have many classes
    Classes.belongsTo(Source)
    Source.hasMany(Classes)

    Race.belongsTo(Source)
    Source.hasMany(Race)

    RacialTrait.belongsTo(Race)
    RacialTrait.belongsTo(Source)
    Source.hasMany(RacialTrait)
    Race.hasMany(RacialTrait)

    Classes.hasMany(ClassTrait)
    ClassTrait.belongsTo(Classes)
    ClassTrait.belongsTo(Source)
    Source.hasMany(ClassTrait)

    Feats.belongsTo(Source)
    Source.hasMany(Feats)

    Feats.belongsToMany(Classes, { through: 'Class_Feat_Prereqs' })
    Classes.hasMany(Feats)

    Feats.belongsToMany(Race, { through: 'Race_Feat_Prereqs' })
    Race.hasMany(Feats)

    SessionNotes.belongsTo(User)
    User.hasMany(SessionNotes)

    SessionNotes.belongsTo(Character)
    Character.hasMany(SessionNotes)
}