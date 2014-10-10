var Model = function () {
  this.mesh = null;
  this.material = null;
  this.name = null;
};

Model.prototype.fromOBJ = function (data) {
  data = data.split("\n");

  var v = [];
  var vt = [];
  var vn = [];

  var f = [];

  // v (x) (y) (z)[ (w)]
  var vertexRegexp = /^v (-?[\d]+\.[\d]+) (-?[\d]+\.[\d]+) (-?[\d]+\.[\d]+) ?(-?[\d]+\.[\d]+)?$/;

  // vt (s) (t)
  var vertexTexCoordRegexp = /^vt (-?[\d]+\.[\d]+) (-?[\d]+\.[\d]+)$/;

  // vn (nx) (ny) (nz)
  var vertexNormalRegexp = /^vn (-?[\d]+\.[\d]+) (-?[\d]+\.[\d]+) (-?[\d]+\.[\d]+)$/;

  // f ((va)/(ta)/(na)) ((vb)/(tb)/(nb)) ((vc)/(tc)/(nc))
  var faceRegexp = /^f ((\d+)\/(\d+)\/(\d+)) ((\d+)\/(\d+)\/(\d+)) ((\d+)\/(\d+)\/(\d+))$/;

  // o (object_name)
  var nameRegexp = /^o ([\d\w]+)$/

  var m;

  for(var i in data){
    var line = data[i];
    m = null;

    if(line.indexOf("#") === 0 || line.trim().length < 1) {
      continue;
    }else if(line.indexOf("v ") === 0){
      m = line.match(vertexRegexp);
      v.push(parseFloat(m[1]),
             parseFloat(m[2]),
             parseFloat(m[3]));
    }else if(line.indexOf("vt ") === 0){
      m = line.match(vertexTexCoordRegexp);
      vt.push(parseFloat(m[1]),
              parseFloat(m[2]));
    }else if(line.indexOf("vn ") === 0){
      m = line.match(vertexNormalRegexp);
      vn.push(parseFloat(m[1]),
              parseFloat(m[2]),
              parseFloat(m[3]));
    }else if(line.indexOf("o ") === 0) {
      m = line.match(nameRegexp);
      this.name = m[1];
    }else if(line.indexOf("f ") === 0) {
      m = line.match(faceRegexp);
      // OBJ indices are 1-indexed
      for(var j=0;j<3;j++){
        f.push([m[j*4+1],
                parseInt(m[j*4+2]) - 1,
                parseInt(m[j*4+3]) - 1,
                parseInt(m[j*4+4]) - 1]);
      }
    }else{
      console.info("Not yet implemented", line);
      continue;
    }
  }

  var faces = [];
  var vertexIndices = new Float32Array(f.length);

  var vertices = [];
  var vertexNormals = [];
  var vertexTexCoords = [];

  for(var i in f){
    var q = f[i];

    var ii; 

    if((ii = faces.indexOf(q[0])) === -1){
      vertexIndices[i] = faces.length;
      vertices.push(v[q[1]*3+0],
                    v[q[1]*3+1],
                    v[q[1]*3+2]);
      vertexTexCoords.push(vt[q[2]*2+0],
                           vt[q[2]*2+1]);
      vertexNormals.push(vn[q[3]*3+0],
                         vn[q[3]*3+1],
                         vn[q[3]*3+2]);
      faces.push(q[0]);
    }else{
      vertexIndices[i] = ii;
    }
  }

  this.mesh = new Mesh();
  this.mesh.fromVertexData(vertices, vertexTexCoords, vertexIndices);
  return this;
};
