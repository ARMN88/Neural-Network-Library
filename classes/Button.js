class Button {
  constructor(title, value) {
    this.title = title;
    this.value = value;

    this.createComponent();
  }
  createComponent() {
    this.html = document.createElement('details');
    this.html.setAttribute("tabindex", '-1');

    let summary = document.createElement('summary');
    summary.appendChild(document.createTextNode(this.title));

    this.button = document.createElement('button');
    this.button.appendChild(document.createTextNode(this.value));

    this.html.append(summary);
    this.html.append(this.button);

    Button.Menu.appendChild(this.html);
  }
  static Menu = document.querySelector('.menu');
}