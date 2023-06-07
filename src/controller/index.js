const baseUrl = require("../constant/url");
const services = require("../helper/service");
const cheerio = require("cheerio");

const fetchRecipes = (req, res, response) => {
  try {
    const $ = cheerio.load(response.data);
    const element = $("._recipes-list");
    let title, duration, difficulty, key, url, href;
    let recipe_list = [];
    element.find(".card").each((i, e) => {
      title = $(e).find(".card-title").text().trim();
      duration = $(e).find("a:not([data-tracking])").first().text().trim();
      difficulty = $(e).find("a[data-tracking]").first().text().trim();
      img = $(e)
        .find("noscript")
        .text()
        .match(/src="([^"]+)"/g)
        .toString()
        .replace('src="', "")
        .replace('"', "");
      url = $(e).find(".card-title").find("a").attr("href");
      href = url.split("/");
      key = href[4];

      recipe_list.push({
        key,
        title: title,
        times: duration,
        difficulty: difficulty,
        img,
      });
    });
    console.log("fetch new recipes");
    res.send({
      method: req.method,
      status: true,
      results: recipe_list,
    });
  } catch (error) {
    throw error;
  }
};

const fetchRecipesCategoryByPages = (req, res, response) => {
  try {
    const $ = cheerio.load(response.data);
    const element = $("._recipes-list");
    let title, duration, difficulty, key, url, href;
    let recipe_list = [];
    element.find(".card").each((i, e) => {
      title = $(e).find(".card-title").text().trim();
      duration = $(e).find("a:not([data-tracking])").first().text().trim();
      difficulty = $(e).find("a[data-tracking]").first().text().trim();
      img = $(e)
        .find("noscript")
        .text()
        .match(/src="([^"]+)"/g)
        .toString()
        .replace('src="', "")
        .replace('"', "");
      url = $(e).find(".card-title").find("a").attr("href");
      href = url.split("/");
      key = href[4];

      recipe_list.push({
        key,
        title: title,
        times: duration,
        difficulty: difficulty,
        img,
      });
    });
    console.log("fetch new recipes by pages");
    let page = req.params.page;
    const total_page = $(".last").attr("href").split("/")[6];
    res.send({
      method: req.method,
      status: true,
      current_page: page,
      total_page,
      results: recipe_list,
    });
  } catch (error) {
    throw error;
  }
};

const fetchRecipesByPages = (req, res, response) => {
  try {
    const $ = cheerio.load(response.data);
    const element = $("._recipes-list");
    let title, duration, difficulty, key, url, href;
    let recipe_list = [];
    element.find(".card").each((i, e) => {
      title = $(e).find(".card-title").text().trim();
      duration = $(e).find("a:not([data-tracking])").first().text().trim();
      difficulty = $(e).find("a[data-tracking]").first().text().trim();
      img = $(e)
        .find("noscript")
        .text()
        .match(/src="([^"]+)"/g)
        .toString()
        .replace('src="', "")
        .replace('"', "");
      url = $(e).find(".card-title").find("a").attr("href");
      href = url.split("/");
      key = href[4];

      recipe_list.push({
        key,
        title: title,
        times: duration,
        difficulty: difficulty,
        img,
      });
    });
    console.log("fetch new recipes by pages");
    let page = req.params.page;
    const total_page = $(".last").attr("href").split("/")[5];
    res.send({
      method: req.method,
      status: true,
      current_page: page,
      total_page,
      results: recipe_list,
    });
  } catch (error) {
    throw error;
  }
};

const limiterRecipes = (req, res, response, limiter) => {
  try {
    const $ = cheerio.load(response.data);
    const element = $("._recipes-list");
    let title, duration, difficulty, key, url, href;
    let recipe_list = [];

    element.find(".card").each((i, e) => {
      title = $(e).find(".card-title").text().trim();
      duration = $(e).find("a:not([data-tracking])").first().text().trim();
      difficulty = $(e).find("a[data-tracking]").first().text().trim();
      img = $(e)
        .find("noscript")
        .text()
        .match(/src="([^"]+)"/g)
        .toString()
        .replace('src="', "")
        .replace('"', "");
      url = $(e).find(".card-title").find("a").attr("href");
      href = url.split("/");
      key = href[4];

      recipe_list.push({
        key,
        title: title,
        times: duration,
        difficulty: difficulty,
        img,
      });
    });

    const recipes_limit = recipe_list.splice(0, limiter);
    console.log("limiter");
    if (limiter > 10) {
      res.send({
        method: req.method,
        status: false,
        message:
          "oops , you fetch a exceeded of limit, please set a limit below of 10",
        results: null,
      });
    } else {
      res.send({
        method: req.method,
        status: true,
        results: recipes_limit,
      });
    }
  } catch (error) {
    throw error;
  }
};

const Controller = {
  newRecipes: async (req, res) => {
    try {
      const response = await services.fetchService(
        `${baseUrl}/resep-masakan/`,
        res
      );
      return fetchRecipes(req, res, response);
    } catch (error) {
      throw error;
    }
  },

  newRecipesByPage: async (req, res) => {
    try {
      const page = req.params.page;
      const response = await services.fetchService(
        `${baseUrl}/resep/page/${page}`,
        res
      );
      return fetchRecipesByPages(req, res, response);
    } catch (error) {
      throw error;
    }
  },

  category: async (req, res) => {
    try {
      const response = await services.fetchService(`${baseUrl}/resep/`, res);
      const $ = cheerio.load(response.data);
      const element = $(".dropdown-menu");
      let category, key;
      let category_list = [];

      element.find("li").each((i, e) => {
        category = $(e).find("a").text().trim();
        key = $(e).find("a").attr("href").split("/")[4];
        console.log(category);
        category_list.push({
          category,
          key,
        });
      });

      return res.send({
        method: req.method,
        status: true,
        results: category_list,
      });
    } catch (error) {
      throw error;
    }
  },

  article: async (req, res) => {
    try {
      const response = await services.fetchService(`${baseUrl}/resep/`, res);
      const $ = cheerio.load(response.data);
      const element = $("._articles-list .row");
      let title, url, parse, img;
      let article_lists = [];
      element.find(".card").each((i, e) => {
        title = $(e).find(".card-title").text().trim();
        img = $(e)
          .find("noscript")
          .text()
          .match(/src="([^"]+)"/g)
          .toString()
          .replace('src="', "")
          .replace('"', "");
        url = $(e).find("a").attr("href");
        parse = url.split("/");
        article_lists.push({
          img,
          title: title,
          key: parse[4],
          // url: url,
        });
      });

      return res.send({
        method: req.method,
        status: true,
        results: article_lists,
      });
    } catch (error) {
      throw error;
    }
  },

  recipesByCategory: async (req, res) => {
    try {
      const key = req.params.key;
      const response = await services.fetchService(
        `${baseUrl}/resep-masakan/${key}`,
        res
      );
      return fetchRecipes(req, res, response);
    } catch (error) {
      throw error;
    }
  },

  recipesCategoryByPage: async (req, res) => {
    try {
      const key = req.params.key;
      const page = req.params.page;
      const response = await services.fetchService(
        `${baseUrl}/resep/${key}/page/${page}`,
        res
      );
      return fetchRecipesCategoryByPages(req, res, response);
    } catch (error) {
      throw error;
    }
  },

  recipesDetail: async (req, res) => {
    try {
      const key = req.params.key;
      const response = await services.fetchService(
        `${baseUrl}/resep/${key}`,
        res
      );
      const $ = cheerio.load(response.data);
      let metaDuration, metaServings, metaDificulty, metaIngredient;
      let title,
        thumb,
        user,
        datePublished,
        desc,
        quantity,
        ingredient,
        ingredients;
      let parseDuration, parseServings, parseDificulty, parseIngredient;
      let duration, servings, difficulty;
      let servingsArr = [];
      let difficultyArr = [];
      let object = {};
      let titleContent = $("._section-title h1");
      let descContent = $("._rich-content");
      object.title = titleContent.text().trim();
      object.description = descContent.text();

      const elementHeader = $("#recipe-header");
      const elementDesc = $(".the-content").first();
      const elementNeeded = $("._product-popup");
      const elementIngredients = $("._recipe-ingredients ");
      const elementTutorial = $("._recipe-steps");
      title = elementHeader.find(".title").text();
      thumb = elementHeader.find(".featured-img").attr("data-lazy-src");
      if (thumb === undefined) {
        thumb = null;
      }
      user = elementHeader.find("small.meta").find(".author").text();
      datePublished = elementHeader.find("small.meta").find(".date").text();

      elementHeader.find(".recipe-info").each((i, e) => {
        metaDuration = $(e).find(".time").find("small").text();
        metaServings = $(e).find(".servings").find("small").text();
        metaDificulty = $(e).find(".difficulty").find("small").text();
        if (
          metaDuration.includes("\n") &&
          metaServings.includes("\n") &&
          metaDificulty.includes("\n")
        ) {
          parseDuration = metaDuration.split("\n")[1].split(" ");
          parseDuration.forEach((r) => {
            if (r !== "") duration = r;
          });

          parseServings = metaServings.split("\n")[1].split(" ");
          parseServings.forEach((r) => {
            if (r !== "") servingsArr.push(r);
          });
          servings = Array.from(servingsArr).join(" ");
          parseDificulty = metaDificulty.split("\n")[1].split(" ");
          parseDificulty.forEach((r) => {
            if (r !== "") difficultyArr.push(r);
          });
          difficulty = Array.from(difficultyArr).join(" ");
        }

        object.title = title;
        object.thumb = thumb;
        object.servings = servings;
        object.times = duration;
        object.difficulty = difficulty;
        object.author = { user, datePublished };
      });

      elementDesc.each((i, e) => {
        desc = $(e).find("p").text();
        object.desc = desc;
      });

      let img, need_item;
      let neededArr = [];
      elementNeeded.find("._product-card ").each((i, e) => {
        img = $(e)
          .find("noscript")
          .text()
          .match(/src="([^"]+)"/g)
          .toString()
          .replace('src="', "")
          .replace('"', "");
        need_item = $(e).find(".title").text().trim();
        neededArr.push({
          item_name: need_item,
          img: img,
        });
      });

      object.needItem = neededArr;

      let ingredientsArr = [];
      elementIngredients.find("div > .d-flex:nth-of-type(n+3)").each((i, e) => {
        quantity = $(e).text();
        metaIngredient = $(e).last().text().replace(/\s+/g, " ").trim();
        ingredientsArr.push(metaIngredient);
      });

      object.ingredient = ingredientsArr;
      let step, resultStep;
      let stepArr = [];
      elementTutorial.find(".step").each((i, e) => {
        step = $(e).find(".content").find("p").text();
        resultStep = `${i + 1} ${step}`;
        stepArr.push(resultStep);
      });

      object.step = stepArr;

      res.send({
        method: req.method,
        status: true,
        results: object,
      });
    } catch (error) {
      throw error;
    }
  },

  searchRecipes: async (req, res) => {
    try {
      const query = req.query.q;
      console.log(query);
      const response = await services.fetchService(
        `${baseUrl}/?s=${query}`,
        res
      );
      const $ = cheerio.load(response.data);
      const element = $("._recipes-list");
      let title, duration, difficulty, key, url, href;
      let recipe_list = [];
      element.find(".card").each((i, e) => {
        title = $(e).find(".card-title").text().trim();
        duration = $(e).find("a:not([data-tracking])").first().text().trim();
        difficulty = $(e).find("a[data-tracking]").first().text().trim();
        img = $(e)
          .find("noscript")
          .text()
          .match(/src="([^"]+)"/g)
          .toString()
          .replace('src="', "")
          .replace('"', "");
        url = $(e).find(".card-title").find("a").attr("href");
        href = url.split("/");
        key = href[4];

        recipe_list.push({
          key,
          title: title,
          times: duration,
          difficulty: difficulty,
          img,
        });
      });
      console.log("fetch new recipes");
      res.send({
        method: req.method,
        status: true,
        results: recipe_list,
      });
    } catch (error) {
      throw error;
    }
  },

  articleCategory: async (req, res) => {
    try {
      const response = await services.fetchService(baseUrl + "/artikel", res);
      const $ = cheerio.load(response.data);

      const element = $(".dropdown-menu");
      let title, key;
      let article_category_list = [];
      element.find("li").each((i, e) => {
        title = $(e).find("a").text().trim();
        key = $(e).find("a").attr("href").split("/");
        article_category_list.push({
          title: title,
          key: key[3],
        });
      });

      res.send({
        method: req.method,
        status: true,
        results: article_category_list,
      });
    } catch (error) {
      throw error;
    }
  },

  articleByCategory: async (req, res) => {
    try {
      const key = req.params.key;
      const page = req.params.page;
      const response = await services.fetchService(`${baseUrl}/${key}`, res);

      const $ = cheerio.load(response.data);
      const element = $("._articles-list .row");
      let title, url, parse, img;
      let article_lists = [];
      element.find(".card").each((i, e) => {
        title = $(e).find(".card-title").text().trim();
        img = $(e)
          .find("noscript")
          .text()
          .match(/src="([^"]+)"/g)
          .toString()
          .replace('src="', "")
          .replace('"', "");
        url = $(e).find("a").attr("href");
        parse = url.split("/");
        article_lists.push({
          img,
          title: title,
          key: parse[4],
          // url: url,
        });
      });

      const total_page = $(".last").attr("href").split("/")[5];
      return res.send({
        method: req.method,
        status: true,
        current_page: page,
        total_page,
        results: article_lists,
      });
    } catch (error) {
      throw error;
    }
  },

  articleDetails: async (req, res) => {
    try {
      const tag = req.params.tag;
      const key = req.params.key;
      const response = await services.fetchService(
        `${baseUrl}/${tag}/${key}`,
        res
      );

      const $ = cheerio.load(response.data);
      const element = $("#content");

      let title, img, author, published, description;
      let article_object = {};
      title = element.find("._article-header .title").text().trim();
      author = element.find(".author").find("small").first().text().trim();
      published = element.find(".author").find("small").last().text().trim();
      img = element
        .find("noscript").first()
        .text()
        .match(/src="([^"]+)"/g)
        .toString()
        .replace('src="', "")
        .replace('"', "");
      description = element.find("._rich-content").text().trim()

      article_object.title = title;
      article_object.img = img;
      article_object.author = author;
      article_object.date_published = published;
      article_object.description = description;

      res.send({
        method: req.method,
        status: true,
        results: article_object,
      });
    } catch (error) {
      throw error;
    }
  },

  newRecipesLimit: async (req, res) => {
    try {
      const response = await services.fetchService(`${baseUrl}/resep/`, res);
      const limit = req.query.limit;
      return limiterRecipes(req, res, response, limit);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Controller;
