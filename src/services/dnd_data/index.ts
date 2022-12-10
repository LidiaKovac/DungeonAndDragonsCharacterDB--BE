//GENERAL
import { Router } from "express";
const passive_data_router = Router()

import { Request, Response, NextFunction } from "express";
import Classes from "../../db/models/classes";
import Race from "../../db/models/races";
import RacialTrait from "../../db/models/racial_feat";
import Source from "../../db/models/sources";


passive_data_router.get(
    "/sources",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const todos = await Source.findAll();
            console.log(todos);

            if (todos.length > 0 && todos !== null) {
                res.status(200).send(todos);
            } else res.sendStatus(500)
        } catch (e) {
            next(e);
        }
    }
);

passive_data_router.get(
    "/sources/:id",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const todos = await Source.findOne({ where: { shorthand: req.params.id } });
            if (todos !== null) res.send(todos)
            else res.send(204)
        } catch (e) {
            next(e);
        }
    }
);

passive_data_router.post(
    "/sources",

    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            console.log(req.body);

            const classes = await Source.create(req.body);
            res.send(classes);
        } catch (e) {
            console.log(e);

            next(e);
        }
    }
);

passive_data_router.post(
    "/sources/bulk",

    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            console.log(req.body);

            for (const el of req.body.elements) {
                const classes = await Source.create(el);
            }
            res.send(201);
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
            const todos = await Race.findAll();
            console.log(todos);

            if (todos.length > 0) {
                res.status(200).send(todos);
            } else res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
);

passive_data_router.get(
    "/race/:query",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const todos = await Race.findOne({
                where: {
                    name: req.params.query
                }
            });
            console.log(todos);

            if (todos !== null) {
                res.status(200).send(todos);
            } else res.sendStatus(204);
        } catch (e) {
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
            console.log(req.body);
            const source = await Source.findOne({
                where: {
                    shorthand: req.body.source_name
                }, plain: true
            })
            console.log(source)
            const race = await Race.create({ ...req.body, source_name: source!.shorthand });
            res.send(race);
        } catch (e) {
            console.log(e);

            next(e);
        }
    }
);

passive_data_router.get("/class", async(req:Request, res:Response, next:NextFunction)=> {
    try {
    let traits = await Classes.findAll()
    res.send(traits) 
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
            console.log(req.body);
            const source = await Source.findOne({
                where: {
                    shorthand: req.body.source_name
                }, plain: true
            })
            if(source !== null) {

                const race = await Classes.create({ ...req.body, SourceId: source!.id });
                res.send(race);
            } else res.sendStatus(204)
        } catch (e) {
            console.log(e);

            next(e);
        }
    }
);

passive_data_router.get("/raceTrait", async(req:Request, res:Response, next:NextFunction)=> {
    try {
    let traits = await RacialTrait.findAll()
    res.send(traits) 
    } catch (error) {
        next(error)
    }
})

passive_data_router.delete("/raceTrait", async(req:Request, res:Response, next:NextFunction)=> {
    try {
    let traits = await RacialTrait.destroy({where: {
        race_name: null
    }})
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
            console.log(req.body);
            const source = await Source.findOne({
                where: {
                    shorthand: req.body.source_name
                }, plain: true
            })
            const foundRace = await Race.findByPk(req.body.RaceId) 
            console.log(source)
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
    "/race/deleteAllNullFK",

    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            console.log(req.body);

            const race = await Race.destroy({
                where: {
                    SourceId: null
                }
            });
            res.send(race);
        } catch (e) {
            console.log(e);

            next(e);
        }
    }
);
passive_data_router.delete(
    "/race/:id",

    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            console.log(req.body);

            const race = await Race.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.send(race);
        } catch (e) {
            console.log(e);

            next(e);
        }
    }
);






export default passive_data_router;
