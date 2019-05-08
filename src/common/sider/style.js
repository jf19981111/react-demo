import styled from 'styled-components'
import LogoPic from '@/assets/avator.png'

export const Logo = styled.a.attrs({
    href: '#/'
})`
    display: block;
    width: 80%;
    height: 134px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 5px;
    background-image: url(${LogoPic});
    background-repeat: no-repeat;
    background-position: center;
`
