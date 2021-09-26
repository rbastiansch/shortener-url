import { Context } from '@nuxt/types'

export default function (context: Context) {
    const { name } = context.route
    const currentUserJson = localStorage.getItem('currentUser')
    const currentUser = currentUserJson ? JSON.parse(currentUserJson) : null

    if (currentUser) {
        context.store.commit('setUserLogged', currentUser)
    }
    
    if (currentUser && name === 'signin') {
        context.redirect('/')
    }
}