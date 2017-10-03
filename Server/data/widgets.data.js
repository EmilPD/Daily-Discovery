module.exports = (db) => {
    return {
        getAll() {
            return Promise.resolve()
                .then(() => {
                    const allWidgets = db.get('widgets')
                        .value();

                    return allWidgets;
                });
        },

        getFooterWidget() {
            return Promise.resolve()
                .then(() => {
                    const footerWidget = db.get('widgets')
                        .filter({sidebar: false})
                        .value();

                    return footerWidget;
                });
        },

        getSidebarWidget() {
            return Promise.resolve()
                .then(() => {
                    const sidebarWidget = db.get('widgets')
                        .filter({sidebar: true})
                        .value();

                    return sidebarWidget;
                });
        },

        saveWidget(widgetTitle, widgetText, widgetId) {
            return Promise.resolve()
                .then(() => {
                    const newWidget = db.get('widgets')
                        .find({id: widgetId})
                        .assign({
                            'title': widgetTitle,
                            'text': widgetText
                        })
                        .write();

                    return db.get('widgets')
                        .getById(widgetId);
                });
        },
    };
};