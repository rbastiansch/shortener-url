export const state = () => ({
    userLogged: null
})

export const mutations = {
    setUserLogged (state: any, user: any) {
        state.userLogged = user
    },
    removeUserLogged (state: any) {
        state.userLogged = null
    }
}