import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import { asyncLocalStorage } from '../../services/als.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('review')
            // const reviews = await collection.find(criteria).toArray()
        var reviews = await collection.aggregate([{
                $match: criteria
            },
            {
                $lookup: {
                    localField: 'byUserId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'byUser'
                }
            },
            {
                $unwind: '$byUser'
            },
            {
                $lookup: {
                    localField: 'aboutUserId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'aboutUser'
                }
            },
            {
                $unwind: '$aboutUser'
            },
            {
                $project: {
                    _id: true, // Include the '_id' field
                    txt: true, // Include the 'txt' field
                    "byUser._id": true, // Include 'byUser._id'
                    "byUser.fullname": true, // Include 'byUser.fullname'
                    "aboutUser._id": true, // Include 'aboutUser._id'
                    "aboutUser.fullname": true // Include 'aboutUser.fullname'
                }
            }
        ]).toArray()
        reviews = reviews.map(review => {
            review.byUser = { _id: review.byUser._id, fullname: review.byUser.fullname }
            review.aboutUser = { _id: review.aboutUser._id, fullname: review.aboutUser.fullname }
            delete review.byUserId
            delete review.aboutUserId
            return review
        })

        return reviews
    } catch (err) {
        logger.error('cannot find reviews', err)
        throw err
    }

}

async function remove(reviewId, loggedinUser) {
    try {
        const collection = await dbService.getCollection('review')
            // remove only if user is owner/admin
        const criteria = { _id: new ObjectId(reviewId) }
        if (!loggedinUser.isAdmin) criteria.byUserId = new ObjectId(loggedinUser._id)
        const { deletedCount } = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}


async function add(review) {
    try {
        const reviewToAdd = {
            byUserId: new ObjectId(review.byUserId),
            aboutUserId: new ObjectId(review.aboutUserId),
            txt: review.txt
        }
        const collection = await dbService.getCollection('review')
        await collection.insertOne(reviewToAdd)
        return reviewToAdd
    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.byUserId) criteria.byUserId = filterBy.byUserId
    return criteria
}

export const reviewService = {
    query,
    remove,
    add
}