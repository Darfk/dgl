var Shader = function () {
  this.attributes = {};
  this.uniforms = {};

  this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
  this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  this.program = gl.createProgram();

};

Shader.prototype.fromSrc = function (vertexSrc, fragmentSrc, attributes, uniforms) {
  gl.shaderSource(this.vertexShader, vertexSrc);
  gl.compileShader(this.vertexShader);

  console.assert(gl.getShaderParameter(this.vertexShader, gl.COMPILE_STATUS),
                 gl.getShaderInfoLog(this.vertexShader));

  gl.shaderSource(this.fragmentShader, fragmentSrc);
  gl.compileShader(this.fragmentShader);

  console.assert(gl.getShaderParameter(this.fragmentShader, gl.COMPILE_STATUS),
                 gl.getShaderInfoLog(this.fragmentShader));

  gl.attachShader(this.program, this.vertexShader);
  gl.attachShader(this.program, this.fragmentShader);
  gl.linkProgram(this.program);
  console.assert(gl.getProgramParameter(this.program, gl.LINK_STATUS),
                 "Could not link shaders");

  for(var i in attributes){
    this.attributes[attributes[i]] = gl.getAttribLocation(this.program, attributes[i]);
    gl.enableVertexAttribArray(this.attributes[attributes[i]]);
  }

  for(var i in uniforms){
    this.uniforms[uniforms[i]] = gl.getUniformLocation(this.program, uniforms[i]);
  }
  return this;
};

Shader.prototype.diffuseShader = function () {

  var vertexSrc = [
    "attribute vec3 aVertexPosition;",
    "attribute vec2 aTextureCoord;",
    "uniform mat4 uMVMatrix;",
    "uniform mat4 uPMatrix;",
    "varying vec2 vTextureCoord;",
    "void main(void) {",
    "gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);",
    "vTextureCoord = aTextureCoord;",
    "}",
  ].join("\n");

  var fragmentSrc = [
    "precision mediump float;",
    "varying vec2 vTextureCoord;",
    "uniform sampler2D uSampler;",
    "void main(void) {",
    "gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));",
    "}",
  ].join("\n");

  var attributes = ["aVertexPosition", "aTextureCoord"]

  var uniforms = ["uPMatrix", "uMVMatrix", "uSampler"];

  return this.fromSrc(vertexSrc, fragmentSrc, attributes, uniforms);
};

Shader.prototype.tilemapShader = function () {

  var vertexSrc = [
    "attribute vec3 aVertexPosition;",
    "attribute vec2 aTextureCoord;",
    "uniform mat4 uMVMatrix;",
    "uniform mat4 uPMatrix;",
    "uniform vec2 uTileData;",
    "varying vec2 vTextureCoord;",
    "void main(void) {",
    "gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);",

    "vec2 offset = vec2(",
    "mod(uTileData.s, uTileData.t) / uTileData.t,",
    "float(int(uTileData.s) / int(uTileData.t)) / uTileData.t",
    ");",
    "vTextureCoord = vec2(aTextureCoord.s + offset.s, aTextureCoord.t + offset.t);",
    "}",
  ].join("\n");

  var fragmentSrc = [
    "precision mediump float;",
    "varying vec2 vTextureCoord;",
    "uniform sampler2D uSampler;",
    "void main(void) {",
    "gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));",
    "}",
  ].join("\n");

  var attributes = ["aVertexPosition", "aTextureCoord"]

  var uniforms = ["uPMatrix", "uMVMatrix", "uSampler", "uTileData"];

  return this.fromSrc(vertexSrc, fragmentSrc, attributes, uniforms);
}
