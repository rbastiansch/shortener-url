import { Context } from '@nuxt/types'
import UrlShortener from '~/services/backendMock'

export default function (context: Context) {
    const { path } = context.route
    const formattedPath = path.replace('/', '')
    if(!formattedPath) {
        return
    }

    let originUrl = null
    UrlShortener.database.forEach(item => {
        if (item.hash === formattedPath) {
            originUrl = item.originUrl
        }
    })

    if (!originUrl) {
        context.redirect('/')

        return
    }

    context.redirect(originUrl)
}