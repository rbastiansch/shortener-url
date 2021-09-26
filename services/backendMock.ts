import { nanoid } from 'nanoid'
const validUrl = require('valid-url')

interface DatabaseItem {
    id?: number;
    userId?: number;
    originUrl: string;
    shortUrl: string;
    hash: string
}

interface UserPayload {
    email: string;
    password: string;
}

class UrlShortener {
    database: Array<DatabaseItem>
    users: Array<UserPayload>
    baseUrl: string | undefined
    constructor () {
        const localDatabase = localStorage.getItem('database')
        const localUsers = localStorage.getItem('users')

        this.database = localDatabase ? JSON.parse(localDatabase) : []
        this.users = localUsers ? JSON.parse(localUsers) : []

        this.baseUrl = process.env.BASE_URL
    }

    public createUrl (url: string): string | boolean {
        if (!url || !validUrl.isUri(url)) {
            return false
        }

        const shortUrl = this.mountUrlPayloadAndSaveToDatabase(url)

        return shortUrl
    }

    public createUser ({ email, password }: UserPayload): UserPayload | boolean {
        if (!email || !password) {
            return false
        }

        const user = {
            email,
            password,
            id: nanoid(4)
        }

        this.users.push(user)
        localStorage.setItem('users', JSON.stringify(this.users))
        localStorage.setItem('currentUser', JSON.stringify(user))

        return user
    }

    public signIn ({ email, password }: UserPayload): UserPayload | boolean {
        if (!email || !password) {
            return false
        }

        const user = this.users.find(user => {
            if (user.email === email && user.password === password) {
                return true
            }
        })

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user))
            return user
        }

        return this.createUser({ email, password })
    }

    private mountUrlPayloadAndSaveToDatabase(url: string): string {
        const baseUrl = process.env.BASE_URL
        const hash = nanoid(6)

        const shortUrl = `${this.baseUrl}${hash}`

        const urlObject: DatabaseItem = {
            originUrl: url,
            shortUrl,
            hash
        }

        this.database.push(urlObject)
        localStorage.setItem('database', JSON.stringify(this.database))

        return shortUrl
    }
}

export default new UrlShortener()