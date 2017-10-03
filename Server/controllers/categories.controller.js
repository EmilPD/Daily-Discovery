module.exports = (data) => {
    function getByName(req, res) {
        const categoryName = req.params.categoryName;
        const pageNumber = Number(req.params.pageNumber);

        return data.categories.getAllPostsByNameAndPage(categoryName, pageNumber)
            .then((postsInCategory) => {

                return res.status(201)
                    .json({
                        result: postsInCategory
                    });
            });
    }

    return {
        get: getByName
    };
};