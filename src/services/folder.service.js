import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const STORAGE_KEY_FOLDER_DATA = 'folderData'

export const folderService = {
	getFolderData,
	getById,
	save,
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

async function remove(folderId) {
	return await storageService.remove(STORAGE_KEY_FOLDER_DATA, folderId)
}

async function update(folderToUpdate) {
	const folder = await getById(folderToUpdate.id)
	const updatedFolder = await storageService.put(STORAGE_KEY_FOLDER_DATA, { ...folder, ...folderToUpdate })
	return updatedUser
}

async function save(folderToSave) {
	if (folderToSave.id) {
		return await storageService.put(STORAGE_KEY_FOLDER_DATA, folderToSave)
	} else {
		folderToSave = { name: 'New folder', color: '#D6E7F8' }
		return await storageService.post(STORAGE_KEY_FOLDER_DATA, folderToSave)
	}
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
