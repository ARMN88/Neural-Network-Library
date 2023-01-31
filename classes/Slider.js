class Slider {
  constructor(title, range) {
    this.title = title;
    this.range = range;

    this.createComponent();
  }
  createComponent() {
    this.html = document.createElement('details');
    this.html.setAttribute("tabindex", '-1');

    let summary = document.createElement('summary');
    summary.appendChild(document.createTextNode(this.title));

    let start = document.createElement('label');
    start.appendChild(document.createTextNode(this.range[0]));
    start.setAttribute('name', 'slider');
    let end = document.createElement('label');
    end.appendChild(document.createTextNode(this.range[2]));
    end.setAttribute('name', 'slider');

    this.slider = document.createElement('input');
    this.slider.setAttribute('type', 'range');
    this.slider.setAttribute('value', this.range[1]);
    this.slider.setAttribute('min', this.range[0]);
    this.slider.setAttribute('max', this.range[2]);
    if (this.range[3]) this.slider.setAttribute('step', this.range[3]);
    this.slider.setAttribute('id', 'slider');

    this.output = document.createElement('p');
    this.output.appendChild(document.createTextNode(this.range[1]));
    let scope = this;
    this.slider.oninput = function() {
      scope.output.innerHTML = this.value;
    }
    this.html.append(summary);
    this.html.append(start);
    this.html.append(this.slider);
    this.html.append(end);
    this.html.append(this.output);

    Slider.Menu.appendChild(this.html);
  }
  static Menu = document.querySelector('.menu');
}