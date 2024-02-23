const  Article = require ('../models/article')

const createArticle = async (title, published) => {
    const article = new Article({ title })
    if (published) article.published =published;
    return await article.save(); 
}

module.exports = { createArticle }