//GENERAL
import { Router } from "express";
const passive_data_router = Router()

import { Request, Response, NextFunction } from "express";
import Classes from "../../db/models/classes";
import Race from "../../db/models/races";
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
            if(todos !== null)  res.send(todos)
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

passive_data_router.post(
    "/race",

    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            console.log(req.body);
            const source = await Source.findOne({where: {
                shorthand: req.body.source_name
            }, plain: true})
            console.log(source)
            const race = await Race.create({...req.body, source_name: source!.shorthand});
            res.send(race);
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

            const race = await Race.destroy({where: {
                SourceId: null
            }});
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

            const race = await Race.destroy({where: {
                id: req.params.id
            }});
            res.send(race);
        } catch (e) {
            console.log(e);

            next(e);
        }
    }
);






export default passive_data_router;
