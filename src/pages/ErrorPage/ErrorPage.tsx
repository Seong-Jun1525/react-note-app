import { Container } from './ErrorPage.styles'
import img from '../../assets/errorImg.png'
import { ButtonFill } from '../../styles/styles'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <div className='error__img'>
        <img src={img} alt='pageNotFound' />
        {/* img를 가져오는 방법은 public 디렉터리에 넣고 src="./--" 방법을 사용하거나 */}
        {/* import해서 url을 통해 가져오는 방법이 있다 */}
      </div>
      <div className='error__text'>
        <h1>404</h1>
        <div>에러가 발견되었습니다.</div>
        <ButtonFill onClick={() => navigate('/')}>
          <span>메인페이지로 돌아가기</span>
        </ButtonFill>
      </div>
    </Container>
  )
}

export default ErrorPage