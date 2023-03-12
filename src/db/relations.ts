import Character from "./models/character"
import Classes from "./models/classes"
import ClassTrait from "./models/class_feat"
import Feats from "./models/feats"
import Race from "./models/races"
import RacialTrait from "./models/racial_feat"
import Source from "./models/sources"
import User from "./models/user"

export const initRelations = () => {
    Character.belongsTo(Classes)
    Classes.hasMany(Character)
    
    Character.belongsTo(Race)
    Race.hasMany(Character)

    Character.belongsTo(User)
    User.hasMany(Character)

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

    Feats.belongsToMany(Classes, {through: 'Class_Feat_Prereqs'})
    Classes.hasMany(Feats)

    Feats.belongsToMany(Race, {through: 'Race_Feat_Prereqs'})
    Race.hasMany(Feats)
}