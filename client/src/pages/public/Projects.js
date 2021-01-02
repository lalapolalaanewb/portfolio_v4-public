import React, { useEffect, useState } from 'react'
import { useProjects } from '../../contexts/Projects/Public/ProjectsState'
import { getProjects, setLoading, setError } from '../../contexts/Projects/Public/ProjectsAction'
import { makeStyles } from '@material-ui/core/styles'
import { InputAdornment, TextField } from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search"
import { IconContext } from 'react-icons/lib'
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'
import { BsFilterLeft } from 'react-icons/bs'
import { AiFillCloseSquare } from 'react-icons/ai'
import { MdRefresh } from 'react-icons/md'
import { FaTimes } from 'react-icons/fa'
import { ProjectList } from '../../components/Projects/Public/ProjectList'

const Projects = () => {
  const [projectsState, projectsDispatch] = useProjects()
  const { techList, loading, error, message } = projectsState

  const classes = useStyles()
  const [searchKey, setSearchKey] = useState('')
  const [checkByOld, setCheckByOld] = useState(false)
  const [checkByLatest, setCheckByLatest] = useState(true)
  const [optionCreatedAt, setOptionCreatedAt] = useState('latest')
  const [filterToggle, setFilterToggle] = useState(false)
  const [techFilterList, setTechFilterList] = useState([])

  // handle fetching projects
  useEffect(() => {
    (async() => {
      // fetch projects & techList
      await getProjects(projectsDispatch)

      setLoading(projectsDispatch, false)
    })();
  }, [])

  return (
    <IconContext.Provider value={{color: '#fff', size: 24}}>
      <div className={classes.section}>
        <div className={classes.wrapper}>
          {loading && <div className="lds-hourglass accents-ver"></div>}
          {error && (
            <div className="error__container">
              <FaTimes size={20} className="error__btn" 
                onClick={() => setError(projectsDispatch, {status: false, message: ''})} 
              />
              <p className="error__message message__break">{message}</p>
            </div>
          )}
          <div className={classes.filterContainer}>
            {filterToggle ? (
              <BsFilterLeft size={34} className={classes.filterBtn} style={{display: 'none'}} />
            ) : 
            (
              <BsFilterLeft size={34} className={classes.filterBtn} onClick={() => setFilterToggle(true)} />
            )}
            {filterToggle && <div className={classes.filter}>
              <div className={classes.filter__actions}>
                <MdRefresh size={34} className={classes.filter__btnRefresh} 
                  onClick={() => {
                    setCheckByOld(false)
                    setCheckByLatest(true)
                    setOptionCreatedAt('latest')
                    setTechFilterList([])
                  }}
                />
                <AiFillCloseSquare size={34} className={classes.filter__btnClose} 
                  onClick={() => setFilterToggle(false)}
                />
              </div>
              <h3 className={classes.filter__heading}>Filter by date</h3>
              <ul className={classes.filter__createdAt}>
                <li key={'oldest'} onClick={() => {
                  setCheckByOld(true)
                  setOptionCreatedAt('oldest')
                  setCheckByLatest(false)
                }}>
                  {checkByOld && optionCreatedAt === 'oldest' ? (
                    <>
                      <ImCheckboxChecked size={20} style={{fill: '#ecfffb', marginRight: '0.5rem'}} />
                      Oldest
                    </>
                  ) : (
                    <>
                      <ImCheckboxUnchecked size={20} style={{fill: '#ecfffb', marginRight: '0.5rem'}} />
                      Oldest
                    </>
                  )}
                </li>
                <li key={'latest'} onClick={() => {
                  setCheckByLatest(true)
                  setOptionCreatedAt('latest')
                  setCheckByOld(false)
                }}>
                  {checkByLatest && optionCreatedAt === 'latest' ? (
                    <>
                      <ImCheckboxChecked size={20} style={{fill: '#ecfffb', marginRight: '0.5rem'}} />
                      Latest
                    </>
                  ) : (
                    <>
                      <ImCheckboxUnchecked size={20} style={{fill: '#ecfffb', marginRight: '0.5rem'}} />
                      Latest
                    </>
                  )}
                </li>
              </ul>
              <h3 className={classes.filter__heading}>Filter by tech</h3>
              <ul className={classes.filter__techs}>
                {techList.map(tech => (
                  <li key={tech._id}>
                    {techFilterList.includes(tech._id) ? 
                      <ImCheckboxChecked size={20} style={{fill: '#ecfffb', marginRight: '0.5rem'}} 
                        onClick={() => {
                          // remove from techFilterList array
                          setTechFilterList(() => techFilterList.filter(t => t !== tech._id))
                        }}
                      />
                    : 
                      <ImCheckboxUnchecked size={20} style={{fill: '#ecfffb', marginRight: '0.5rem'}} 
                        onClick={() => {
                          // add to techFilterList array
                          setTechFilterList([...techFilterList, tech._id])
                        }}
                      />
                    }
                    {tech.name}
                  </li>
                ))}
              </ul>
            </div>}
          </div>
          <div className={classes.searchContainer}>
            <TextField
              type="search"
              variant="outlined"
              color="secondary"
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              classes={{root: classes.textField}}
              value={searchKey}
              onChange={e => setSearchKey(e.target.value)}
            />
          </div>
          <div className={classes.projects__container}>
            <ProjectList 
              searchKey={searchKey}
              checkByOld={checkByOld}
              checkByLatest={checkByLatest}
              optionCreatedAt={optionCreatedAt}
              techFilterList={techFilterList}
              setLoading={setLoading}
            />
          </div>
        </div>
      </div>
    </IconContext.Provider>
  )
}

export default Projects

const useStyles = makeStyles((theme) => ({
  section: {
    position: 'relative',
    padding: '6.25rem 0 6.25rem 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  wrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
    width: '100%',
    maxWidth: '1300px',
    paddingRight: '50px',
    paddingLeft: '50px',
    [theme.breakpoints.down('md')]: {
      paddingRight: 10,
      paddingLeft: 10,
    }
  },
  filterToggle: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginTop: '0.5rem',
    marginLeft: '25px',
  },
  filterContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    marginTop: '0.5rem',
    marginLeft: '1.5625rem',
  },
  filterBtn: {
    position: 'sticky',
    fill: theme.palette.lighten.dark,
    top: '20%',
    backgroundColor: theme.palette.secondary.main,
    cursor: 'pointer',
    zIndex: 1,
  },
  filter__actions: {
    position: 'absolute',
    top: 0,
    right: 0,
  },  
  filter__btnClose: {
    cursor: 'pointer'
  },
  filter__btnRefresh: {
    cursor: 'pointer'
  },
  filter: {
    position: 'sticky',
    minWidth: '15rem',
    maxHeight: '31.25rem',
    top: '20%',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.secondary.main,
    overflow: 'scroll',
    zIndex: 1,
  },
  filter__heading: {
    marginBottom: '0.5rem',
    color: theme.palette.lighten.dark
  },
  filter__createdAt: {
    marginBottom: '1.5rem',
    '& li': {
      listStyle: 'none',
      color: theme.palette.common.white,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',  
    },
    '& li:not(.last-child)': {
      marginBottom: '0.25rem'
    }
  },
  filter__techs: {
    '& li': {
      listStyle: 'none',
      color: theme.palette.common.white,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',  
    },
    '& li:not(.last-child)': {
      marginBottom: '0.25rem'
    }
  },
  searchContainer: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    }
  },
  textField: {
    maxWidth: '200px'
  },
  projects__container: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
  },
}))