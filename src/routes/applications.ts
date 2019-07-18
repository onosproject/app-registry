import { Request, Response, Router } from "express"
import * as fs from "fs"
import path from "path"
import signale = require("signale")
import { IApplication, IApplicationVersionListing } from "../types/application"

export const applicationsRouter = Router()

// Store this in memory - always static
// tslint:disable-next-line: max-line-length
const APPS = JSON.parse(fs.readFileSync(path.join(__dirname, "../apps/all.json")) as unknown as string) as IApplication[]

/**
 * Returns list of applications based on query
 */
applicationsRouter.get("/", async (req: Request, res: Response) => {
    try {
        // tslint:disable-next-line: prefer-const
        let { id, onosVersion } = req.query // pull query strings from request
        let results = APPS
        if (id) {
            results = results.filter((x) => x.id === id)
            if (results.length === 0) {
                return res.status(400).json({ error: `No applications found with id: ${id}` })
            }
        }

        if (onosVersion) {
            try {
                onosVersion = onosVersion.split("-")[0]
            } catch (error) {
                signale.error(error)
                res.status(400).json({ success: false, error: "onosVersion incorrectly formatted" })
            }
            results = results.filter((x) => {
                return (
                    x.versions &&
                    Object.values(x.versions)
                        .filter((v: IApplicationVersionListing) => v.onosVersion === onosVersion)
                        .length > 0
                )
            })
            if (results.length === 0) {
                return res.status(400).json({ error: `No applications found supporting version ${onosVersion}` })
            }
        }
        return res.json(results)
    } catch (err) {
        return res.status(500).json({ error: process.env.NODE_ENV === "production" ? "INTERNAL SERVER ERROR" : err })
    }
})
