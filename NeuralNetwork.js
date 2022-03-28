class MMath {
  static Add(matrix1, matrix2) {
    if(matrix1.array.length !== matrix2.array.length || matrix1.array[0].length !== matrix2.array[0].length) {
      console.error("Cannot Add: Incorrect Sizes");
      return;
    }
    var addedMatrix = [];
    for(let row = 0; row < matrix1.array.length;row++) {
      addedMatrix.push([]);
      for(let column = 0; column < matrix1.array[0].length;column++) {
        addedMatrix[addedMatrix.length-1].push(matrix1.array[row][column] + matrix2.array[row][column]);
      }
    }
    var newMatrix = new WeightMatrix(2, 3);
    newMatrix.set(addedMatrix);
    return newMatrix;
  }
  static Multiply(matrix1, matrix2) {
    if(matrix2.array.length !== matrix1.array[0].length) {
      console.error("Cannot Multiply: Incorrect Sizes"); 
      return;
    } 
    var multipliedMatrix = [];
    for(let row = 0; row < matrix1.array.length; row++) {
    multipliedMatrix[row] = [];
      for(let column = 0; column < matrix2.array[0].length; column++) {
        multipliedMatrix[row][column] = 0;
        for(let iteration = 0; iteration < matrix1.array[0].length; iteration++) {
          multipliedMatrix[row][column] += matrix1.array[row][iteration] * matrix2.array[iteration][column];
        }
      }
    }
    var newMatrix = new WeightMatrix(2, 3);
    newMatrix.set(multipliedMatrix);
    return newMatrix;
  }
  static SigmoidM(matrix) {
    var simplifiedMatrix = [];
    for(let row = 0; row < matrix.array.length;row++) {
      simplifiedMatrix.push([]);
      for(let column = 0; column < matrix.array[0].length;column++) {
        simplifiedMatrix[simplifiedMatrix.length - 1].push(MMath.Sigmoid(matrix.array[row][column]));
      }
    }
    var newMatrix = new WeightMatrix(2, 3);
    newMatrix.set(simplifiedMatrix);
    return newMatrix;
  }
  static Sigmoid(z) {
    return 1/(1+Math.exp(z));
  }
}

class WeightMatrix {
  constructor(rows, columns) {
    this.array = [];
    for(let x = 0; x < rows; x++) {
      this.array.push([]);
      for(let y = 0; y < columns; y++) {
        this.array[this.array.length-1].push(this.Random());
      }
    }
  }
  Random() {
    return (Math.random() * 20)-10;
  }
  set(matrix) {
    this.array = matrix;
  }
}

class BiasVector {
  constructor(length) {
    this.array = [];
    for(let x = 0; x < length; x++) {
      this.array.push([]);
      this.array[this.array.length-1].push(this.Random());
    }
  }
  Random() {
    return (Math.random() * 20)-10;
  }
  set(matrix) {
    this.array = matrix;
  }
}

class InputVector {
  constructor(matrix) {
    this.array = matrix;
  }
  set(matrix) {
    this.array = matrix;
  }
}

class NeuralNetwork {
  constructor(network) {
    this.size = network;
    this.network = [];
    for(let i = 0; i < network.length-1;i++) {
      this.network.push({
        weights: new WeightMatrix(network[i+1], network[i]),
        biases: new BiasVector(network[i+1])
      });
    }
  }
  Output(...args) {
    if(args.length !== this.network[0].weights.array[0].length) {
      console.error("Incorrect amount of inputs.")
      return;
    }
    var input = [];
    for(let i = 0;i < args.length;i++) {
      input.push([]);
      input[input.length-1].push(args[i]);
    }
    input = new InputVector(input);
    var total = input;
    for(let i = 0;i < this.network.length;i++) {
      var output = MMath.Sigmoid(
        MMath.Add(
          MMath.Multiply(
            this.network[i].weights,
            total
          ),
          this.network[i].biases
        )
      );
      total = output;
    }
    return total.array;
  }
  Crossover(parent) {
    let child = new NeuralNetwork(parent.size);
    // change weights and biases
    for(let parameter = 0;parameter < this.network.length;parameter++) {
      let layer = child.network[parameter];
      // weights
      var rw = Math.random() * layer.weights.array.length * layer.weights.array[0].length;
      var windex = 0;
      for(let row = 0; row < layer.weights.array.length; row++) {
        for(let column = 0; column < layer.weights.array[0].length; column++) {
          // Mutation
          if(Math.random() * 100 <= mutationRate) {
            child.network[parameter].weights.array[row][column] = (Math.random()*20)-10;
            continue;
          }
          // Crossover
          if(rw > windex) {
            child.network[parameter].weights.array[row][column] = this.network[parameter].weights.array[row][column];
          }else {
            child.network[parameter].weights.array[row][column] = parent.network[parameter].weights.array[row][column];
          }
          windex++;
        }
      }
      // biases
      var rb = Math.random() * layer.biases.array.length * layer.biases.array[0].length;
      var bindex = 0;
      for(let row = 0; row < layer.biases.array.length; row++) {
        for(let column = 0; column < layer.biases.array[0].length; column++) {
          // Mutation
          if(Math.random() * 100 <= mutationRate) {
            child.network[parameter].biases.array[row][column] = (Math.random()*20)-10;
            continue;
          }
          // Crossover
          if(rb > bindex) {
            child.network[parameter].biases.array[row][column] = this.network[parameter].biases.array[row][column];
          }else {
            child.network[parameter].biases.array[row][column] = parent.network[parameter].biases.array[row][column];
          }
          bindex++;
        }
      }
    }
    return child;
  }
}
