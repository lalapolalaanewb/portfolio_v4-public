import axios from 'axios'
import { config } from '../../../Utils/headers/header'
import { getCookie, setCookie } from "../../../services/Cookie"
import { ipv4 } from '../../../Utils/ipv4/ipv4'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { error: error.status, message: error.message } })

// const imgSrc = 'blog_gettingStartedOnSelfOwnWeb_0.png'
// const excerpt = `It is a long established  sometimes by accident`
// const oneDay = 1000*60*60*24
// const publishedAt = (day) => new Date(Date.now() + (oneDay * +day)).toDateString()
// const posts = [
//   { _id: 1, title: 'Post 1 kd jdshgf jhd sfjh hdgf', like: 1, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(5), tech: {_id: 1, name: 'Html'}},
//   { _id: 2, title: 'Post 2', like: 2, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(4), tech: {_id: 2, name: 'Css|Scss'}},
//   { _id: 3, title: 'Post 3', like: 3, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(3), tech: {_id: 5, name: 'Vanilla JavaScript'}},
//   { _id: 4, title: 'Post 4', like: 4, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(2), tech: {_id: 4, name: 'NodeJs'}},
//   { _id: 5, title: 'Post 5', like: 5, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(1), tech: {_id: 3, name: 'Yii2'}},
//   { _id: 6, title: 'Post 6', like: 6, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(10), tech: {_id: 6, name: 'Sql'}},
//   { _id: 7, title: 'Post 7 Title Should Be Here', like: 7, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(9), tech: {_id: 7, name: 'MySql'}},
//   { _id: 8, title: 'Post 8', like: 8, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(8), tech: {_id: 8, name: 'MongoDB'}},
//   { _id: 9, title: 'Post 9', like: 9, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(7), tech: {_id: 9, name: 'Firebase'}},
//   { _id: 10, title: 'Post 10', like: 10, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(6), tech: {_id: 10, name: 'React'}},
//   { _id: 11, title: 'Post 1 kd jdshgf jhd sfjh hdgf', like: 11, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(5), tech: {_id: 1, name: 'Html'}},
//   { _id: 12, title: 'Post 2', like: 12, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(4), tech: {_id: 2, name: 'Css|Scss'}},
//   { _id: 13, title: 'Post 3', like: 13, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(3), tech: {_id: 5, name: 'Vanilla JavaScript'}},
//   { _id: 14, title: 'Post 4', like: 14, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(2), tech: {_id: 4, name: 'NodeJs'}},
//   { _id: 15, title: 'Post 5', like: 15, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(1), tech: {_id: 3, name: 'Yii2'}},
//   { _id: 16, title: 'Post 6', like: 16, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(10), tech: {_id: 6, name: 'Sql'}},
//   { _id: 17, title: 'Post 7 Title Should Be Here', like: 17, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(9), tech: {_id: 7, name: 'MySql'}},
//   { _id: 18, title: 'Post 8', like: 18, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(8), tech: {_id: 8, name: 'MongoDB'}},
//   { _id: 19, title: 'Post 9', like: 19, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(7), tech: {_id: 9, name: 'Firebase'}},
//   { _id: 20, title: 'Post 10', like: 20, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(6), tech: {_id: 10, name: 'React'}}
// ]

export const getPost = async(dispatch, postId) => {
  setLoading(dispatch, true)

  // fetch a post
  await axios.post('/api/v1/posts/public/get', { key: process.env.REACT_APP_ADMIN_ACCESS_PUBLIC, postId: postId }, config)
  .then(async res => {
    const result = await res.data.data
    
    dispatch({
      type: 'SET_POST',
      payload: {...result, tech: result.tech, creator: { ...result.creator, name: result.creator.name }}
    })
  })
  .catch(async error => {
    const result = await error.response.data
    
    dispatch({
      type: 'SET_ERROR',
      payload: {
        error: true,
        message: result.error
      }
    })
  })

  // const change2Obj = () => {
  //   const filteredPost = posts.filter(post => post._id == postId)

  //   let container = {}

  //   filteredPost.map(post => {
  //     container._id = post._id
  //     container.title = post.title
  //     container.imgSrc = post.imgSrc
  //     container.excerpt = post.excerpt
  //     // container.description = post.description
  //     container.tech = { _id: post.tech._id, name: post.tech.name }
  //     // container.status = post.status
  //     container.publishedAt = post.publishedAt
  //     container.like = post.like
  //     // container.createdAt = post.createdAt
  //     // container.updatedAt = post.updatedAt
  //   })
    
  //   return container
  // }
  // let pp = change2Obj()
  // console.log(pp)
  // dispatch({
  //   type: 'SET_POST',
  //   payload: pp
  // })
}

// Update Post Likes
export const updatePostLikeCount = async( dispatch, post, user) => {
  setLoading(dispatch, true)

  // do fetch
  await axios.post(
    '/api/v1/posts/public/update', 
    { 
      key: process.env.REACT_APP_ADMIN_ACCESS_PUBLIC,
      post: post,
      user: user 
    }, 
    config
  )
  .then(async res => {
    const result = await res.data.data
    console.log(result)
  })
  .catch(async error => {
    const result = await error.response.data
    // console.log(result.success)
    // console.log(result.error)

    dispatch({
      type: 'SET_ERROR',
      payload: {
        status: !result.success,
        message: result.error
      }
    })
  })

  // do fecth call here
  // to Model - Likestatus: to check whether the user/guest already leave a like this postId
  // await axios.post('/api/v1/posts/public/like', { key: process.env.REACT_APP_ADMIN_ACCESS_PUBLIC, ipv4: await ipv4(), postId: postId, postLikeCount: postLikeCount}, config)
  // .then(async res => {
  //   const result = await res.data.data

  //   // dispatch({
  //   //   type: 'SET_POST',
  //   //   payload: result
  //   // })
  // })
  // .catch(async error => {
  //   const result = await error.response.data

  //   dispatch({
  //     type: 'SET_ERROR',
  //     payload: {
  //       error: true,
  //       message: result.error
  //     }
  //   })
  // })

  // posts.find(post => {
  //   if(post._id === postId) {
  //     if(postOpt === 'add') post.like = post.like + 1
  //     else post.like = post.like - 1
  //   }
  // })
}