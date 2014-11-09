var Renderer = function () {
  this.currentMaterial = null;
  this.currentTexture = null;
  this.currentModel = null;
  this.currentMesh = null;

  this.worldMatrix = null;
  this.modelMatrix = null;

  gl.enable(gl.CULL_FACE);
};

Renderer.prototype.begin = function () {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
};

Renderer.prototype.useMesh = function (mesh) {
  if(this.currentMesh === mesh) return;  
  this.currentMesh = mesh;
  if(this.currentMaterial){
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexPositionBuffer);
    gl.vertexAttribPointer(this.currentMaterial.shader.attributes.aVertexPosition, mesh.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexTexCoordBuffer);
    gl.vertexAttribPointer(this.currentMaterial.shader.attributes.aTextureCoord, mesh.vertexTexCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
  }
};

Renderer.prototype.useTexture = function(texture) {
  if(this.currentTexture === texture) return;
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture.texture);
  if(this.currentMaterial){
    gl.uniform1i(this.currentMaterial.shader.uniforms.uSampler,
                 texture.texture);
  }
};

Renderer.prototype.useMaterial = function(material) {
  this.currentMaterial = material;
  gl.useProgram(material.shader.program);
  this.setWorldMatrix(this.worldMatrix);
  this.setModelMatrix(this.modelMatrix);
  this.useTexture(material.texture);
};

Renderer.prototype.useModel = function (model) {
  this.currentModel = model;
  this.useMaterial(model.material);
  this.useMesh(model.mesh);
};

Renderer.prototype.draw = function(){
  gl.drawElements(gl.TRIANGLES, this.currentMesh.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

Renderer.prototype.setWorldMatrix = function (m) {
  this.worldMatrix = m;
  if(m && this.currentMaterial && this.currentMaterial.shader) {
    gl.uniformMatrix4fv(this.currentMaterial.shader.uniforms.uPMatrix, false, m);
  }
};

Renderer.prototype.setModelMatrix = function (m) {
  this.modelMatrix = m;
  if(m && this.currentMaterial && this.currentMaterial.shader) {
    gl.uniformMatrix4fv(this.currentMaterial.shader.uniforms.uMVMatrix, false, m);
  }
};
