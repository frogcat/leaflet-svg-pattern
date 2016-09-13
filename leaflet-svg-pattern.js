(function() {

  var XLINK = "http://www.w3.org/1999/xlink";

  L.SVG.Pattern = L.SVG.extend({

    _initContainer: function() {
      L.SVG.prototype._initContainer.call(this);
      this._defs = L.SVG.create("defs");
      this._container.insertBefore(this._defs, this._rootGroup);
    },

    _updateStyle: function(layer) {
      L.SVG.prototype._updateStyle.call(this, layer);
      if (layer.options.pattern)
        this._updatePattern(layer, layer.options.pattern);
    },

    _updatePattern: function(layer, href) {

      var pattern = L.SVG.create("pattern");
      pattern.setAttribute("id", "leaflet-pattern-" + L.stamp(pattern));
      pattern.setAttribute("x", 0);
      pattern.setAttribute("y", 0);
      pattern.setAttribute("patternUnits", "userSpaceOnUse");
      pattern.setAttribute("patternContentUnits", "userSpaceOnUse");

      var image = L.SVG.create("image");
      image.setAttribute("x", 0);
      image.setAttribute("y", 0);
      image.setAttributeNS(XLINK, "xlink:href", href);

      pattern.appendChild(image);
      this._defs.appendChild(pattern);
      layer._path.setAttribute("fill", "url(#" + pattern.getAttribute("id") + ")");

      var x = new Image();
      x.src = href;
      x.onload = function() {
        pattern.setAttribute("width", x.width);
        pattern.setAttribute("height", x.height);
        image.setAttribute("width", x.width);
        image.setAttribute("height", x.height);
      };
    }
  });

  L.svg.pattern = function(options) {
    return new L.SVG.Pattern(options);
  };


})();
