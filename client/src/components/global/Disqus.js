import React from 'react'
import { DiscussionEmbed } from 'disqus-react'
import { CommentCount } from 'disqus-react'

const shortName = 'lalapolalaanewb'

export const DisqusCommentSection = ({ id, title, shareUrl }) => {
  return (
    <DiscussionEmbed 
      shortname={shortName} 
      config={{
        identifier: id,
        url: shareUrl,
        title: title,
      }} 
    />
  )
}

export const DisqusCommentCount = ({ id, title, shareUrl, origin }) => {
  return (
    <CommentCount
      shortname={shortName}
      config={{
        identifier: id,
        url: shareUrl + '/' + id,
        title: title,
      }}
    >
      {`calculating... `}
      {origin !== '' ? 'comments' : ''}
    </CommentCount>
  )
}