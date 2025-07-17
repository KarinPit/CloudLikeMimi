import {
    User,
    XIcon,
    HomeIcon,
    FolderIcon,
    SettingsIcon,
    HelpCircleIcon,
    LogOutIcon,
} from 'lucide-react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../store/actions/user.actions'
import { onToggleModal } from '../store/actions/app.actions'

export default function MenuModal() {
    const user = useSelector((storeState) => storeState.userModule.user)

    async function onCloseMenu() {
        try {
            onToggleModal('mainMenu', false)
        }
        catch (err) {
            console.log('Had issues in main menu:\n', err);
        }
    }

    return (<>
        <div className="menu-control">
            <h3>Menu</h3>
            <button
                onClick={onCloseMenu}
            >
                <XIcon size={20} />
            </button>
        </div>
        <div className="menu-options">
            <div className="user-info">
                <div className="svg-container">
                    <User />
                </div>
                <div className='info'>
                    <p>Dr. {user.fullname}</p>
                    <p>{user.mail}</p>
                </div>
            </div>
            <nav className="nav-options">
                <NavLink to="/">
                    <FolderIcon />
                    <span>My Folders</span>
                </NavLink>
                <NavLink to="/settings">
                    <SettingsIcon />
                    <span>Settings</span>
                </NavLink>
                <NavLink to="/help">
                    <HelpCircleIcon />
                    <span>Help & Support</span>
                </NavLink>
            </nav>
            <div className="logout-option">
                <button onClick={logout}>
                    <LogOutIcon />
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    </>
    )
}