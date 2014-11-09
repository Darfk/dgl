var Material = function () {
  this.shader = null;
  this.texture = null;
};

Material.prototype.fromShader = function (shader) {
  this.shader = shader;
  return this;
};
