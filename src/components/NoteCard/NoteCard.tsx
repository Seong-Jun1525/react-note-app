import React from 'react'
import { Card, ContentBox, FooterBox, TagsBox, TopBox } from './NoteCard.styles'
import { NotesIconBox } from '../../styles/styles'
import { BsFillPinFill } from "react-icons/bs";
import { Note } from '../../types/note';
import { useAppDispatch } from '../../hooks/redux';
import getRelevantBtns from '../../utils/getRelevantBtns';
import { setPinnedNotes } from '../../store/notesList/notesListSlice';

interface NoteCardProps {
  note: Note,
  type: string
}

const NoteCard = ({note, type}: NoteCardProps) => {
  const dispatch = useAppDispatch()
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
            <NotesIconBox
              className='noteCard__pin'
              onClick={() => dispatch(setPinnedNotes({id}))}
            >
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
        <div>
          {getRelevantBtns(type, note, dispatch)}
        </div>
      </FooterBox>
    </Card>
  )
}

export default NoteCard