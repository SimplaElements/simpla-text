import Scribe from 'scribe-editor';
import { INLINE_ELEMENTS } from './constants';

class SmHelperScribe {
  beforeRegister() {
    this.is = 'sm-text-scribe';

    this.properties = {
      value: {
        type: String,
        value: '',
        observer: '_valueChanged'
      },
      commands: String,
      _commands: {
        type: Array,
        computed: 'parseCommands(commands)'
      },
      inline: Boolean,
      block: Boolean,
      readonly: Boolean,
      placeholder: String
    };
  }

  ready() {
    let target = this.$['container'];
    this._setupScribe(target);
  }

  parseCommands(commands) {
    return commands.trim().split(/\s+/);
  }

  _setupScribe(target) {
    this._scribe = new Scribe(target);

    this._scribe.on('content-changed', () => {
      // Use getHTML instead of getContent so as not to apply 'for export'
      //  formatting. See https://github.com/guardian/scribe/blob/master/src/scribe.js#L147
      this.value = this._scribe.getHTML();
    });
  }

  _valueChanged(value) {
    // Note we use setHTML as setContent will trigger a content-changed event
    //  which will set off an infinite loop
    if (this._scribe && this._scribe.setHTML) {
      this._scribe.setHTML(value);
    }
  }

  /**
   * Returns true if inline
   * @return {boolean}
   */
  shouldInline() {
    let parent,
        name,
        shouldBeInline;

    if (this.inline) {
      return true;
    }

    if (this.block) {
      return false;
    }

    parent = this.parentNode;
    name = parent.nodeName.toLowerCase();
    shouldBeInline = INLINE_ELEMENTS.indexOf(name) !== -1;

    return shouldBeInline;
  }
}

Polymer(SmHelperScribe);
