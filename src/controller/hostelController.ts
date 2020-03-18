import { Request, Response, NextFunction } from "express";
import Validator from "validatorjs";
import catchAsync from "../utils/catchAsync";
import HttpException from "../utils/HttpException";
const db = require("../db/models");

class HostelController {
  index = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await db.hostel.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: db.room,
          attributes: { exclude: ["createdAt", "updatedAt", "hostelId"] }
        }
      ]
    });

    res.status(200).json({
      status: "success",
      result: data.length,
      data
    });
  });

  show = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await db.hostel.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.teacher,
          attributes: ["id", "name"]
        },
        {
          model: db.room,
          attributes: ["id", "name"]
        }
      ]
    });
    res.status(200).json({
      status: "success",
      data
    });
  });

  store = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const validation = new Validator(req.body, {
      teacher_id: "required|numeric",
      name: "required"
    });

    if (validation.fails()) {
      return next(new HttpException("validation fail", 400, validation.errors));
    }

    const data = await db.hostel.create(req.body);
    res.status(200).json({
      status: "success",
      data
    });
  });

  update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await db.hostel.update(req.body, { where: { id: req.params.id } });
    res.status(201).json({
      status: "success",
      message: "Data sucessfull updated !"
    });
  });

  remove = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await db.hostel.destroy({ where: { id: req.params.id } });
    res.status(201).json({
      status: "success",
      message: "Data sucessfull deleted !"
    });
  });
}

export default new HostelController();
