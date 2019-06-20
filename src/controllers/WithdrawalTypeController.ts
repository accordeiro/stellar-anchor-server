import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { InfoField } from "../entity/InfoField";
import { WithdrawalType } from "../entity/WithdrawalType";

class WithdrawalTypeController {
  public static listAll = async (req: Request, res: Response) => {
    const withdrawalTypeRepository = getRepository(WithdrawalType);
    const infoFields = await withdrawalTypeRepository.find({
      relations: ["infoFields"],
    });

    res.send(infoFields);
  }

  public static getOneById = async (req: Request, res: Response) => {
    const id: number = req.params.id;
    const withdrawalTypeRepository = getRepository(WithdrawalType);
    let withdrawalType: WithdrawalType;
    try {
      withdrawalType = await withdrawalTypeRepository.findOneOrFail(id, {
        relations: ["infoFields"],
      });
    } catch (error) {
      res.status(404).send("WithdrawalType not found");
      return;
    }

    res.status(200).send(withdrawalType);
  }

  public static create = async (req: Request, res: Response) => {
    let withdrawalType: WithdrawalType;
    try {
      withdrawalType = new WithdrawalType(req.body.name);
    } catch (e) {
      res.status(400).send();
      return;
    }

    const errors = await validate(withdrawalType);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    // Validate deposit InfoFields:
    const infoFieldIds = (req.body.infoFields as number[]) || [];
    const infoFields = await WithdrawalTypeController.findInfoFields(
      infoFieldIds,
    );

    if (infoFields.length !== infoFieldIds.length) {
      res.status(404).send("One or more infoFields were not found");
      return;
    }

    withdrawalType.infoFields = infoFields;

    let dbAsset: WithdrawalType;
    const withdrawalTypeRepository = getRepository(WithdrawalType);
    try {
      dbAsset = await withdrawalTypeRepository.save(withdrawalType);
    } catch (e) {
      res.status(409).send("WithdrawalType name already in use");
      return;
    }

    res.status(201).send(dbAsset);
  }

  public static edit = async (req: Request, res: Response) => {
    const id = req.params.id;
    let withdrawalType: WithdrawalType;

    const withdrawalTypeRepository = getRepository(WithdrawalType);
    try {
      withdrawalType = await withdrawalTypeRepository.findOneOrFail(id, {
        relations: ["infoFields"],
      });
    } catch (error) {
      res.status(404).send("WithdrawalType not found");
      return;
    }

    withdrawalType.name = req.body.name || withdrawalType.name;
    const errors = await validate(withdrawalType);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    // Validate InfoFields:
    const infoFieldIds = req.body.infoFields as number[];
    if (infoFieldIds) {
      const infoFields = await WithdrawalTypeController.findInfoFields(
        infoFieldIds,
      );
      if (infoFields.length !== infoFieldIds.length) {
        res.status(404).send("One or more infoFields were not found");
        return;
      }

      withdrawalType.infoFields = infoFields;
    }

    let dbAsset: WithdrawalType;
    try {
      dbAsset = await withdrawalTypeRepository.save(withdrawalType);
    } catch (e) {
      res.status(409).send("WithdrawalType name already in use");
      return;
    }

    res.status(200).send(dbAsset);
  }

  public static remove = async (req: Request, res: Response) => {
    const id = req.params.id;

    const withdrawalTypeRepository = getRepository(WithdrawalType);
    try {
      await withdrawalTypeRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("WithdrawalType not found");
      return;
    }
    withdrawalTypeRepository.delete(id);
    res.status(204).send();
  }

  public static findInfoFields = async (
    infoFieldIds: number[],
  ): Promise<InfoField[]> => {
    const infoFieldRepository = getRepository(InfoField);
    const infoFields = await infoFieldRepository.findByIds(infoFieldIds);
    return infoFields;
  }
}

export default WithdrawalTypeController;
