import { Navigate, Route, HashRouter as Router, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Provider } from 'react-redux'
import { Suspense, lazy } from 'react';

import { useSelector } from 'react-redux';
import { setScreenWidth } from "./store/actions/app.actions"

import AppHeader from './cmps/AppHeader';
import Footer from './cmps/Footer';
import Home from './pages/Home'
import Login from './pages/Login'
import FolderIndex from './pages/FolderIndex';
import AddFolderModal from './cmps/AddFolderModal';
import EditFolderModal from './cmps/EditFolderModal';
import ConfirmModal from "./cmps/ConfirmModal"
import EditFolderTitle from './cmps/EditFolderTitle';
import ModalOverlay from './cmps/ModalOverlay';
import MenuModal from './cmps/MenuModal';
import EditFileModal from './cmps/EditFileModal';

export function App() {
    const location = useLocation()
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const modals = useSelector((storeState) => storeState.appModule.modals)
    const [openModalType, modalValue] = Object.entries(modals).find(
        ([_, val]) => val && (val.isOpen || val === true)
    ) || []
    const menuRef = useRef(null)

    function onChangeWidth() {
        const currentWidth = window.innerWidth
        setScreenWidth(currentWidth)
    }

    function getModal() {
        switch (openModalType) {
            case 'addFolder':
                return <AddFolderModal />
            case 'editFolder':
                return <EditFolderModal />
            case 'confirmModal':
                return <ConfirmModal {...modalValue} />
            case 'editFoldetTitle':
                return <EditFolderTitle />
            case 'editFileModal':
                return <EditFileModal />
            case 'forgotPassword':
                return 'bg-only'
            case 'mainMenu':
                return 'bg-only'
            default:
                return null
        }
    }

    useEffect(() => {
        window.addEventListener('resize', onChangeWidth)
        return () => window.removeEventListener('resize', onChangeWidth)
    }, [])

    useEffect(() => {
    }, [loggedInUser])

    return (
        <section className={`main-app ${openModalType ? 'open-modal' : ''} ${!loggedInUser ? 'login-background' : ''}`}>
            {!loggedInUser ? (
                <>
                    {openModalType && getModal() !== 'bg-only' && getModal()}
                    {openModalType && <ModalOverlay modalType={openModalType} />}
                    <main className='main-container'>
                        <Routes>
                            <Route path="*" element={<Login />} />
                        </Routes>
                    </main>
                </>
            )
                : (<>
                    {openModalType && getModal() !== 'bg-only' && getModal()}
                    {openModalType && <ModalOverlay modalType={openModalType} />}
                    {openModalType && openModalType === 'mainMenu' && <div ref={menuRef} className='menu-modal'>
                        <MenuModal />
                    </div>}
                    <div className='header-container'>
                        <AppHeader />
                    </div>
                    <main className='main-container'>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/folder/:folderId?" element={<FolderIndex />} />
                            <Route path="*" element={<Home />} />
                        </Routes>
                    </main>
                    <div className='footer-container'>
                        <Footer />
                    </div>
                </>)}
        </section>
    )
}
