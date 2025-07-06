import { Route, HashRouter as Router, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Provider } from 'react-redux'
import { Suspense, lazy } from 'react';

import { store } from './store/store'
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
import ModalOverlay from './cmps/ModalOverlay';

export function App() {
    const location = useLocation()
    const modals = useSelector((storeState) => storeState.appModule.modals)
    const [openModalType, modalValue] = Object.entries(modals).find(
        ([_, val]) => val && (val.isOpen || val === true)
    ) || []

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
            default:
                return null
        }
    }

    useEffect(() => {
        window.addEventListener('resize', onChangeWidth)
        return () => window.removeEventListener('resize', onChangeWidth)
    }, [])

    return (
        <section className={`main-app ${openModalType ? 'open-modal' : ''}`}>
            {!location.pathname.includes('login') ? <AppHeader /> : ''}
            {openModalType && getModal()}
            {openModalType && <ModalOverlay modalType={openModalType} />}
            <main className='main-container'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/folder/:folderId?" element={<FolderIndex />} />
                </Routes>
            </main>
            {!location.pathname.includes('login') ? <Footer /> : ''}
        </section>
    )
}
