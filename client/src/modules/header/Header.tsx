import Container from '../../components/Container/Container'
import watermarkIcon from './imgs/watermark.png'
import './Header.scss'

export default function Header() {

    return (
        <header className='header'>
            <Container>
                <h2 className="header__title">
                    <img src={watermarkIcon} alt="" />
                    WaterMarkIt
                </h2>
            </Container>
        </header>
    )
}