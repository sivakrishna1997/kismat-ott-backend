import { Request, Response } from "express";

export const success = (req: Request, res: Response, msg: String, data: any) => {
    if (data) {
        res.json({
            status: 200,
            message: msg,
            data: data
        })
    } else {
        res.json({
            status: 300,
            message: msg,
        })
    }
}

export const error = (req: Request, res: Response, msg: String, err: any) => {
    res.json({
        status: 500,
        message: err?.message ? err?.message : msg,
    })
}
