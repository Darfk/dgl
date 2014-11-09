var Mesh = function () {
  this.vertexPositionBuffer = gl.createBuffer();
  this.vertexTexCoordBuffer = gl.createBuffer();
  this.vertexIndexBuffer = gl.createBuffer();
};

Mesh.prototype.fromVertexData = function(vertices, textureCoords, vertexIndices) {

  console.info("fromVertexData", vertices.length, textureCoords.length, vertexIndices.length);

  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  this.vertexPositionBuffer.itemSize = 3;
  this.vertexPositionBuffer.numItems = vertices.length / this.vertexPositionBuffer.itemSize;

  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTexCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
  this.vertexTexCoordBuffer.itemSize = 2;
  this.vertexTexCoordBuffer.numItems = textureCoords.length / this.vertexTexCoordBuffer.itemSize;

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
  this.vertexIndexBuffer.itemSize = 1;
  this.vertexIndexBuffer.numItems = vertexIndices.length;

  return this;
};

Mesh.prototype.frontPlane = function(size) {

  if(!size) size = 1.0;
  size /= 2;

  var p =  size;
  var n = -size;
  var vertices = [
    n, n, 0.0,
    p, n, 0.0,
    p, p, 0.0,
    n, p, 0.0,
  ];

  var textureCoords = [
    0.0, 1.0,
    1.0, 1.0,
    1.0, 0.0,
    0.0, 0.0,
  ];

  var vertexIndices = [
    0, 1, 2, 0, 2, 3,
  ];

  this.fromVertexData(vertices, textureCoords, vertexIndices);
  return this;
};
