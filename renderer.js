var Renderer = function () {
  this.currentMaterial = null;
  this.currentTexture = null;
  this.currentModel = null;
  this.currentMesh = null;

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_COLOR, gl.ONE);
};

Renderer.prototype.begin = function () {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
};

Renderer.prototype.useMesh = function (mesh) {
  if(this.currentMesh === mesh) return;  
  if(this.currentMaterial){
    gl.bindBuffer(gl.ARRAY_BUFFER, model.mesh.vertexPositionBuffer);
    gl.vertexAttribPointer(this.currentMaterial.shader.attributes.aVertexPosition, mesh.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, model.mesh.vertexTexCoordBuffer);
    gl.vertexAttribPointer(this.currentMaterial.shader.attributes.aTextureCoord, mesh.vertexTexCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
  }
  this.currentMesh = mesh;
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
  this.useMesh(model.mesh);
  this.currentModel = model;
};

Renderer.prototype.draw = function(){
  gl.drawElements(gl.TRIANGLES, this.currentMesh.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

Renderer.prototype.setWorldMatrix = function (m) {
  gl.uniformMatrix4fv(this.currentMaterial.shader.uniforms.uPMatrix, false, m);
};

Renderer.prototype.setModelMatrix = function (m) {
  gl.uniformMatrix4fv(this.currentMaterial.shader.uniforms.uMVMatrix, false, m);
};
