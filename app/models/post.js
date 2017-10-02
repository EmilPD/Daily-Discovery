import { validator } from '../utils/validator.js';

const Post = (function() {
    class Post {
        constructor(title, content, category, imageUrl, tags) {
            this.title = title;
            this.content = content;
            this.category = category;
            this.imageUrl = imageUrl;
            this.tags = tags;
        }

        get title() {
            return this._title;
        }

        set title(value) {
            validator.validateIfUndefinedOrNull(value, 'Title');
            validator.validateTypeOf(value, 'Title', 'string');
            validator.validateIfEmptyString(value, 'Title');
            this._title = value;
        }

        get content() {
			return this._content;
		}
        
		set content(value) {
            validator.validateIfUndefinedOrNull(value, 'Content');
			validator.validateTypeOf(value, 'Content', 'string');
            validator.validateIfEmptyString(value, 'Content');
			this._content = value;
		}

        get category() {
            return this._category;
        }

        set category(value) {
            validator.validateIfUndefinedOrNull(value, 'Category');
            validator.validateTypeOf(value, 'Category', 'string');
            validator.validateIfEmptyString(value, 'Category');
            this._category = value;
        }

        get imageUrl() {
            return this._imageUrl;
        }

        set imageUrl(value) {
            validator.validateIfUndefinedOrNull(value, 'Image url');
            validator.validateUrl(value);
            validator.validateIfEmptyString(value, 'Image url');
            this._imageUrl = value;
        }

        get tags() {
            return this._tags;
        }

        set tags(value) {
            validator.validateIfUndefinedOrNull(value, 'Tags');
            validator.validateTypeOf(value, 'Tags', 'string');
            validator.validateIfEmptyString(value, 'Tags');
            const valueAsArray = value.split(',').map(function(item) {
                return item.trim();
            });
            this._tags = valueAsArray;
        }
    }

    return Post;
})();

export { Post };