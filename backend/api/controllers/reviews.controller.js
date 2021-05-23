import e from 'express';
import ReviewsDAO from '../dao/reviewsDAO.js'

export default class ReviewsController{


    static async store(req, res, next){
        try {
            const restaurantId = req.body.restaurant_id;
            const review = req.body.text

            const userInfo = {
                name :req.body.name,
                _id :req.body.user_id,
            }
            const date = new Date();

            const reviewResopnse =await ReviewsDAO.create(
                restaurantId,
                userInfo,
                review,
                date
            )

            res.json({
                status: 'ok',
                data: reviewResopnse
            })

        } catch (error) {
            res.status(500).json({ status: 'error', error: error.message })
        }
    }

    static async update(req, res, next){
        try {
            const reviewId = req.body.review_id;
            const review   = req.body.text
            
            const text = req.body.text
            const date = new Date();

            const reviewResponse =await ReviewsDAO.update(                
                reviewId,
                req.body.user_id,
                review,
                date
            )

            var { error } = reviewResponse
            if(error){
                res.status(400).json({ status: 'error', error})
            }

            if(reviewResponse.modifiedCount === 0){
                throw new Error(
                    "unable to update review - user may not be orignal poster"
                )
            }

            res.json({
                status: 'ok',
                data: reviewResponse
            })

        } catch (error) {
            res.status(500).json({ status: 'error', error: error.message })
        }
    }
     
    static async delete(req, res, next){
        try {
            const reviewId = req.query.id
            const userId = req.body.user_id

            const reviewResponse = await ReviewsDAO.delete(reviewId, userId)


            res.json( {status: 'ok', data: reviewResponse})
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}
