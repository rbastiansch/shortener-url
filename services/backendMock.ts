import { nanoid } from 'nanoid'
const validUrl = require('valid-url')

interface DatabaseItem {
    id?: number;
    originUrl: string;
    shortUrl: string;
    hash: string
}

class UrlShortener {
    database: Array<DatabaseItem>
    baseUrl: string | undefined
    constructor () {
        const localDatabase = localStorage.getItem('database')
        this.database = localDatabase ? JSON.parse(localDatabase) : []

        this.baseUrl = process.env.BASE_URL
    }

    createUrl (url: string): string | boolean {
        if (!url || !validUrl.isUri(url)) {
            return false
        }

        const baseUrl = process.env.BASE_URL
        const hash = nanoid(6)
        console.log(url)

        const shortUrl = `${this.baseUrl}${hash}`

        const urlObject: DatabaseItem = {
            originUrl: url,
            shortUrl,
            hash
        }

        this.database.push(urlObject)
        localStorage.setItem('database', JSON.stringify(this.database))

        console.log(this.database)

        return shortUrl
    }
}

export default new UrlShortener()