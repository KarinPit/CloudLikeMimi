import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const STORAGE_KEY_FILES = 'files'

export const fileService = {
	query,
	getFiles,
	getById,
	getByFolderId,
	save,
	remove,
	update,
	getDefaultFilter,
	getFilterFromParams
}

window.filesService = fileService
_createFileData()


function getDefaultFilter() {
	return ({
		name: '',
		createdAt: ''
	})
}

async function query(filterBy) {
	let files = await storageService.query(STORAGE_KEY_FILES)
	if (filterBy) {
		files = files.filter(file =>
			Object.entries(filterBy).every(([key, value]) => {
				if (value === '') return true;
				if (typeof value === 'string') {
					return file[key]?.toLowerCase().includes(value.toLowerCase());
				}
				return file[key] === value;
			})
		);
	}
	return files
}
function getFilterFromParams(searchParams) {
	const defaultFilter = getDefaultFilter()
	const filterBy = {
		// type: searchParams.get('type'),
		// model:
	}
	for (const field in defaultFilter) {
		filterBy[field] = searchParams.get(field) || defaultFilter[field]
	}
	return filterBy
}

async function getByFolderId(folderId, filterBy) {
	const files = await storageService.query(STORAGE_KEY_FILES)
	let folderFiles = files.filter(file => file.folderId === folderId)
	if (filterBy) {
		folderFiles = folderFiles.filter(file =>
			Object.entries(filterBy).every(([key, value]) => {
				if (value === '') return true;
				if (typeof value === 'string') {
					return file[key]?.toLowerCase().includes(value.toLowerCase());
				}
				return file[key] === value;
			})
		);
	}
	return folderFiles
}

function getFiles() {
	return storageService.query(STORAGE_KEY_FILES)
}

async function getById(filesId) {
	const files = await storageService.get(STORAGE_KEY_FILES, filesId)
	return files
}

async function remove(filesId) {
	return await storageService.remove(STORAGE_KEY_FILES, filesId)
}

async function update(filesToUpdate) {
	const files = await getById(filesToUpdate.id)
	const updatedFile = await storageService.put(STORAGE_KEY_FILES, { ...files, ...filesToUpdate })
	return updatedUser
}

async function save(filesToSave) {
	if (filesToSave.id) {
		return await storageService.put(STORAGE_KEY_FILES, filesToSave)
	} else {
		// filesToSave = { name: 'New files', color: '#D6E7F8' }
		return await storageService.post(STORAGE_KEY_FILES, filesToSave)
	}
}

function _createFileData() {
	let files = utilService.loadFromStorage(STORAGE_KEY_FILES)
	if (!files || !files.length) {
		const files = [
			{ id: 'fl2', name: 'Invoice_Q4', extension: 'xlsx', dateModified: '2025-01-22', size: '245 KB', folderId: 'f2' },
			{ id: 'fl3', name: 'Vacation_Photo_01', extension: 'jpg', dateModified: '2025-06-01', size: '2.3 MB', folderId: 'f3' },
			{ id: 'fl4', name: 'Presentation_Final', extension: 'pptx', dateModified: '2025-03-19', size: '1.2 MB', folderId: 'f2' },
			{ id: 'fl6', name: 'Music_Sample', extension: 'mp3', dateModified: '2025-04-03', size: '5.6 MB', folderId: 'f5' },
			{ id: 'fl7', name: 'Project_Backup', extension: 'zip', dateModified: '2025-05-17', size: '12.1 MB', folderId: 'f4' },
			{ id: 'fl8', name: 'Dog_Video', extension: 'mp4', dateModified: '2025-06-10', size: '22.4 MB', folderId: 'f6' },
			{ id: 'fl9', name: 'Design_Mockup', extension: 'psd', dateModified: '2025-02-25', size: '18.7 MB', folderId: 'f3' },
			{ id: 'fl10', name: 'Notes_Meeting', extension: 'docx', dateModified: '2025-06-14', size: '64 KB', folderId: 'f7' },
		];
		utilService.saveToStorage(STORAGE_KEY_FILES, files)
	}
}

// async function query(filterBy) {
// 	let files = await storageService.query(STORAGE_KEY_FILES)
// 	if (filterBy) {
// 		files = files.filter(file =>
// 			Object.entries(filterBy).every(([key, value]) => {
// 				if (value === '') return true;
// 				if (typeof value === 'string') {
// 					return folder[key]?.toLowerCase().includes(value.toLowerCase());
// 				}
// 				return file[key] === value;
// 			})
// 		);
// 	}
// 	return files
// }