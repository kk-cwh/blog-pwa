
import axios from 'axios'


export const state = () => ({

});

export const mutations = {

};

export const actions = {
    ArticleList ({ commit }, data) {
        return new Promise((resolve, reject) => {
          axios({
            url: `/api/api/_articles?page=${data.page}`,
            method: 'get'
          }).then(response => {
            if (response.data) {
              resolve(response.data)
            }
          }).catch(error => {
            reject(error)
          })
        })
      },
      ArticleDetail ({ commit }, data) {
        return new Promise((resolve, reject) => {
          axios({
            url: `/api/api/_articles/${data.id}`,
            method: 'get'
          }).then(response => {
            if (response.data) {
              resolve(response.data)
            }
          }).catch(error => {
            reject(error)
          })
        })
      },
      AchivesList ({ commit }, data) {
        return new Promise((resolve, reject) => {
          axios({
            url: `/api/api/_archives?page=${data.page}`,
            method: 'get'
          }).then(response => {
            if (response.data) {
              resolve(response.data)
            }
          }).catch(error => {
            reject(error)
          })
        })
      },
      TagList ({ commit }, data) {
        return new Promise((resolve, reject) => {
          axios({
            url: '/api/api/_tags',
            method: 'get'
          }).then(response => {
            if (response.data) {
              resolve(response.data)
            }
          }).catch(error => {
            reject(error)
          })
        })
      }
};


