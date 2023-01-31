class Variable {
  constructor(title, value="") {
    this.title = title;
    this.value = value;

    this.createComponent();
  }
  createComponent() {
    this.html = document.createElement('details');
    this.html.setAttribute("tabindex", '-1');

    let summary = document.createElement('summary');
    summary.appendChild(document.createTextNode(this.title));

    this.variable = document.createElement('p');
    this.variable.appendChild(document.createTextNode(this.value));

    this.html.append(summary);
    this.html.append(this.variable);

    Variable.Menu.appendChild(this.html);
  }
  update(value) {
    this.variable.innerHTML = value;
  }
  static Menu = document.querySelector('.menu');
}