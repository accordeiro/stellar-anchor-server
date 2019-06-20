import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Asset } from "../entity/Asset";
import { InfoField } from "../entity/InfoField";

class AssetController {
  public static listAll = async (req: Request, res: Response) => {
    const assetRepository = getRepository(Asset);
    const infoFields = await assetRepository.find({
      relations: ["depositInfoFields"],
    });

    res.send(infoFields);
  }

  public static getOneById = async (req: Request, res: Response) => {
    const id: number = req.params.id;
    const assetRepository = getRepository(Asset);
    let asset: Asset;
    try {
      asset = await assetRepository.findOneOrFail(id, {
        relations: ["depositInfoFields"],
      });
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

    // Validate deposit InfoFields:
    const depositInfoFieldIds = (req.body.depositInfoFields as number[]) || [];
    const depositInfoFields = await AssetController.findInfoFields(
      depositInfoFieldIds,
    );

    if (depositInfoFields.length !== depositInfoFieldIds.length) {
      res.status(404).send("One or more depositInfoFields were not found");
      return;
    }

    asset.depositInfoFields = depositInfoFields;

    let dbAsset: Asset;
    const assetRepository = getRepository(Asset);
    try {
      dbAsset = await assetRepository.save(asset);
    } catch (e) {
      res.status(409).send("Asset name already in use");
      return;
    }

    res.status(201).send(dbAsset);
  }

  public static edit = async (req: Request, res: Response) => {
    const id = req.params.id;
    let asset: Asset;

    const assetRepository = getRepository(Asset);
    try {
      asset = await assetRepository.findOneOrFail(id, {
        relations: ["depositInfoFields"],
      });
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

    // Validate deposit InfoFields:
    const depositInfoFieldIds = req.body.depositInfoFields as number[];
    if (depositInfoFieldIds) {
      const depositInfoFields = await AssetController.findInfoFields(
        depositInfoFieldIds,
      );
      if (depositInfoFields.length !== depositInfoFieldIds.length) {
        res.status(404).send("One or more depositInfoFields were not found");
        return;
      }

      asset.depositInfoFields = depositInfoFields;
    }

    let dbAsset: Asset;
    try {
      dbAsset = await assetRepository.save(asset);
    } catch (e) {
      res.status(409).send("Asset name already in use");
      return;
    }

    res.status(200).send(dbAsset);
  }

  public static remove = async (req: Request, res: Response) => {
    const id = req.params.id;

    const assetRepository = getRepository(Asset);
    try {
      await assetRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("Asset not found");
      return;
    }
    assetRepository.delete(id);
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

export default AssetController;
