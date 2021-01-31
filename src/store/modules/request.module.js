import axios from '../../axios/request'
import store from '../index'
export default {
    namespaced: true,
    state() {
        return {
            requests: []
        }
    },
    mutations: {
        setRequests(state, requests) {
            state.requests = requests
        },
        addRequest(state, request) {
            state.requests.push(request)
            console.log(state.requests)
        }
    },
    actions: {
        async create({commit, dispatch}, payload) {
            try {
                const token = store.getters['auth/token']
                const {data} = await axios.post(`/requests.json?auth=${token}`, payload)
                dispatch('setMessage', {
                    value: 'Заявка успешно создана',
                    type: 'primary'
                }, {root: true})
                commit('addRequest', {
                    ...payload,
                    id: data.name
                })
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async loadRequests({commit, dispatch}) {
            try {
                const token = store.getters['auth/token']
                const {data} = await axios.get(`/requests.json?auth=${token}`)

                const rqs = Object.keys(data).map((key)=> {
                    return {
                        ...data[key],
                        id: key
                    }
                })
                commit('setRequests', rqs)
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        }
    },
    getters: {
        requests(state) {
            return state.requests
        }
    }
}