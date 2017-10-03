module.exports = (data) => {

    function getAll(req, res) {

        return data.widgets.getAll()
            .then((widgets) => {

                return res.status(201)
                    .json(widgets);
            });
    }

    function getFooterWidget(req, res) {

        return data.widgets.getFooterWidget()
            .then((footerWidget) => {

                return res.status(201)
                    .json(footerWidget);
            });
    }

    function getSidebarWidget(req, res) {

        return data.widgets.getSidebarWidget()
            .then((footerWidget) => {

                return res.status(201)
                    .json(footerWidget);
            });
    }

    function saveWidget(req, res) {
        const user = req.user;
        const widgetInfo = req.body;
        const widgetTitle = widgetInfo.title;
        const widgetText = widgetInfo.text;
        const widgetId = Number(req.params.id);

        if (!user || typeof user.username !== 'string' || user.role !== 'admin') {
            res.status(400)
                .json('Only admin can change widgets content!');
            return;
        }

        return data.widgets.saveWidget(widgetTitle, widgetText, widgetId)
            .then((widget) => {

                return res.status(201)
                    .json(widget);
            });
    }

    return {
        getAll: getAll,
        getFooterWidget: getFooterWidget,
        getSidebarWidget: getSidebarWidget,
        saveWidget: saveWidget,
    };
};