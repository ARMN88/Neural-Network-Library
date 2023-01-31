class NeuralNetwork {
  constructor(...size) {
    this.size = size;
    this.layers = [];

    for (let i = 0; i < this.size.length - 1; i++) {
      this.layers[i] = new Layer(this.size[i], this.size[i + 1]);
    }
  }
  feedForward(input0) {
    let input = input0;

    for (let layer of this.layers) {
      input = layer.feedForward(input);
    }

    return input;
  }
  backProp(input, expected) {
    var output = this.feedForward(input);

    var dCostW00 = 2 * (output.elements[0][0] - expected.elements[0][0]);
    var dActW00 = NeuralNetwork.dActivation(this.layers[0].z.elements[0][0]);
    var inpW00 = this.layers[0].input.elements[0][0];
    this.layers[0].weights.elements[0][0] -= dCostW00 * dActW00 * inpW00 * NeuralNetwork.learnRate;

    var inpW10 = this.layers[0].input.elements[1][0];
    this.layers[0].weights.elements[0][1] -= dCostW00 * dActW00 * inpW10 * NeuralNetwork.learnRate;

    this.layers[0].biases.elements[0][0] -= dCostW00 * dActW00 * NeuralNetwork.learnRate;
  }

  avgError(func, spread = 100) {
    var error = 0;
    for (let i = 0; i < spread; i++) {
      var input = new Matrix([[RandomInt(-25, 25)], [RandomInt(-25, 25)]]);
      var output = this.feedForward(input).elements[0][0];

      var expected = new Matrix([[(func(input.elements[0][0]) < input.elements[1][0]) ? 1 : 0]]).elements[0][0];
      error += (expected - output) ** 2;
    }

    return error / spread;
  }

  static Activation(x) {
    return NeuralNetwork.Sigmoid(x);
  }
  static dActivation(x) {
    return NeuralNetwork.dSigmoid(x);
  }

  static Sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }
  static dSigmoid(x) {
    var activation = NeuralNetwork.Sigmoid(x);
    return activation * (1 - activation);
  }

  static ReLU(x) {
    return Math.max(0, x);
  }

  static LeakyReLU(x) {
    return Math.max(0.1 * x, x);
  }
  static dLeakyReLU(x) {
    if (x > 0) {
      return 1;
    }
    return 0.1;
  }

  static dCost(expected, output) {
    return 2 * (expected - output);
  }

  static learnRate = 0.01;
}