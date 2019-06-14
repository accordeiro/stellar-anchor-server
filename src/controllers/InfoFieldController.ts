import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { InfoField } from "../entity/InfoField";

class InfoFieldController {
  public static listAll = async (req: Request, res: Response) => {
    const infoFieldRepository = getRepository(InfoField);
    const infoFields = await infoFieldRepository.find();

    res.send(infoFields);
  }

  public static getOneById = async (req: Request, res: Response) => {
    const id: number = req.params.id;
    const infoFieldRepository = getRepository(InfoField);
    let infoField: InfoField;
    try {
      infoField = await infoFieldRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("InfoField not found");
      return;
    }

    res.status(200).send(infoField);
  }

  public static newInfoField = async (req: Request, res: Response) => {
    let infoField: InfoField;
    try {
      infoField = req.body;
    } catch (e) {
      res.status(400).send();
      return;
    }

    const errors = await validate(infoField);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    const infoFieldRepository = getRepository(InfoField);
    try {
      await infoFieldRepository.save(infoField);
    } catch (e) {
      res.status(409).send("InfoField name already in use");
      return;
    }

    res.status(201).send("InfoField created");
  }

  public static editInfoField = async (req: Request, res: Response) => {
    const id = req.params.id;
    let infoField: InfoField;

    const infoFieldRepository = getRepository(InfoField);
    try {
      infoField = await infoFieldRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("InfoField not found");
      return;
    }

    infoField.name = req.body.name || infoField.name;
    infoField.description = req.body.description || infoField.description;
    infoField.optional = req.body.optional || infoField.optional;
    infoField.choices = req.body.choices || infoField.choices;

    const errors = await validate(infoField);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    try {
      await infoFieldRepository.save(infoField);
    } catch (e) {
      res.status(409).send("InfoFieldname already in use");
      return;
    }
    res.status(204).send();
  }

  public static deleteInfoField = async (req: Request, res: Response) => {
    const id = req.params.id;

    const infoFieldRepository = getRepository(InfoField);
    try {
      await infoFieldRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("InfoField not found");
      return;
    }
    infoFieldRepository.delete(id);
    res.status(204).send();
  }
}

export default InfoFieldController;
