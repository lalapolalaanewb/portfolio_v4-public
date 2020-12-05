import React, { useEffect, useRef, useState } from 'react'
import { numberFormatting } from '../../../Utils/formatting/numberFormatting'
import { FaTimes, FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin7Line } from 'react-icons/ri'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { getComments, updateComment, deleteComment, setLoading, setError, addComment, getCurrCookie, updateCommentLikeCount } from '../../../contexts/Comments/CommentsAction'
import { useComments } from '../../../contexts/Comments/CommentsState'
import { saveNewUser } from '../../../contexts/Auth/AuthAction'

export const Comments = ({ postId, postUrl, postTitle }) => {
  const [commentsState, commentsDispatch] = useComments()
  const { comments, loading, error, message } = commentsState

  // page specific state & functions
  const [commenterName, setCommenterName] = useState('')
  const [commenterEmail, setCommenterEmail] = useState('')
  const [commenterMessage, setCommenterMessage] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const [isReadMore, setIsReadMore] = useState([])
  const [isLikeComment, setIslIkeComment] = useState(false)
  const [isLikeCommentOpt, setIsLikeCommentOpt] = useState('')
  const [likedComments, setLikedComments] = useState([])
  const [commenterId, setCommenterId] = useState('')
  const editForm = useRef(null)
  const inputNameFocus = useRef(null)
  const [isEdit, setIsEdit] = useState(false)
  const [isConfirm, setIsConfirm] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [guestId, setGuestId] = useState('')

  // handle fetching of comments
  useEffect(() => {
    (async() => {
      await getComments(commentsDispatch, postId)

      setLoading(commentsDispatch, false)
    })();
  }, [])

  // handle creating new user
  const createNewUser = async(commenterEmail, commenterName, statusOpt) => {
    let { statusRegister, uid, message } = await saveNewUser(commenterEmail, commenterName, statusOpt)
    
    if(!statusRegister) {
      return setError(commentsDispatch, { status: true, message: message })
    } else {
      console.log('Status:' + statusRegister)
      console.log('Uid:' + uid)
      setIsRegister(statusRegister)
      setGuestId(uid)
    }
  }

  // handle adding new comemnt
  useEffect(() => {
    (async() => {
      if(isSubmit) {
        setLoading(commentsDispatch, true)

        await createNewUser(commenterEmail, commenterName, 'addComment')
        await addComment(
          commentsDispatch,
          {
            name: commenterName,
            email: commenterEmail,
            message: commenterMessage
          }, 
          postId
        )

        setLoading(commentsDispatch, false)
        setCommenterName('')
        setCommenterEmail('')
        setCommenterMessage('')
        setIsSubmit(false)
      }
    })();
  }, [isSubmit])

  // handle updating existing comemnt
  useEffect(() => {
    (async() => {
      if(isConfirm) {
        await updateComment(
          comments,
          {
            name: commenterName,
            email: commenterEmail,
            message: commenterMessage
          }, 
          commenterId
        )
  
        setLoading(commentsDispatch, false)
        setCommenterName('')
        setCommenterEmail('')
        setCommenterMessage('')
        setCommenterId('')
        setIsConfirm(false)
        setIsEdit(false)
      }
    })();
  }, [isConfirm])

  // handle deleting a comemnt
  useEffect(() => {
    (async() => {
      if(isDelete) {
        await deleteComment(commentsDispatch, commenterId)
  
        setLoading(commentsDispatch, false)
        setCommenterId('')
        setIsDelete(false)
      }
    })();
  }, [isDelete])

  // handle comment like count
  useEffect(() => {
    (async() => {
      if(isLikeComment) {
        await createNewUser('', 'guest', 'likeComment')
        await updateCommentLikeCount( commentsDispatch, postId, commenterId, isLikeCommentOpt)

        setLoading(commentsDispatch, false)
        setCommenterId('')
        setIsLikeCommentOpt('')
        setIslIkeComment(false)
      }
    })();
  }, [isLikeComment])

  return (
    <>
      {loading && <div className="lds-hourglass dark-ver"></div>}
      {error && (
        <div className="error__container">
          <FaTimes size={20} className="error__btn" 
            onClick={() => setError(commentsDispatch, {status: false, message: ''})} 
          />
          <p className="error__message message__break">{message}</p>
        </div>
      )}
      <form ref={editForm} className="comment__form"
        onSubmit={(e) => {
          e.preventDefault()
          if(isEdit) setIsConfirm(true)
          else setIsSubmit(true)
        }}
      >
        <div className="form__group">
          <div className="form__label">Name</div>
          <input ref={inputNameFocus} type="text" placeholder="Type your name here..."
            value={commenterName}
            onChange={(e) => setCommenterName(e.target.value)}
          required/>
        </div>
        <div className="form__group">
          <div className="form__label">Email</div>
          <input type="email" placeholder="Type your email here..."
            value={commenterEmail}
            onChange={(e) => setCommenterEmail(e.target.value)}
          required/>
        </div>
        <div className="form__group">
          <div className="form__label">Message</div>
          <textarea rows="5" placeholder="Type your message here"
            value={commenterMessage}
            onChange={(e) => setCommenterMessage(e.target.value)}
          required></textarea>
        </div>
        <div className="form__actions">
          {isEdit && <button type="button" className="comment__btn-cancel"
            onClick={() => {
              setCommenterName('')
              setCommenterEmail('')
              setCommenterMessage('')
              setCommenterId('')
              setIsEdit(false)
            }}
          >Cancel</button>}
          <button type="button" className="comment__btn-refresh"
            onClick={() => {
              setCommenterName('')
              setCommenterEmail('')
              setCommenterMessage('')
            }}
          >Refresh</button>
          <button type="submit" className="comment__btn-submit">
            {isEdit ? 'Confirm' : 'Submit'}
          </button>
        </div>
      </form>
      {comments.length > 0 && (comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))).map(comment => (
        <div key={comment._id} className="comment__info">
          {(isEdit && commenterId === comment._id) && (
            <div className="comment__overlay">
              <p>Edit your comment in the form section above</p>
            </div>
          )}
          <div className="comment__top">
            <div className="comment__credentials">
              <p className="commenter__name">{comment.name}</p>
              <p className="commenter__email">{comment.user.guest}</p>
              <p className="comment__date">{comment.createdAt}</p>
            </div>
            {isRegister ? (
              <>
                {guestId === comment.user.registered ? (
                  <>
                    <div className="comment__actions">
                      <FaRegEdit size={30} style={{fill: '#49beb7', cursor: 'pointer'}} 
                        onClick={() => {
                          setCommenterName(comment.name)
                          setCommenterEmail(comment.user.guest)
                          setCommenterMessage(comment.message)
                          setCommenterId(comment._id)
                          setIsEdit(true)
                          window.scrollTo({ top: editForm.current.offsetTop, behavior: 'auto' })
                          inputNameFocus.current.focus()
                        }}
                      />
                      <RiDeleteBin7Line size={30} style={{fill: '#fd3f3f', cursor: 'pointer'}} 
                        onClick={() => {
                          // setCommenterEmail(comment.user.guest)
                          setCommenterId(comment._id)
                          setIsDelete(true)
                        }}
                      />
                    </div>
                  </>
                ) : <p>no guest id</p>}
              </>
            ) : <p>not register yet</p>}
          </div>
          <p className={isReadMore.includes(comment._id) ? 'comment__message' : 'comment__message truncated'}>
            {comment.message}
          </p>
          <div className="comment__misc">
            <p className="comment__likes">
              {likedComments.includes(comment._id) ? 
                <AiFillLike size={22} 
                  onClick={() => {
                    setLikedComments(() => likedComments.filter(like => like !== comment._id))
                    setCommenterId(comment._id)
                    setIsLikeCommentOpt('minus')
                    setIslIkeComment(true)
                  }} 
                /> 
                : 
                <AiOutlineLike size={22} 
                  onClick={() => {
                    setLikedComments([...likedComments, comment._id])
                    setCommenterId(comment._id)
                    setIsLikeCommentOpt('add')
                    setIslIkeComment(true)
                  }} 
                />
              }
              {` `}
              <span>{numberFormatting(+comment.like)}</span> {+comment.like > 1 ? 'likes' : 'like'}
            </p>
            {isReadMore.includes(comment._id) ? 
              <p className="comment__read-more show-less"
                onClick={() => setIsReadMore(() => isReadMore.filter(cId => cId !== comment._id))}
              >Show less</p> 
              : 
              <p className="comment__read-more"
                onClick={() => setIsReadMore([...isReadMore, comment._id])}
              >Show more</p>
            }
          </div>
        </div>
      ))}
    </>
  )
}