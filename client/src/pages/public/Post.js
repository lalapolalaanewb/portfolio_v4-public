import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { usePost } from '../../contexts/Post/Public/PostState'
import { getPost, setLoading, setError, updatePostLikeCount } from '../../contexts/Post/Public/PostAction'
import { checkGuestExist, updateGuestInfo } from '../../Utils/likes/likes'
import { numberFormatting } from '../../Utils/formatting/numberFormatting'
import { DisqusCommentSection } from '../../components/global/Disqus'
import ReactMarkDown from 'react-markdown'
import Markdown from '../../components/global/Markdown'
import { MarkDownStyles } from '../../components/global/Markdown'
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, RedditShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import classNames from 'classnames'
import { makeStyles, useTheme } from '@material-ui/styles'
import { Tooltip, Typography, Zoom } from '@material-ui/core'
import { FaTimes, FaFacebookSquare, FaLinkedin, FaRedditSquare, FaTelegramPlane, FaTwitterSquare, FaWhatsappSquare } from 'react-icons/fa'
import { AiOutlineLike, AiFillLike, AiFillMail } from 'react-icons/ai'

// import { Comments } from '../../components/Blog/Public/Comments'
// import '../../components/Blog/Public/Post.css'
// import { CommentsState } from '../../contexts/Comments/CommentsState'

const Post = () => {
  const [postState, postDispatch] = usePost()
  const { post, loading, error, message } = postState

  // page specific state & functions
  const classes = useStyles()
  const theme = useTheme()
  const { markdownStyles } = MarkDownStyles()
  const { id } = useParams()
  const shareUrl = window.location.href
  const [guestId, setGuestId] = useState('')
  const [isRegister, setIsRegister] = useState(false)

  const [guestData, setGuestData] = useState({})
  const [isLikePost, setIsLikePost] = useState(false)
  const [isLikedPost, setIsLikedPost] = useState(false)

  const [isLikePostOpt, setIsLikePostOpt] = useState('')
  const [likePostCount, setLikePostCount] = useState(0)
  const [likePosts, setLikePosts] = useState([])

  // handle checking user existance
  // const checkUserExistance = async() => {
  //   let { statusRegister, uid, message } = await checkUserExist()

  //   if(!statusRegister && message !== null) {
  //     return setError(postDispatch, { status: true, message: message })
  //   } else {
  //     console.log('Status:' + statusRegister)
  //     console.log('Uid:' + uid)
  //     setIsRegister(statusRegister)
  //     setGuestId(uid)
  //   }
  // }

  // handle creating new user
  // const createNewUser = async(userEmail, userName, statusOpt) => {
  //   let { statusRegister, uid, message } = await saveNewUser(userEmail, userName, statusOpt)
    
  //   if(!statusRegister) {
  //     return setError(postDispatch, { status: true, message: message })
  //   } else {
  //     console.log('Status:' + statusRegister)
  //     console.log('Uid:' + uid)
  //     setIsRegister(statusRegister)
  //     setGuestId(uid)
  //   }
  // }

  // fetch post
  useEffect(() => {
    (async() => {
      // fetch single post
      await getPost(postDispatch, id)

      // get guest data
      let guest = await checkGuestExist()
      setGuestData(guest)
      
      // update liked post status
      let selected = guest.likes.posts.find(post => post._id === id)
      if(selected) setIsLikedPost(() => selected.status === true ? true : false)

      // check if user exists
      // await checkUserExistance()

      setLoading(postDispatch, false)
    })();
  }, [])

  // handle post like count
  useEffect(() => {
    (async() => {
      if(isLikePost) {
        // if(!isRegister || guestId === '') {
        //   await createNewUser('', 'guest', 'likePost')
        // }
        // await updatePostLikeCount( postDispatch, id, likePostCount, isLikePostOpt)
        
        // checker to check if post exist
        let checker = false
        // update current guest posts data
        guestData.likes.posts.forEach(post => {
          if(post._id === id) {
            post.status = !post.status
            // set to true if post successfully found and updated
            checker = true
          }
        })
        if(checker) { 
          await updateGuestInfo(guestData)
          let selected = guestData.likes.posts.find(post => post._id === id)
          /** update redis */
          await updatePostLikeCount(postDispatch, selected, guestData.user) 
        }
        else {
          // push new post data
          guestData.likes.posts.push({ _id: id, status: true })
          await updateGuestInfo(guestData)

          /** update redis */
          await updatePostLikeCount(postDispatch, { _id: id, status: true }, guestData.user)
        }

        setLoading(postDispatch, false)
        setIsLikePost(false)
      }
    })();
  }, [isLikePost])

  return (
    <>
      {/* {JSON.stringify(post) !== '{}' && ( */}
      {post && (
        // <div className={lightBg ? 'post__section' : 'post__section darkBg'}>
        //   <div className="post__wrapper">
        //     {loading && <div className="lds-hourglass"></div>}
        //     {error && (
        //       <div className="error__container">
        //         <FaTimes size={20} className="error__btn" 
        //           onClick={() => setError(postDispatch, {status: false, message: ''})} 
        //         />
        //         <p className="error__message message__break">{message}</p>
        //       </div>
        //     )}
        //     <div className="post__container">
        //       <div className="post__info">
        //         <img src={`/images/${post.imgSrc}`} alt={`${post.title}`}/>
        //         <h1 className={lightBg ? 'post__title' : 'post__title light-title'}>{post.title}</h1>
        //         <div className="post__features">
        //           <div className="feature__dates">
        //             <p className={lightBg ? '' : 'light-dates'}><span>Published on: </span>{new Date(post.publishedAt).toDateString()}</p>
        //             <p className={lightBg ? '' : 'light-dates'}><span>Last updated on: </span>{new Date(post.publishedAt).toDateString()}</p>
        //           </div>
        //           <p className="feature__tech">MySql</p>
        //         </div>
        //         <div className={lightBg ? 'post__description' : 'post__description light-description'}>
        //           Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        //         </div>
        //         <p className="post__likes">
        //           {likePosts.includes('userId or email/ip address') ? 
        //             <AiFillLike size={22} 
        //               onClick={() => {
        //                 setLikePosts(() => likePosts.filter(like => like !== 'userId or email/ip address'))
        //               }} 
        //             /> 
        //             : 
        //             <AiOutlineLike size={22} 
        //               onClick={() => {
        //                 setLikePosts([...likePosts, 'userId or email/ip address'])
        //               }} 
        //             />
        //           }
        //           {` `}
        //           <span>{numberFormatting(+post.like)}</span> {+post.like > 1 ? 'likes' : 'like'}
        //         </p>
        //       </div>
        //       <CommentsState>
        //         <div className="post__comment">
        //           <Comments postId={post._id} />
        //         </div>
        //       </CommentsState>
        //     </div>
        //   </div>
        // </div>
        <div className={classes.section}>
          <div className={classes.wrapper}>
            {loading && <div className="lds-hourglass"></div>}
            {error && (
              <div className="error__container">
                <FaTimes size={20} className="error__btn" 
                  onClick={() => setError(postDispatch, {status: false, message: ''})} 
                />
                <p className="error__message message__break">{message}</p>
              </div>
            )}
            <div className={classes.container}>
              <img src={`/images/${post.imgSrc}`} alt={`${post.title}`}/>
              {/* <h1 className={classes.title}>{post.title}</h1> */}
              <Typography variant="h4" className={classes.title} style={{fontWeight: 600}}>{post.title}</Typography>
              <div className={classes.features}>
                <div className={classes.feature__dates}>
                <Typography variant="body1"><span>Created by: </span>{post.creator.name.nickName}</Typography>
                  <Typography variant="body1"><span>Published on: </span>{new Date(post.publishedAt).toDateString()}</Typography>
                  <Typography variant="body1"><span>Last updated on: </span>{new Date(post.createdAt).toDateString()}</Typography>
                </div>
                <Typography variant="body1" className={classes.feature__tech}>{post.tech.name}</Typography>
              </div>
              <div className={theme.palette.type === 'light' ? classNames(classes.description, markdownStyles.mdContainer, markdownStyles.mdContainerDark) : classNames(classes.description, markdownStyles.mdContainer, markdownStyles.mdContainerLight)}>
                {post.description !== '' ? <ReactMarkDown source={post.description} renderers={{ code: Markdown }}/> : 'none'}
              </div>
              <div className={classes.likeAndShare}>
                <p className={classes.likes}>
                  {/* {likePosts.includes(post._id) ? 
                    <AiFillLike size={22} style={{cursor: 'pointer'}} 
                      onClick={() => {
                        setLikePosts(() => likePosts.filter(like => like !== guestId))
                        setIsLikePostOpt('minus')
                        setLikePostCount(post.like)
                        setIsLikePost(true)
                      }} 
                    /> 
                    : 
                    <AiOutlineLike size={22} style={{cursor: 'pointer'}}
                      onClick={() => {
                        setLikePosts([...likePosts, guestId])
                        setIsLikePostOpt('add')
                        setLikePostCount(post.like)
                        setIsLikePost(true)
                      }} 
                    />
                  } */}
                  {isLikedPost === true ? 
                    <>
                      <AiFillLike size={22} style={{cursor: 'pointer'}} 
                        onClick={() => {
                          setIsLikedPost(!isLikedPost)
                          setIsLikePost(true)
                        }} 
                      /> {' Liked!'}
                    </> 
                    : 
                    <>
                      <AiOutlineLike size={22} style={{cursor: 'pointer'}}
                        onClick={() => {
                          setIsLikedPost(!isLikedPost)
                          setIsLikePost(true)
                        }} 
                      /> {' Please like :-)'}
                    </>
                  }
                  {/* {` `}
                  <span>{numberFormatting(+post.like)}</span> {+post.like > 1 ? 'likes' : 'like'} */}
                </p>
                <ul className={classes.share}>
                  <li>
                    <Tooltip TransitionComponent={Zoom} title="Email Share" placement="bottom">
                      <EmailShareButton 
                        url={shareUrl}
                        subject={post.title}
                      >
                        <AiFillMail size={24} className={classNames(classes.iconShare, classes.mail)} />
                      </EmailShareButton>
                    </Tooltip>
                  </li>
                  <li>
                    <Tooltip TransitionComponent={Zoom} title="Facebook Share" placement="bottom">
                      <FacebookShareButton 
                        url={shareUrl}
                        quote={post.title}
                      >
                        <FaFacebookSquare size={24} className={classNames(classes.iconShare, classes.facebook)} />
                      </FacebookShareButton>
                    </Tooltip>
                  </li>
                  <li>
                    <Tooltip TransitionComponent={Zoom} title="LinkedIn Share" placement="bottom">
                      <LinkedinShareButton 
                        url={shareUrl}
                        title={post.title}
                      >
                        <FaLinkedin size={24} className={classNames(classes.iconShare, classes.linkedIn)} />
                      </LinkedinShareButton>
                    </Tooltip>
                  </li>
                  <li>
                    <Tooltip TransitionComponent={Zoom} title="Reddit Share" placement="bottom">
                      <RedditShareButton 
                        url={shareUrl}
                        title={post.title}
                      >
                        <FaRedditSquare size={24} className={classNames(classes.iconShare, classes.reddit)} />
                      </RedditShareButton>
                    </Tooltip>
                  </li>
                  <li>
                    <Tooltip TransitionComponent={Zoom} title="Telegram Share" placement="bottom">
                      <TelegramShareButton 
                        url={shareUrl}
                        title={post.title}
                      >
                        <FaTelegramPlane size={24} className={classNames(classes.iconShare, classes.telegram)} />
                      </TelegramShareButton>
                    </Tooltip>
                  </li>
                  <li>
                    <Tooltip TransitionComponent={Zoom} title="Twitter Share" placement="bottom">
                      <TwitterShareButton 
                        url={shareUrl}
                        title={post.title}
                      >
                        <FaTwitterSquare size={24} className={classNames(classes.iconShare, classes.twitter)} />
                      </TwitterShareButton>
                    </Tooltip>
                  </li>
                  <li>
                    <Tooltip TransitionComponent={Zoom} title="Whatsapp Share" placement="bottom">
                      <WhatsappShareButton 
                        url={shareUrl}
                        title={post.title}
                      >
                        <FaWhatsappSquare size={24} className={classNames(classes.iconShare, classes.whatsapp)} />
                      </WhatsappShareButton>
                    </Tooltip>
                  </li>
                </ul>
              </div>
              <div className={classes.comment}>
                {/* <DiscussionEmbed 
                  shortname={shortName} 
                  config={{
                    identifier: post._id,
                    url: shareUrl,
                    title: post.title,
                  }} 
                /> */}
                <DisqusCommentSection id={post._id} title={post.title} shareUrl={shareUrl}/>
              </div>
              {/* <CommentsState>
                <div className={classes.comment}>
                  <Comments 
                    postId={post._id}
                    postUrl={`https://lalapolalaanewb.com/blog/${post.id}`}
                    postTitle={post.title} 
                  />
                </div>
              </CommentsState> */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Post

const useStyles = makeStyles((theme) => ({
  section: {
    /* border: 1px solid red; */
    position: 'relative',
    padding: '6.25rem 0 6.25rem 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  wrapper: {
    /* border: 1px solid blue; */
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    width: '100%',
    maxWidth: '1300px',
    paddingRight: '50px',
    paddingLeft: '50px',
    [theme.breakpoints.down('md')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  container: {
    /* border: 1px solid red; */
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: '901px',
    padding: '0 50px',
    '& img': {
      width: '100%',
      height: 'auto',
      border: `3px solid ${theme.palette.secondary.main}`,
    },
    [theme.breakpoints.down('md')]: {
      padding: '0 15px',
    }
  },
  title: {
    marginTop: '50px',
    alignSelf: 'flex-start',
  },
  features: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: '20px',
    marginBottom: '30px',
  },
  feature__dates: {
    '& p:last-child': {
      marginBottom: '5px',
      // margin: 0,
    },
    '& span': {
      fontWeight: 600,
      color: theme.palette.secondary.main,
    }
  },
  feature__tech: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '5px',
    padding: '8px 12px',
  },
  description: {
    width: '100%',
    marginBottom: '40px',
  },
  likeAndShare: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  likes: {
    alignSelf: 'flex-start',
    width: '150px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    color: theme.palette.secondary.main,
    '& span': {
      fontWeight: 600,
    }
  },
  share: {
    // marginTop: '1rem',
    listStyle: 'none',
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'center',
    '& li:not(:last-child)': {
      marginRight: '0.25rem',
    },
  },
  iconShare: {
    transition: theme.transitions.create(['all'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.short,
    }),
  },
  mail: {
    '&:hover': {
      fill: theme.palette.secondary.main
    }
  },
  facebook: {
    '&:hover': {
      fill: '#3b5998'
    }
  },
  linkedIn: {
    '&:hover': {
      fill: '#0e76a8'
    }
  },
  reddit: {
    '&:hover': {
      fill: '#ff4500'
    }
  },
  telegram: {
    '&:hover': {
      fill: '#0088cc'
    }
  },
  twitter: {
    '&:hover': {
      fill: '#00acee'
    }
  },
  whatsapp: {
    '&:hover': {
      fill: '#25d366'
    }
  },
  comment: {
    /* border: 1px solid blue; */
    width: '100%',
    // display: 'flex',
    // flexFlow: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: '50px',
    marginTop: '40px',
    backgroundColor: theme.palette.lighten.dark,
    [theme.breakpoints.down('md')]: {
      padding: '15px',
    },
  },
}))