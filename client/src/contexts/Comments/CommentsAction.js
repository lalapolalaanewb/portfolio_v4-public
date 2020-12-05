import { getCookie, setCookie } from "../../services/Cookie"
import { v4 as uuid } from 'uuid'
import axios from 'axios'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { error: error.status, message: error.message } })

const imgSrc = 'blog_gettingStartedOnSelfOwnWeb_0.png'
const excerpt = `It is a long established  sometimes by accident`
const oneDay = 1000*60*60*24
const publishedAt = (day) => new Date(Date.now() + (oneDay * +day)).toLocaleDateString()
const posts = [
  { _id: 1, title: 'Post 1 kd jdshgf jhd sfjh hdgf', like: 1, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(5), tech: {_id: 1, name: 'Html'}, comments: []},
  { _id: 2, title: 'Post 2', like: 2, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(4), tech: {_id: 2, name: 'Css|Scss'}, comments: []},
  { _id: 3, title: 'Post 3', like: 3, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(3), tech: {_id: 5, name: 'Vanilla JavaScript'}, comments: []},
  { _id: 4, title: 'Post 4', like: 4, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(2), tech: {_id: 4, name: 'NodeJs'}, comments: []},
  { _id: 5, title: 'Post 5', like: 5, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(1), tech: {_id: 3, name: 'Yii2'}, comments: []},
  { _id: 6, title: 'Post 6', like: 6, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(10), tech: {_id: 6, name: 'Sql'}, comments: []},
  { _id: 7, title: 'Post 7 Title Should Be Here', like: 7, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(9), tech: {_id: 7, name: 'MySql'}, comments: [{ _id: 1, name: 'Lalapolalaa Newb', user: { guest: 'rookiegamer4life@gmail.com', registered: '1aaa' }, message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`, like: 7, updatedAt: publishedAt(2), createdAt: publishedAt(3) }, { _id: 2, name: 'Fathi Noor', user: { guest: 'mfmn1993@gmail.com', registered: '1bbb' }, message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`, like: 1, updatedAt: publishedAt(1), createdAt: publishedAt(2) }]},
  { _id: 8, title: 'Post 8', like: 8, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(8), tech: {_id: 8, name: 'MongoDB'}, comments: []},
  { _id: 9, title: 'Post 9', like: 9, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(7), tech: {_id: 9, name: 'Firebase'}, comments: []},
  { _id: 10, title: 'Post 10', like: 10, imgSrc: imgSrc, excerpt: excerpt, publishedAt: publishedAt(6), tech: {_id: 10, name: 'React'}, comments: []}
]

// Set Comments
export const getComments = async(dispatch, postId) => {
  setLoading(dispatch, true)

  // fetch a post

  // find desired post
  const change2Obj = () => {
    const filteredPost = posts.filter(post => post._id == postId)

    let container = []

    filteredPost.map(post => {
      container = post.comments
    })
    
    return container
  }
  let pp = change2Obj()
  console.log(pp)

  dispatch({
    type: 'SET_COMMENTS',
    payload: pp
  })
} 

// Add New Comment
export const addComment = async(dispatch, comment, postId) => {
  // setLoading(dispatch, true)

  let commentId = uuid() // temporary

  // get current user: guest cookie
  let guest = getCookie('guest')

  if(!guest) {
    console.log('add comment: xde cookie')
    return dispatch({
      type: 'SET_ERROR',
      payload: {
        status: true,
        message: 'Having trouble adding your comment. Please try again later.'
      }
    })
  }

  // should do fetch post (adding new comment)
  let newComment = {
    _id: commentId,
    name: comment.name,
    user: { guest: comment.email, registered: guest.uid },
    message: comment.message,
    like: 0,
    post: postId,
    createdAt: publishedAt(6),
    publishedAt: publishedAt(6)
  }
  console.log('adding comment')
  
  dispatch({
    type: 'ADD_COMMENT',
    payload: newComment
  })
}

// Update Comment
export const updateComment = async(comments, comment, commentId) => {
  comments.find(c => {
    if(c._id === commentId) {
      c.name = comment.name
      c.user.guest = comment.email
      c.message = comment.message
    }
  })
}

// Delete Comment
export const deleteComment = async(dispatch, commentId) => {
  // get current user: guest cookie
  let guest = getCookie('guest')

  if(!guest) {
    return dispatch({
      type: 'SET_ERROR',
      payload: {
        status: true,
        message: 'Having trouble deleting your comment. Please try again later.'
      }
    })
  }

  console.log('deleting')
  dispatch({
    type: 'DELETE_COMMENT',
    payload: commentId
  })
}

// Update Comment Likes
export const updateCommentLikeCount = async( dispatch, postId, commentId, commentOpt) => {
  setLoading(dispatch, true)

  // get current user: guest cookie
  let guest = getCookie('guest')

  if(!guest) {
    console.log('update like comment: xde cookie')
    return dispatch({
      type: 'SET_ERROR',
      payload: {
        status: true,
        message: 'Having trouble updating liking a comment. Please try again later.'
      }
    })
  }

  // for local purposes only
  // find desired post
  const change2Obj = () => {
    const filteredPost = posts.filter(post => post._id == postId)

    let container = []

    filteredPost.map(post => {
      container = post.comments
    })
    
    return container
  }
  let pp = change2Obj()

  // do fecth call here
  pp.comments.find(c => {
    if(c._id === commentId) {
      if(commentOpt === 'add') c.like = c.like + 1
      else c.like = c.like - 1
    }
  })
}