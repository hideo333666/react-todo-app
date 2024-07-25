// src/Header.tsx
import React, { useEffect } from 'react';
import { FaClipboardList } from 'react-icons/fa';
import './Header.scss';

// クラス名を定数として定義
const HEADER_CLASS = 'header';
const TRIGGER_CLASS = 'header-trigger';
const VISIBLE_CLASS = 'header--visible';

const useHeaderVisibility = (headerClass: string, triggerClass: string, visibleClass: string) => {
    useEffect(() => {
        const header = document.querySelector(`.${headerClass}`) as HTMLElement | null;
        const trigger = document.querySelector(`.${triggerClass}`) as HTMLElement | null;

        const showHeader = () => {
            if (header) {
                header.classList.add(visibleClass);
            }
        };

        const hideHeader = () => {
            if (header) {
                header.classList.remove(visibleClass);
            }
        };

        if (trigger) {
            trigger.addEventListener('mouseover', showHeader);
            header?.addEventListener('mouseleave', hideHeader);
        }

        return () => {
            trigger?.removeEventListener('mouseover', showHeader);
            header?.removeEventListener('mouseleave', hideHeader);
        };
    }, [headerClass, triggerClass, visibleClass]);
};

const Header: React.FC = () => {
    useHeaderVisibility(HEADER_CLASS, TRIGGER_CLASS, VISIBLE_CLASS);

    return (
        <>
            <div className={TRIGGER_CLASS}></div>
            <header className={HEADER_CLASS}>
                <div className="header__title">
                    <FaClipboardList className="header__icon" size={24} />
                    <h1>ToDo App</h1>
                </div>
                <ul className="header__nav-links">
                    <li className="header__nav-links__item">
                        <a href="/" className="header__nav-links__item__link">
                            Home
                        </a>
                    </li>
                    <li className="header__nav-links__item">
                        <a href="/about" className="header__nav-links__item__link">
                            About
                        </a>
                    </li>
                    <li className="header__nav-links__item">
                        <a href="/contact" className="header__nav-links__item__link">
                            Contact
                        </a>
                    </li>
                </ul>
            </header>
        </>
    );
};

export default Header;
