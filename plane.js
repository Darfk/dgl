function  planeMesh(size) {

  if(!size) size = 1.0;

  size /= 2;

  var mesh = new Mesh();

  mesh.vertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexPositionBuffer);
  var p =  size;
  var n = -size;
  var vertices = [
    n, 0.0, p,
    n, 0.0, p,
    p, 0.0, p,
    p, 0.0, p
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  mesh.vertexPositionBuffer.itemSize = 3;
  mesh.vertexPositionBuffer.numItems = 4;
  
  mesh.vertexTexCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexTexCoordBuffer);
  var textureCoords = [
    // Top face
    0.0, 1.0,
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
  mesh.vertexTexCoordBuffer.itemSize = 2;
  mesh.vertexTexCoordBuffer.numItems = 4;

  mesh.vertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.vertexIndexBuffer);
  var cubeVertexIndices = [
    0, 1, 2, 0, 2, 3, // Top face
  ];
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
  mesh.vertexIndexBuffer.itemSize = 1;
  mesh.vertexIndexBuffer.numItems = 6;

  return mesh;

}

function  planeFrontMesh(size) {

  if(!size) size = 1.0;

  size /= 2;

  var mesh = new Mesh();

  mesh.vertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexPositionBuffer);
  var p =  size;
  var n = -size;
  var vertices = [
    n, n, 0.0,
    p, n, 0.0,
    p, p, 0.0,
    n, p, 0.0,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  mesh.vertexPositionBuffer.itemSize = 3;
  mesh.vertexPositionBuffer.numItems = 4;
  
  mesh.vertexTexCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexTexCoordBuffer);
  var textureCoords = [
    1.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,
    1.0, 0.0,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
  mesh.vertexTexCoordBuffer.itemSize = 2;
  mesh.vertexTexCoordBuffer.numItems = 4;

  mesh.vertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.vertexIndexBuffer);
  var cubeVertexIndices = [
    0, 1, 2, 0, 2, 3, // Top face
  ];
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
  mesh.vertexIndexBuffer.itemSize = 1;
  mesh.vertexIndexBuffer.numItems = 6;

  return mesh;

}
