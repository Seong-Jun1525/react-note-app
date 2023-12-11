import React from 'react'
import { Container, StyledNav } from './Navbar.styles'
import { ButtonFill } from '../../styles/styles'
import { FiMenu } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux'
import { toggleMenu } from '../../store/menu/menuSlice'
import { toggleCreateNoteModal } from '../../store/modal/modalSlice'
import getStandardName from '../../utils/getStandardName'

const Navbar = () => {
  const dispatch = useAppDispatch()

  const { pathname, state } = useLocation()
  console.log(pathname)
  console.log(state)

  if(pathname === '/404') {
    return null
  }

  return (
    <StyledNav>
      <div className='nav__menu'>
        <FiMenu onClick={() => dispatch(toggleMenu(true))} />
      </div>
      <Container>
        <div className='nav__page-title'>{getStandardName(state)}</div>

        {state !== "Trash" && state !== "Archive" && (
          <ButtonFill
            className='nav__btn'
            onClick={() => dispatch(toggleCreateNoteModal(true))}
          >
            <span>+</span>
          </ButtonFill>
        )}
      </Container>
    </StyledNav>
  )
}

export default Navbar