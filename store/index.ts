import { UserPayload } from '~/types/common.interface'

interface StoreState {
  userLogged: UserPayload | null
}

export const state = () => ({
  userLogged: null
} as StoreState)

export const mutations = {
  setUserLogged(state: StoreState, user: UserPayload) {
    state.userLogged = user
  },
  removeUserLogged(state: StoreState) {
    state.userLogged = null
  }
}
