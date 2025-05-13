import Link from "next/link";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="navbar">
        <Link href="/" className="navbar__logo">nextmap</Link>
        <div className="navbar__list">
          <Link href={"/stores"} className="navbar__list--item">
            맛집 목록
          </Link>
          <Link href={"/stores/new"} className="navbar__list--item">
            맛집 등록
          </Link>
          <Link href="/users/likes" className="navbar__list--item">
            찜한 가게
          </Link>
          <Link href="/users/login" className="navbar__list--item">
            로그인
          </Link>
        </div>
        <div
          role="presentation"
          className="navbar__button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <IoClose /> : <IoMenu />}
        </div>
      </div>
      {/*모바일 메뉴 */}
      {isOpen && (
        <div className="navbar--mobile">
          <div className="navbar__list--mobile">
            <Link href={"/stores"} className="navbar__list--item--moobile">
              맛집 목록
            </Link>
            <Link href={"/stores/new"} className="navbar__list--item--moobile">
              맛집 등록
            </Link>
            <Link href="/users/likes" className="navbar__list--item--moobile">
              찜한 가게
            </Link>
            <Link href="/users/login" className="navbar__list--item--moobile">
              로그인
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
