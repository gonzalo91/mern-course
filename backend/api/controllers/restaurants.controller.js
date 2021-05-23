import RestaurantsDAO from '../dao/restaruantsDAO.js'

export default class RestaurantsController{


    static async getRestaurants(req, res, next){
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        let filters = {}
        // res.json({
        //     'ola': 'asdio'
        // });

        // return;
        if(req.query.cuisine){
            filters.cuisine = req.query.cuisine
        }else if(req.query.zipcode){
            filters.zipcode = req.query.zipcode
        }else if(req.query.name){
            filters.name = req.query.name
        }

        const {restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({
            filters,
            page,
            restaurantsPerPage,
        })

        let response = {
            restaurants: restaurantsList,
            page: page,
            filters: filters,
            entries_per_page: restaurantsPerPage,
            total_results: totalNumRestaurants
        }

        res.json(response)
    }

    static async getRestaurant(req, res, next){
        try {
            const id = req.params.id || 0

            let restaurant = await RestaurantsDAO.getRestaurantById(id)

            if(! restaurant){
                res.status(404).json({ error: "Not Found"})
                return
            }
            res.json(restaurant)
        } catch (error) {
            console.error("Error getting Restaurant", error);

            res.status(500).json({ error })
        }
    }

    static async getRestaurantsCuisine(req, res, next){
        try {
            let cuisines = await RestaurantsDAO.getCuisines();
            res.json(cuisines)
        } catch (error) {
            console.error("error getting cuisins", error);
            res.status(500).json({ error })            
        }
    }
}
