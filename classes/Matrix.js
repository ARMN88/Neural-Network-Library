class Matrix {
  constructor(elements) {
    this.elements = elements;
  }
  set(elements) {
    this.elements = elements;
    return this;
  }
  apply(func) {
    var m0 = this.elements;
    for (let x = 0; x < m0.length; x++) {
      for (let y = 0; y < m0[0].length; y++) {
        m0[x][y] = func(m0[x][y]);
      }
    }
    return this;
  }
  add(matrix2) {
    var m1 = this.elements;
    var m2 = matrix2.elements;

    if (m2.length !== m1.length || m2[0].length !== m1[0].length) {
      var err = new Error("Addition Error: Matrix sizes do not match");
      throw err;
    }

    for (let x = 0; x < m2.length; x++) {
      for (let y = 0; y < m2[0].length; y++) {
        m1[x][y] += m2[x][y];
      }
    }

    return this;
  }
  multiply(matrix2) {
    var m1 = this.elements;
    var m2 = matrix2.elements;
    var mo = [];

    if (m2.length !== m1[0].length) {
      var err = new Error("Multiplication Error: Matrix sizes do not match");
      throw err;
    }

    for (let x = 0; x < m1.length; x++) {
      mo[x] = [];
      for (let y = 0; y < m2[0].length; y++) {
        mo[x][y] = 0;
        for (let z = 0; z < m1[0].length; z++) {
          mo[x][y] += m1[x][z] * m2[z][y];
        }
      }
    }
    this.set(mo);
    return this;
  }

  createPoint(color = `hsl(${RandomInt(0, 360)}, 50%, 40%)`) {
    this.color = color;
    this.point = new Point(this.elements[0][0], this.elements[1][0], this.color);

    return this;
  }

  get dimensions() {
    return `${this.elements.length} x ${this.elements[0].length}`;
  }

  static ApplyFunction(matrix1, func) {
    var m1 = matrix1.elements;
    var m0 = [];

    for (let x = 0; x < m1.length; x++) {
      m0[x] = [];
      for (let y = 0; y < m1[0].length; y++) {
        m0[x][y] = func(m1[x][y]);
      }
    }
    return new Matrix(m0);
  }
  static AddMatrices(matrix1, matrix2) {
    var m1 = matrix1.elements;
    var m2 = matrix2.elements;
    var mo = [];

    if (m2.length !== m1.length || m2[0].length !== m1[0].length) {
      var err = new Error("Addition Error: Matrix sizes do not match");
      throw err;
    }

    for (let x = 0; x < m2.length; x++) {
      mo[x] = [];
      for (let y = 0; y < m2[0].length; y++) {
        mo[x][y] = m2[x][y] + m1[x][y];
      }
    }

    return new Matrix(mo);
  }
  static SubtractMatrices(matrix1, matrix2) {
    var m1 = matrix1.elements;
    var m2 = matrix2.elements;
    var mo = [];

    if (m2.length !== m1.length || m2[0].length !== m1[0].length) {
      var err = new Error("Subtraction Error: Matrix sizes do not match");
      throw err;
    }

    for (let x = 0; x < m2.length; x++) {
      mo[x] = [];
      for (let y = 0; y < m2[0].length; y++) {
        mo[x][y] = m1[x][y] - m2[x][y];
      }
    }

    return new Matrix(mo);
  }

  static MultiplyMatrices(matrix1, matrix2) {
    var m1 = matrix1.elements;
    var m2 = matrix2.elements;
    var mo = [];

    if (m2.length !== m1[0].length) {
      var err = new Error("Multiplication Error: Matrix sizes do not match");
      throw err;
    }

    for (let x = 0; x < m1.length; x++) {
      mo[x] = [];
      for (let y = 0; y < m2[0].length; y++) {
        mo[x][y] = 0;
        for (let z = 0; z < m1[0].length; z++) {
          mo[x][y] += m1[x][z] * m2[z][y];
        }
      }
    }
    return new Matrix(mo);
  }
  static Random(rows, columns, range = 2) {
    var m0 = [];
    for (let x = 0; x < rows; x++) {
      m0[x] = [];
      for (let y = 0; y < columns; y++) {
        m0[x][y] = Math.random() * range - range / 2;
      }
    }

    return new Matrix(m0);
  }
}