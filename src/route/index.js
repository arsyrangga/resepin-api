const router = require('express').Router();
const route = router;

const controller = require('../controller/index');

route.get('/', (req, res) => {
    res.send({
        greet : 'Hello disana 👋',
        message : 'visit link on bellow for documentation about resepin 👇',
        documentation : 'https://github.com/arsyrangga/resepin-api'
    });
});

route.get('/api', (req, res) => {
    res.send({
        method : req.method,
        message : 'Hello everyone 🌹',
        status : 'On Progress 🚀',
        lets_connected : {
            github : 'https://github.com/arsyrangga',
        }
    });
});

// done
route.get('/api/recipes', controller.newRecipes);

// done
route.get('/api/recipes/:page', controller.newRecipesByPage);

// done
route.get('/api/recipes-length/', controller.newRecipesLimit);

// done
route.get('/api/category/recipes', controller.category);

// done
route.get('/api/articles/new', controller.article);

//done
route.get('/api/articles/page/:page', controller.articlePage);

// done
route.get('/api/category/recipes/:key', controller.recipesByCategory);

// done
route.get('/api/category/recipes/:key/:page', controller.recipesCategoryByPage);

// done
route.get('/api/recipe/:key', controller.recipesDetail);

// done
route.get('/api/search/', controller.searchRecipes);

// done
route.get('/api/search/page/:page', controller.searchRecipesByPage);

// done
route.get('/api/category/article', controller.articleCategory);

// done 
route.get('/api/category/article/:key/:page', controller.articleByCategory);

// done
route.get('/api/article/:tag/:key', controller.articleDetails);

route.get('*', (req, res) => {
    res.status(404).json({
        method : req.method,
        message : 'cant find spesific endpoint, please make sure you read a documentation',
        status : false,
        code : 401,
    });
});

module.exports = route;
