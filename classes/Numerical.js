class Numerical {
  constructor(title, value=0) {
    this.title = title;
    this.value = value;

    this.createComponent();
  }
  createComponent() {
    this.html = document.createElement('details');
    this.html.setAttribute("tabindex", '-1');

    let summary = document.createElement('summary');
    summary.appendChild(document.createTextNode(this.title));

    this.number = document.createElement('input');
    this.number.setAttribute('type', 'number');
    this.number.setAttribute('value', this.value);

    this.html.append(summary);
    this.html.append(this.number);

    Numerical.Menu.appendChild(this.html);
  }
  static Menu = document.querySelector('.menu');
}