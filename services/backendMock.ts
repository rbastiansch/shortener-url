import { UserPayload, DatabaseItem } from '~/types/common.interface'
import { nanoid } from 'nanoid'
const validUrl = require('valid-url')

class UrlShortener {
  database: Array<DatabaseItem>
  users: Array<UserPayload>
  baseUrl: string | undefined
  constructor() {
    const localDatabase = localStorage.getItem('database')
    const localUsers = localStorage.getItem('users')

    this.database = localDatabase ? JSON.parse(localDatabase) : []
    this.users = localUsers ? JSON.parse(localUsers) : []

    this.baseUrl = process.env.baseUrl
  }

  public createUrl(url: string): string | boolean {
    if (!url || !validUrl.isUri(url)) {
      return false
    }

    const shortUrl = this.mountUrlPayloadAndSaveToDatabase(url)

    return shortUrl
  }

  public createUser({ email, password }: UserPayload): UserPayload | boolean {
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

  public signIn({ email, password }: UserPayload): UserPayload | boolean {
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
    const hash = nanoid(6)

    const shortUrl = `${this.baseUrl}${hash}`

    const currentUser = localStorage.getItem('currentUser')

    const urlObject: DatabaseItem = {
      originUrl: url,
      shortUrl,
      hash,
      userId: currentUser ? JSON.parse(currentUser).id : null
    }

    this.database.push(urlObject)
    localStorage.setItem('database', JSON.stringify(this.database))

    return shortUrl
  }

  public getDatabaseUrlsByUserId(userId: string): Array<DatabaseItem> {
    return this.database.filter(item => item.userId === userId)
  }
}

export default new UrlShortener()
