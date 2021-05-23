import express from "express"

import RestaurantsController from './controllers/restaurants.controller.js'
import ReviewsController from './controllers/reviews.controller.js'


const router = express.Router()
router.route('/').get( RestaurantsController.getRestaurants )
router.route('/id/:id').get( RestaurantsController.getRestaurant )
router.route('/cuisines').get( RestaurantsController.getRestaurantsCuisine )

router.route('/reviews')
        .post(ReviewsController.store)
        .put(ReviewsController.update)
        .delete(ReviewsController.delete)

export default router