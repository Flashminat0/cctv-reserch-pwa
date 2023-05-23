import Link from 'next/link';
import { CatLogoSvg } from '@svg/index';
import NavBar from '@components/NavBar';
import styles from '@styles/Header.module.css';

/**
 * It returns a header element with a logo, a title, and a navigation bar
 * @returns A JSX element
 */
function Header(): JSX.Element {
  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <div className='h-16 grid place-items-center'>
          <Link href='/'>
            <img src='/icons/icon-maskable-512x512.png' alt='logo' width='50px' />
          </Link>
        </div>
      </div>
      <div className={styles.name}>
        <Link href='/'>SecureVision</Link>
      </div>
      <div className={styles.small}>
        <div className={`${styles.smallCat} grid place-items-center`}>
          <Link href='/' aria-label='Cat'>
            <img src='/icons/icon-maskable-512x512.png' alt='logo' width='40px' />
          </Link>
        </div>
      </div>
      {/* NAVIGATION BAR */}
      <NavBar />
    </header>
  );
}

export default Header;
