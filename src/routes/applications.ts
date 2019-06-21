import { Request, Response, Router } from "express"
import * as fs from "fs"
import path from "path"
import { IApplication } from "../types/application"

export const applicationsRouter = Router()

// Store this in memory - always static
const APPS = JSON.parse(fs.readFileSync(path.join(__dirname, "../apps/all.json")) as unknown as string) as IApplication[]

/**
 * Returns list of applications based on query
 */
applicationsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const { id, version } = req.query // pull query strings from request
        let results = APPS
        if (id) {
            results = results.filter((x) => x.id === id)
            if (results.length === 0) {
                return res.status(400).json({ error: `No applications found with id: ${id}` })
            }
        }
        if (version) {
            results = results.filter((x) =>
                x.versions && (x.versions as any)[version],
            )
            if (results.length === 0) {
                return res.status(400).json({ error: `No applications found supporting version ${version}` })
            }
        }
        return res.json(results)
    } catch (err) {
        return res.status(500).json({ error: process.env.NODE_ENV === "production" ? "INTERNAL SERVER ERROR" : err })
    }
})
