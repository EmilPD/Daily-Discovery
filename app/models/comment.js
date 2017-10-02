import { validator } from '../utils/validator.js';

const Comment = (() => {
    class Comment {
        constructor(text) {
            this.text = text;
        }
        
        get text() {
			return this._text;
		}
        
		set text(value) {
            validator.validateIfUndefinedOrNull(value, 'Comment');
			validator.validateTypeOf(value, 'Comment', 'string');
            validator.validateIfEmptyString(value, 'Comment');
			this._text = value;
		}
    }

    return Comment;
})();

export { Comment };