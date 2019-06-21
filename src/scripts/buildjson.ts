import { IApplication, IApplicationVersionListing } from "../types/application"
import { url } from "inspector"
import signale from 'signale'
import { writeFileSync } from "fs";

const fs = require('fs')
const path = require('path')
const testFolder = path.join(__dirname, '../apps')

let allApps: IApplication[] = []


fs.readdir(testFolder, (err: Error, files: string[]) => {
    let passed = true
    if (err) throw err
    for (let i = 0; i < files.length; i++) {
        let j: IApplication = JSON.parse(fs.readFileSync(`${testFolder}/${files[i]}`, 'utf8'))
        try {
            validateJSON(j)
        } catch (err) {
            passed = false
        }
        allApps.push(j)
    }

    fs.open(`${testFolder}/all.json`, 'w', function (err: Error, dir: String) {
        if (err) throw err
        fs.writeFileSync(`${testFolder}/all.json`, JSON.stringify(allApps, null, 4))
    });
    if (passed) {
        signale.complete(`All ${files.length} files completed validation`)
    } else {
        signale.fatal('Files did not complete validation')
    }
})


function validateJSON(j: IApplication) {
    if (!j.category) bad(j, 'category')
    if (!j.title) bad(j, 'title')
    if (!j.url) bad(j, 'url')
    if (!j.maintainer) bad(j, 'maintainer')
    if (!j.repo) bad(j, 'repo')

    // if (!j.readme) bad(j, 'readme')
    //^ allowed to be missing

    if (!j.versions) bad(j, 'versions')

    if (!j.id) bad(j, 'id')
    if (!j.author) bad(j, 'author')

    if (!validateLink(j.url)) bad(j, 'url')
    if (!validateLink(j.repo)) bad(j, 'repo')
    //below is commented
    // if (!validateLink(j.readme!)) bad(j, 'readme')

    for (let vkey in j.versions) {
        let version: IApplicationVersionListing = (j.versions as any)[vkey]
        if (!version.oarURL) bad(j, 'oarLink')
        if (!validateOarLink) bad(j, 'oarLink')
    }
    signale.success(`[${j.id}]: validation passed`)
    return true
}

function validateLink(url: string): boolean {
    return url.startsWith('https://') || url.startsWith('http://')//TODO: use regex - not important
}

function validateOarLink(url: string): boolean {
    return validateLink && url.endsWith('.oar')
}

function bad(j: IApplication, msg: string) {
    signale.fatal(`[${j.id}]: validation failed`)
    throw new Error(`Bad application field: ` + msg + '\n' + JSON.stringify(j, null, 4))
}

