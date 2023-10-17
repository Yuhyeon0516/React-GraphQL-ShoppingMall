import { StyledLink } from '../styles/styles';

export default function Gnb() {
    return (
        <nav>
            <ul>
                <li>
                    <StyledLink to={'/'}>홈</StyledLink>
                </li>
                <li>
                    <StyledLink to={'/products'}>상품목록</StyledLink>
                </li>
                <li>
                    <StyledLink to={'/cart'}>장바구니</StyledLink>
                </li>
                <li>
                    <StyledLink to={'/payment'}>결제</StyledLink>
                </li>
                <li>
                    <StyledLink to={'/admin'}>어드민</StyledLink>
                </li>
            </ul>
        </nav>
    );
}
