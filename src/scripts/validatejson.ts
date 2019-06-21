import signale = require("signale")
import { IApplication, IApplicationVersionListing } from "../types/application"

export function validateJSON(j: IApplication) {
    if (!j.category) { bad(j, "category") }
    if (!j.title) { bad(j, "title") }
    if (!j.url) { bad(j, "url") }
    if (!j.maintainer) { bad(j, "maintainer") }
    if (!j.repo) { bad(j, "repo") }

    // if (!j.readme) bad(j, 'readme')
    // ^ allowed to be missing

    if (!j.versions) { bad(j, "versions") }

    if (!j.id) { bad(j, "id") }
    if (!j.author) { bad(j, "author") }

    if (!validateLink(j.url)) { bad(j, "url") }
    if (!validateLink(j.repo)) { bad(j, "repo") }
    // below is commented
    // if (!validateLink(j.readme!)) bad(j, 'readme')

    // tslint:disable-next-line: forin
    for (const vkey in j.versions) {
        const version: IApplicationVersionListing = (j.versions as any)[vkey]
        if (!version.oarURL) { bad(j, "oarLink") }
        if (!validateOarLink) { bad(j, "oarLink") }
        if (!version.onosVersion) { bad(j, "onosVersion") }
    }
    // signale.success(`[${j.id}]: validation passed`);
    return true
}

function validateLink(url: string): boolean {
    return url.startsWith("https://") || url.startsWith("http://") // TODO: use regex - not important
}

function validateOarLink(url: string): boolean {
    return validateLink && url.endsWith(".oar")
}

function bad(j: IApplication, msg: string) {
    signale.fatal(`[${j.id}]: validation failed`)
    throw new Error(`Bad application field: ` + msg + "\n" + JSON.stringify(j, null, 4))
}
