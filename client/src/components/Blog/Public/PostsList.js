import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { usePosts } from '../../../contexts/Posts/Public/PostsState'
import Paginate from '../../global/Paginate'
import { numberFormatting } from '../../../Utils/formatting/numberFormatting'
import { DisqusCommentCount } from '../../global/Disqus'
import classNames from 'classnames'
import { makeStyles, useTheme } from '@material-ui/styles'
import { ButtonBase, Grid, Paper, Typography } from '@material-ui/core'

export const PostsList = ({ searchKey, checkByOld, checkByLatest, optionCreatedAt, techFilterList }) => {
  const [postsState, postsDispatch] = usePosts()
  const { posts } = postsState

  // page specific states & functions
  const classes = useStyles()
  const theme = useTheme()
  const shareUrl = window.location.href
  const [filteredPosts, setFilteredPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(5)
  const [postPerGroup, setPostPerGroup] = useState(5)
  const [pageNumber, setPageNumber] = useState(1)
  const history = useHistory()

  // handle go to page
  const goToPage = pathUrl => {
    history.push(pathUrl)
  }

  // handle getting page num
  const getPageNum = (posts) => {
    let pageNum = (() =>{
      let num = posts.length / postsPerPage
      if(Math.round(num) < 1) return num = 1
      return Math.ceil(num)
    })()

    return pageNum
  }

  // handle searching of posts
  const search = (posts, value) => {
    return posts.filter(
      post => post.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

  // handle sorting of posts
  const sorting = (posts, status, order) => {
    let latest2Old = [], postsInitial = []

    if(!status) postsInitial = posts
    else postsInitial = posts.filter(post => techFilterList.includes(post.tech._id))

    if(order === 'oldest') latest2Old = postsInitial.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt))
    else latest2Old = postsInitial.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

    return latest2Old
  }

  const handleFiltering = (posts, searchKey, checkByOld, checkByLatest, optionCreatedAt, techFilterList) => {
    let postsFilter = search(posts, searchKey)

    if(checkByOld || checkByLatest) {
      if(optionCreatedAt === 'oldest') {
        if(techFilterList <= 0) return setFilteredPosts(() => sorting(postsFilter, false, 'oldest'))
        setFilteredPosts(() => sorting(postsFilter, true, 'oldest'))
      } else {
        if(techFilterList <= 0) return setFilteredPosts(() => sorting(postsFilter, false, 'latest'))
        setFilteredPosts(() => sorting(postsFilter, true, 'latest'))
      }
    } else setFilteredPosts(() => sorting(postsFilter, false, 'latest'))
  }

  // set current data
  useEffect(() => {
    (() => {
      if(posts) {
        setPageNumber(() => getPageNum(posts))
        setFilteredPosts(() => {
          let postsFilter = search(posts, '')
          return sorting(postsFilter, false, 'latest')
        })
      }
    })()
  }, [posts, postsPerPage])

  // handle filter
  useEffect(() => { 
    handleFiltering(posts, searchKey, checkByOld, checkByLatest, optionCreatedAt, techFilterList)
  }, [searchKey, checkByOld, checkByLatest, optionCreatedAt, techFilterList])

  // handle pagination
  const pagination = () => {
    let times = 2
    let totalData = posts.length
    let groupNum = []

    groupNum.push(postPerGroup)
    for(let i = 0; i < times; i++) {
      if((postPerGroup * (i + 2)) < totalData) groupNum.push(postPerGroup * (i + 2))
    }
    groupNum.push(totalData)

    return <Paginate 
      pageNumber={pageNumber} 
      currentPage={currentPage} setCurrentPage={setCurrentPage}
      dataPerPage={postsPerPage} setDataPerPage={setPostsPerPage}
      groupNum={groupNum}
    />
  }

  return (
    <>
      {pagination()}
      {filteredPosts.length > 0 && filteredPosts
      .slice((currentPage * postsPerPage) - postsPerPage, currentPage * postsPerPage)
      .map(post => (
        <Paper key={post._id} className={theme.palette.type === 'light' ? classes.paper : classNames(classes.paper, classes.paperLight)}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image} onClick={() => goToPage(`/blog/${post._id}`)}>
                <img className={classes.img} alt={post.title} src={`/images/${post.imgSrc}`} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs={12} container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography variant="h5">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" classes={{ gutterBottom: classes.dateMarginBottom }} gutterBottom>
                    {new Date(post.publishedAt).toDateString()}
                  </Typography>
                  <Typography variant="body2" classes={{ root: classes.excerpt }}>
                    {post.excerpt}
                  </Typography>
                </Grid>
                <Grid item xs container direction="row" className={classes.counts}>
                  <Typography variant="body2" className={classes.likesCount} >
                    <span>{numberFormatting(1000)}</span> Likes
                  </Typography>
                  {/* <Typography variant="body2" color="secondary" className={classNames(classes.commentsCount, classes.cursorPointer)}>
                    <span>{numberFormatting(10)}</span> comments
                  </Typography> */}
                  <DisqusCommentCount id={post._id} title={post.title} shareUrl={shareUrl} origin="postPublic"/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
      {pagination()}
    </>
  )
}


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: '1rem auto',
    width: '100%',
    backgroundColor: theme.palette.grey[100],
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
    transition: theme.transitions.create(['all'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.short,
    }),
  },
  paperLight: {
    '&:hover': {
      backgroundColor: theme.palette.lighten.main,
    },
    backgroundColor: theme.palette.lighten.light
  },
  image: {
    // width: 345,
    // height: 185.15,
    maxWidth: 345,
    maxHeight: 185.15,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  dateMarginBottom: {
    marginBottom: '1rem'
  },
  excerpt: {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 4,
  },
  cursorPointer: {
    cursor: 'pointer'
  },
  counts: {
    color: theme.palette.secondary.main
  },
  likesCount: {
    marginRight: '1rem',
  },
}))