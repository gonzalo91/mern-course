
import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectID

let reviews
export default class ReviewsDAO{


    static async injectDB(conn){
        if(reviews){
            return 
        }

        try{
            reviews = await conn.db(process.env.RESTTREVIEWS_NS)
                                .collection("reviews")
        }catch(e){
            console.error(
                'Unable to establish a cllection handle in ReviewsDAO',
                e
            )
        }
    }

    static async create(restaurantId, user, review, date){
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                text: review,
                restaurant_id: ObjectId(restaurantId),
            }

            return await reviews.insertOne(reviewDoc)
        } catch (error) {
            console.log(error);
            return { error, status: 'error'}
        }

    }

    static async update(reviewId, userId, text, date){
        try {
            const updateResponse = await reviews.updateOne(
                {user_id: userId, _id: ObjectId(reviewId) },
                {$set: { text, date} }
            )

            return updateResponse
        } catch (error) {
            console.error('Unable to update review', error);
            return { error, status: 'error' }
        }
    }

    static async delete(reviewId, userId){
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId),
                user_id: userId
            })

            return deleteResponse
        } catch (error) {
            console.error('Unable to delete review', error)
            return {error, status: 'error'}
        }
    }
}