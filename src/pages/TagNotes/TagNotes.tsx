import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import { Note } from '../../types/note'
import { Container, EmptyMsgBox } from '../../styles/styles'
import { MainWrapper } from '../../components'

const TagNotes = () => {
  const {name} = useParams() as {name: string}
  // name인 이유는 App.tsx에서 
  // <Route path='/tag/:name' element={<TagNotes />} />
  // 여기 :name이라고 해줬기 때문이다
  // a.name === "coding"
  const {mainNotes} = useAppSelector((state) => state.notesList)
  const notes: Note[] = []
  mainNotes.forEach((note) => {
    if (note.tags.find(({tag}) => tag === name)) {
      notes.push(note)
    }
  })
  return (
    <Container>
      {notes.length === 0 ? <EmptyMsgBox>노트가 없습니다.</EmptyMsgBox> : <MainWrapper notes={notes} type={name} />}
    </Container>
  )
}

export default TagNotes