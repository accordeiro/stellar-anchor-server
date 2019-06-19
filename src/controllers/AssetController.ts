import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Asset } from "../entity/Asset";

class AssetController {
  public static listAll = async (req: Request, res: Response) => {
    const infoFieldRepository = getRepository(Asset);
    const infoFields = await infoFieldRepository.find();

    res.send(infoFields);
  }

  public static getOneById = async (req: Request, res: Response) => {
    const id: number = req.params.id;
    const infoFieldRepository = getRepository(Asset);
    let asset: Asset;
    try {
      asset = await infoFieldRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("Asset not found");
      return;
    }

    res.status(200).send(asset);
  }

  public static create = async (req: Request, res: Response) => {
    let asset: Asset;
    try {
      asset = new Asset(
        req.body.name,
        req.body.depositEnabled,
        req.body.depositFeeFixed,
        req.body.depositFeePercent,
        req.body.depositMinAmount,
        req.body.depositMaxAmount,
        req.body.withdrawalEnabled,
        req.body.withdrawalFeeFixed,
        req.body.withdrawalFeePercent,
        req.body.withdrawalMinAmount,
        req.body.withdrawalMaxAmount,
      );
    } catch (e) {
      res.status(400).send();
      return;
    }

    const errors = await validate(asset);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    let dbInfoField: Asset;
    const infoFieldRepository = getRepository(Asset);
    try {
      dbInfoField = await infoFieldRepository.save(asset);
    } catch (e) {
      res.status(409).send("Asset name already in use");
      return;
    }

    res.status(201).send(dbInfoField);
  }

  public static edit = async (req: Request, res: Response) => {
    const id = req.params.id;
    let asset: Asset;

    const infoFieldRepository = getRepository(Asset);
    try {
      asset = await infoFieldRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("Asset not found");
      return;
    }

    asset.name = req.body.name || asset.name;
    asset.depositEnabled = req.body.depositEnabled || asset.depositEnabled;
    asset.depositFeeFixed = req.body.depositFeeFixed || asset.depositFeeFixed;
    asset.depositFeePercent =
      req.body.depositFeePercent || asset.depositFeePercent;
    asset.depositMinAmount =
      req.body.depositMinAmount || asset.depositMinAmount;
    asset.depositMaxAmount =
      req.body.depositMaxAmount || asset.depositMaxAmount;
    asset.withdrawalEnabled =
      req.body.withdrawalEnabled || asset.withdrawalEnabled;
    asset.withdrawalFeeFixed =
      req.body.withdrawalFeeFixed || asset.withdrawalFeeFixed;
    asset.withdrawalFeePercent =
      req.body.withdrawalFeePercent || asset.withdrawalFeePercent;
    asset.withdrawalMinAmount =
      req.body.withdrawalMinAmount || asset.withdrawalMinAmount;
    asset.withdrawalMaxAmount =
      req.body.withdrawalMaxAmount || asset.withdrawalMaxAmount;

    const errors = await validate(asset);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    let dbInfoField: Asset;
    try {
      dbInfoField = await infoFieldRepository.save(asset);
    } catch (e) {
      res.status(409).send("Asset name already in use");
      return;
    }

    res.status(200).send(dbInfoField);
  }

  public static remove = async (req: Request, res: Response) => {
    const id = req.params.id;

    const infoFieldRepository = getRepository(Asset);
    try {
      await infoFieldRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("Asset not found");
      return;
    }
    infoFieldRepository.delete(id);
    res.status(204).send();
  }
}

export default AssetController;
