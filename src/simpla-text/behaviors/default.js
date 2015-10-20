let coreDefault,
    customDefault;

coreDefault = simpla.behaviors.default();
customDefault = {
  properties: {
    useDefault: {
      type: Boolean,
      observer: '_useDefaultChanged',
      value: false
    }
  },

  _useDefaultChanged(value) {
    if (value) {
      this.value = this._default;
    }
  },

  _setDefaultAttribute(value) {
    this._default = value;
  },

  _setDefaultElement(element) {
    this._default = Polymer.dom(element).innerHTML;
  }
};

export default [ coreDefault, customDefault ];
