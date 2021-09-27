import { UserPayload, DatabaseItem } from '~/types/common.interface'
import UrlShortener from '~/services/backendMock'
import { ActionContext } from 'vuex'

interface StoreState {
  userLogged: UserPayload | null,
  userUrls: Array<DatabaseItem> | null
}

export const state = () => ({
  userLogged: null,
  userUrls: null
} as StoreState)

export const mutations = {
  setUserLogged(state: StoreState, user: UserPayload) {
    state.userLogged = user
  },
  removeUserLogged(state: StoreState) {
    state.userLogged = null
  },
  setUserUrls (state: StoreState, value: Array<DatabaseItem> ) {
    state.userUrls = value
  }
}

export const actions = {
  setUserLogged (context: ActionContext<StoreState, StoreState>, user: UserPayload) {
    context.commit('setUserLogged', user)
    context.commit('loadSavedUrls')
  },
  loadSavedUrls (context: any) {
    const { userLogged } = context.state

    if (!userLogged || !userLogged.id) {
      return
    }

    const result = UrlShortener.getDatabaseUrlsByUserId(userLogged.id)
    context.commit('setUserUrls', result)
  }
}
