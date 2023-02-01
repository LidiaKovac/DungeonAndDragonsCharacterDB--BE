import Character from "./models/character"
import Classes from "./models/classes"
import ClassTrait from "./models/class_feat"
import Feats from "./models/feats"
import Race from "./models/races"
import RacialTrait from "./models/racial_feat"
import Source from "./models/sources"
import User from "./models/user"

export const initRelations = () => {
    Character.hasMany(Classes, {foreignKey: "class_id"}) //each character can have many classes (looking at you, multi classing)
    Classes.belongsToMany(Character, {through: "Chars_Class", foreignKey: "class_id"}) //each class can be assigned to multiple chars
    
    Character.hasOne(Race, {foreignKey: "race_id"})
    Race.belongsToMany(Character, {through: "Chars_Race_2", foreignKey: "race_id"})

    Character.hasOne(User)
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

// Material.belongsTo(User)
// User.hasMany(Material)

// EventM.belongsTo(User)
// User.hasMany(EventM)

// EventM.belongsTo(Class, {targetKey: "class_id"})
// Class.hasMany(EventM)

// Class.belongsToMany(User, {through: "Students_Classes"})
// User.belongsToMany(Class, {through: "Students_Classes"})

// Homework.belongsTo(EventM)
// EventM.hasMany(Homework)

// Class.hasMany(Section)
// Section.belongsTo(Class)

// Todo.belongsTo(User)
// User.hasMany(Todo)
}