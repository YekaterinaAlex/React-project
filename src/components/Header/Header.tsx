'use client';
import { useTranslations } from 'next-intl';

import {
  StyledHeader,
  StyledNav,
  StyledLinks,
  StyledLink,
  StyledButton,
} from './Header.styled';
import { useTheme } from '../../context/useTheme';

function Header() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('Navigation');
  return (
    <StyledHeader>
      <StyledNav>
        <StyledLinks>
          <StyledLink href="/">{t('home')}</StyledLink>

          <StyledLink href="/about">{t('about')}</StyledLink>
        </StyledLinks>

        <StyledButton onClick={toggleTheme}>{theme}</StyledButton>
      </StyledNav>
    </StyledHeader>
  );
}

export default Header;
