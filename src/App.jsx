import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Provider } from 'react-redux'
import { Suspense, lazy } from 'react';

import { store } from './store/store'
import { useSelector } from 'react-redux';
import { setScreenWidth } from "./store/actions/app.actions"

import AppHeader from './cmps/AppHeader';
import Footer from './cmps/Footer';
import Home from './pages/Home'
import FolderIndex from './pages/FolderIndex';
import AddFolderModal from './cmps/AddFolderModal';
import EditFolderModal from './cmps/EditFolderModal';
import ModalOverlay from './cmps/ModalOverlay';

export function App() {
    const currentWidth = useSelector((storeState) => storeState.appModule.screenWidth)
    const modals = useSelector((storeState) => storeState.appModule.modals)
    const openModalType = Object.entries(modals).find(([key, isOpen]) => isOpen)?.[0]


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
            default:
                return null
        }
    }

    useEffect(() => {
        window.addEventListener('resize', onChangeWidth)
        return () => window.removeEventListener('resize', onChangeWidth)
    }, [])

    return (
        <Provider store={store}>
            <Router>
                <section className={`main-app ${openModalType ? 'open-modal' : ''}`}>
                    <AppHeader />
                    {openModalType && getModal()}
                    {openModalType && <ModalOverlay modalType={openModalType} />}
                    <main className='main-container'>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/folder/:folderId?" element={<FolderIndex />} />
                        </Routes>
                    </main>
                    <Footer />
                </section>
            </Router>
        </Provider >
    )
}
