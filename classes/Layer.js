class Layer {
  constructor(inputs, outputs) {
    this.weights = Matrix.Random(outputs, inputs, 2);
    this.biases = Matrix.Random(outputs, 1, 2);
    this.z = null;
    this.output = null;
    this.input = null;
  }
  feedForward(input) {
    this.input = input;
    this.z = Matrix.AddMatrices(
      Matrix.MultiplyMatrices(
        this.weights,
        this.input
      ),
      this.biases
    );

    this.output = Matrix.ApplyFunction(
      this.z,
      NeuralNetwork.Activation
    );

    return this.output;
  }
}