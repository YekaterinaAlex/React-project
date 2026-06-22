'use client';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useRouter } from '../../i18n/navigation';

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
  const locale = useLocale();
  const router = useRouter();

  const handleLanguageChange = () => {
    const nextLocale = locale === 'en' ? 'ru' : 'en';

    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;
    router.refresh();
  };
  return (
    <StyledHeader>
      <StyledNav>
        <StyledLinks>
          <StyledLink href="/">{t('home')}</StyledLink>

          <StyledLink href="/about">{t('about')}</StyledLink>
        </StyledLinks>
        <StyledButton type="button" onClick={handleLanguageChange}>
          {locale === 'en' ? 'RU' : 'EN'}
        </StyledButton>
        <StyledButton onClick={toggleTheme}>{theme}</StyledButton>
      </StyledNav>
    </StyledHeader>
  );
}

export default Header;
