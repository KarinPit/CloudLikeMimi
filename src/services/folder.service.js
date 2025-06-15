import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const STORAGE_KEY_FOLDER_DATA = 'folderData'

export const folderService = {
	getFolderData,
	getById,
	saveFolder,
	remove,
	update,
}

window.folderService = folderService
_createFolderData()

function getFolderData() {
	return storageService.query(STORAGE_KEY_FOLDER_DATA)
}

async function getById(folderId) {
	const folder = await storageService.get(STORAGE_KEY_FOLDER_DATA, folderId)
	return folder
}

function remove(folderId) {
	return storageService.remove(STORAGE_KEY_FOLDER_DATA, folderId)
}

async function update(folderToUpdate) {
	const folder = await getById(folderToUpdate.id)
	const updatedFolder = await storageService.put(STORAGE_KEY_FOLDER_DATA, { ...folder, ...folderToUpdate })
	return updatedUser
}

async function saveFolder(folder) {
	folder = { id: folder.id, name: folder.name, color: folder.color }
	const savedFolder = await storageService.post(STORAGE_KEY_FOLDER_DATA, folder)
	return savedFolder
}

function _createFolderData() {
	let folderData = utilService.loadFromStorage(STORAGE_KEY_FOLDER_DATA)
	if (!folderData || !folderData.length) {
		folderData = [
			{ id: 'f1', name: 'Documents', color: '#D6E7F8' },
			{ id: 'f2', name: 'Projects', color: '#D6E7F8' },
			{ id: 'f3', name: 'Photos', color: '#D6E7F8' },
			{ id: 'f4', name: 'Downloads', color: '#D6E7F8' },
			{ id: 'f5', name: 'Music', color: '#D6E7F8' },
			{ id: 'f6', name: 'Videos', color: '#D6E7F8' },
			{ id: 'f7', name: 'Archive', color: '#D6E7F8' },
		]
		utilService.saveToStorage(STORAGE_KEY_FOLDER_DATA, folderData)
	}
}
