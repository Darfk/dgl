var Renderer = function () {
  this.currentMaterial = null;
  this.currentTexture = null;
  this.currentModel = null;
};

Renderer.prototype.begin = function () {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
};

Renderer.prototype.useTexture = function(texture) {
  if(this.currentTexture === texture) return;
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture.texture);
  if(this.currentMaterial){
    gl.uniform1i(this.currentMaterial.shader.uniforms.uSampler,
                 texture.texture);
  }
  this.currentTexture = texture;
};

Renderer.prototype.useMaterial = function(material) {
  if(this.currentMaterial === material) return;
  this.useTexture(material.texture);
  gl.useProgram(material.shader.program);
  this.currentMaterial = material;
};

Renderer.prototype.useModel = function (model) {
  if(this.currentModel === model) return;
  this.useMaterial(model.material);
  gl.bindBuffer(gl.ARRAY_BUFFER, model.mesh.vertexPositionBuffer);
  gl.vertexAttribPointer(model.material.shader.attributes.aVertexPosition, model.mesh.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, model.mesh.vertexTexCoordBuffer);
  gl.vertexAttribPointer(model.material.shader.attributes.aTextureCoord, model.mesh.vertexTexCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
  this.currentModel = model;
};

Renderer.prototype.setWorldMatrix = function (m) {
  gl.uniformMatrix4fv(this.currentMaterial.shader.uniforms.uPMatrix, false, m);
};

Renderer.prototype.setModelMatrix = function (m) {
  gl.uniformMatrix4fv(this.currentMaterial.shader.uniforms.uMVMatrix, false, m);
};
