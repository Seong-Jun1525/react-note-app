import React from 'react'
import { Card, ContentBox, FooterBox, TagsBox, TopBox } from './NoteCard.styles'
import { NotesIconBox } from '../../styles/styles'
import { BsFillPinFill } from "react-icons/bs";
import { Note } from '../../types/note';

interface NoteCardProps {
  note: Note,
  type: string
}

const NoteCard = ({note, type}: NoteCardProps) => {
  const {title, content, tags, color, priority, date, isPinned, isRead, id} = note
  return (
    <Card style={{background: color}}>
      <TopBox>
        <div className='noteCard__title'>
          {title.length > 10 ? title.slice(0, 10) + '...' : title}
        </div>
        <div className='noteCard__top-options'>
          <span className='noteCard__priority'>
            {priority}
          </span>
          {type !== "archive" && type !== "trash" && (
            <NotesIconBox className='noteCard__pin'>
              <BsFillPinFill
                style={{color: isPinned ? "red" : ""}}
              />
            </NotesIconBox>
          )}
        </div>
      </TopBox>
      <ContentBox>
        {content}
      </ContentBox>
      <TagsBox>
        {tags.map(({tag, id}) => (
          <span key={id}>{tag}</span>
        ))}
      </TagsBox>
      <FooterBox>
        <div className='noteCard__date'>
          {date}
        </div>
        {getRelevantBtns()}
      </FooterBox>
    </Card>
  )
}

export default NoteCard