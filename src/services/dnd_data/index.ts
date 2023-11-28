//GENERAL
import { Router } from "express";
import { Op } from "sequelize";
const passive_data_router = Router()

import { Request, Response, NextFunction } from "express";
import Classes from "../../db/models/classes";
import ClassTrait from "../../db/models/class_feat";
import Race from "../../db/models/races";
import RacialTrait from "../../db/models/racial_feat";
import Source from "../../db/models/sources";
import Feats from "../../db/models/feats";
import Skill from "../../db/models/skills";


passive_data_router.get(
    "/sources",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const sources = await Source.findAll();


            if (sources.length > 0 && sources !== null) {
                res.status(200).send(sources);
            } else res.sendStatus(500)
        } catch (e) {
            next(e);
        }
    }
);


passive_data_router.post(
    "/skill",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const sources = await Skill.create(req.body);
            sources.save()
            res.send(sources)
        } catch (e) {
            next(e);
        }
    }
);


// SOURCE BY ID
passive_data_router.get(
    "/sources/:id",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const source = await Source.findOne({ where: { shorthand: req.params.id } });
            if (source !== null) res.send(source)
            else res.send(204)
        } catch (e) {
            next(e);
        }
    }
);

// CREATE SOURCES

passive_data_router.post(
    "/sources",

    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {


            const sources = await Source.create(req.body);
            res.send(sources);
        } catch (e) {
            console.log(e);

            next(e);
        }
    }
);

passive_data_router.post(
    "/source/bulk",

    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {

            for await (const el of req.body) {
                const sources = await Source.create(el);

            }
            res.sendStatus(201);
        } catch (e) {
            console.log(e);

            next(e);
        }
    }
);



passive_data_router.get(
    "/race",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const races = await Race.findAll({
                include: [{ model: RacialTrait }],
                order: [["name", "ASC"]]
            });


            if (races.length > 0) {
                res.status(200).send(races);
            } else res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
);

passive_data_router.get(
    "/race/:id",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const race = await Race.findOne({
                where: {
                    id: req.params.id
                },
                include: [{ model: RacialTrait }]
            });


            if (race !== null) {
                res.status(200).send(race);
            } else res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
);

passive_data_router.post(
    "/race/bulk",

    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            for (const race of req.body) {
                const source = await Source.findOne({
                    where: {
                        shorthand: race.source_name
                    }, plain: true
                })
                let newRace = await Race.create({ ...race, source_name: source!.shorthand });
                for (const entry of race.racialTraits) {


                    let newRaceTrait = await RacialTrait.create({
                        name: entry.name || "Note",
                        text: entry.entries?.join(",") || "",
                        source_name: newRace?.source_name,
                        race_name: newRace?.name,
                        RaceId: newRace?.id
                    })
                }
            }
            res.sendStatus(201);
        } catch (e) {
            console.log(e);

            next(e);
        }
    }
);


passive_data_router.post(
    "/race",

    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {

            const source = await Source.findOne({
                where: {
                    shorthand: req.body.source_name
                }, plain: true
            })

            const race = await Race.create({ ...req.body, source_name: source!.shorthand });
            res.send(race);
        } catch (e) {
            console.log(e);

            next(e);
        }
    }
);

passive_data_router.post(
    "/feat",

    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {

            const source = await Source.findOne({
                where: {
                    shorthand: req.body.source_name
                }, plain: true
            })
            if (source !== null) {
                const feat = await Feats.create({ ...req.body, SourceId: source!.id });
                res.send(feat);
            } else res.sendStatus(204)
        } catch (e) {
            console.log(e);

            next(e);
        }
    }
);

passive_data_router.get(
    "/feat",

    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {

            const feat = await Feats.findAll()
            res.send(feat)
        } catch (e) {
            console.log(e);

            next(e);
        }
    }
);

passive_data_router.delete(
    "/feat/all",

    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {

            const feat = await Feats.truncate()
            res.send(feat)
        } catch (e) {
            console.log(e);

            next(e);
        }
    }
);
// DOCS: 
/* 
    params: 
        attributes: proprieta' da includere, separate da virgola
        complete: true per includere i traits di classe
*/
passive_data_router.get("/class", async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { attributes, complete } = req.query as IQuery

        let classes = await Classes.findAll({
            where: {
                type: "class"
            },
            order: [["name", "ASC"]],
            include: complete === "true" ? [{ model: ClassTrait }] : [],
            attributes: attributes ? attributes.split(",").concat("prof_1", "prof_2", "prof_3", "prof_4") : undefined
        })
        res.send(classes)
    } catch (error) {
        next(error)
    }
})

passive_data_router.get("/class/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { attributes, complete } = req.query as IQuery

        let classes = await Classes.findOne({
            where: {
                id: req.params.id
            },
            order: [["name", "ASC"]],
            include: complete === "true" ? [{ model: ClassTrait }] : [],
            attributes: attributes!.split(",").concat("prof_1", "prof_2", "prof_3", "prof_4")
        })
        res.send(classes)
    } catch (error) {
        next(error)
    }
})

passive_data_router.post(
    "/class",

    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {

            const source = await Source.findOne({
                where: {
                    shorthand: req.body.source_name
                }, plain: true
            })


            if (source !== null) {
                const newClass = await Classes.create({ ...req.body, SourceId: source!.id });
                let allFeats = req.body.classFeatures.split(",")
                for (const feat of allFeats) {
                    let featSource = await Source.findOne({
                        where: {
                            shorthand: feat.split("|")[2] || req.body.source_name
                        }, plain: true
                    })


                    await ClassTrait.create({
                        name: feat.split(["|"])[0],
                        ClassId: newClass.id,
                        class_name_origin: newClass.name,
                        SourceId: featSource !== null ? featSource?.id : "",
                        source_name: featSource !== null ? featSource?.name || "no data" : "no data",
                        level: feat.split(["|"])[3]
                    })

                }


                res.send(newClass);
            } else res.sendStatus(204)
        } catch (e) {
            console.log(e);

            next(e);
        }
    }
);


passive_data_router.post(
    "/subclass",

    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {

            const source = await Source.findOne({
                where: {
                    shorthand: req.body.source_name
                }, plain: true
            })
            let classes = await Classes.findOne({
                where: {
                    name: req.body.class_name
                }, plain: true
            })

            if (classes === null) {
                classes = await Classes.findOne({
                    where: {
                        name: req.body.class_name.split(" ")[0]
                    }, plain: true
                })
            }

            if (source !== null && classes !== null) {
                const newClass = await Classes.create({ ...req.body, SourceId: source!.id, parent_class: classes!.id });
                let allFeats = req.body.classFeatures.split(",")
                for (const feat of allFeats) {
                    let featSource = await Source.findOne({
                        where: {
                            shorthand: feat.split("|")[2] || req.body.source_name
                        }, plain: true, logging: false
                    })


                    await ClassTrait.create({
                        name: feat.split(["|"])[0],
                        ClassId: newClass.id,
                        class_name_origin: newClass.name,
                        SourceId: featSource !== null ? featSource?.id : null,
                        source_name: featSource !== null ? featSource?.name || "no data" : "no data",
                        level: feat.split(["|"])[feat.split(["|"]).length - 1] === " " ? 0 : 0
                    }, { logging: false })

                }


                res.send(newClass);
            } else res.sendStatus(204)
        } catch (e) {
            console.log(e);

            next(e);
        }
    }
);



passive_data_router.get("/raceTrait", async (req: Request, res: Response, next: NextFunction) => {
    try {
        let traits = await RacialTrait.findAll()
        res.send(traits)
    } catch (error) {
        next(error)
    }
})

passive_data_router.delete("/raceTrait", async (req: Request, res: Response, next: NextFunction) => {
    try {
        let traits = await RacialTrait.destroy({
            where: {
                race_name: null
            }
        })
        res.send(traits)
    } catch (error) {
        next(error)
    }
})

passive_data_router.post(
    "/raceTrait",

    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {

            const source = await Source.findOne({
                where: {
                    shorthand: req.body.source_name
                }, plain: true
            })
            const foundRace = await Race.findByPk(req.body.RaceId)

            if (source === null && foundRace !== null) {
                res.sendStatus(204)
            } else {

                const race = await RacialTrait.create({ ...req.body, race_name: foundRace!.name, source_name: source!.shorthand });
                res.send(race);
            }
        } catch (e) {
            console.log(e);

            next(e);
        }
    }
);




passive_data_router.delete(
    "/race/deleteAll",

    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            Race.drop()
            RacialTrait.drop()
            res.sendStatus(204);
        } catch (e) {
            console.log(e);

            next(e);
        }
    }
);


passive_data_router.delete(
    "/class",

    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {


            const race = await Classes.destroy({
                where: {
                    type: "subclass"
                }
            });
            res.sendStatus(204);
        } catch (e) {
            console.log(e);

            next(e);
        }
    }
);

passive_data_router.delete(
    "/race/:query",

    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            //note: truncate deletes everything

            const race = await Race.truncate({
                where: {
                    name: req.params.query
                }, cascade: true
            });
            res.sendStatus(204);
        } catch (e) {
            console.log(e);

            next(e);
        }
    }
);






export default passive_data_router;
