var Shader = function (vertexSrc, fragmentSrc, attributes, uniforms) {
  this.attributes = {};
  this.uniforms = {};

  this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
  this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(this.vertexShader, vertexSrc);
  gl.compileShader(this.vertexShader);

    console.assert(gl.getShaderParameter(this.vertexShader, gl.COMPILE_STATUS),
                   gl.getShaderInfoLog(this.vertexShader));
  
  gl.shaderSource(this.fragmentShader, fragmentSrc);
  gl.compileShader(this.fragmentShader);

  console.assert(gl.getShaderParameter(this.fragmentShader, gl.COMPILE_STATUS),
                 gl.getShaderInfoLog(this.fragmentShader));

  this.program = gl.createProgram();

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
  
};
