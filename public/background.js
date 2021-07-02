class Background {
  canvas = document.getElementById('background');
  ctx = this.canvas.getContext('2d')

  drawRect = (x, y, width, height, style) => {
    this.ctx.fillStyle = style;
    this.ctx.fillRect(x, y, width, height);
  }

  drawRandomCircles = (amount) => {
    for (let i = 0; i <= amount; i++) {
      const randomX = Math.floor((Math.random() * 600));
      const randomY = Math.floor((Math.random() * 600));
      const randomR = Math.floor((Math.random() * 3));

      this.ctx.fillStyle = `rgba(255, 255, 0, ${Math.random()})`;
      this.ctx.beginPath();
      this.ctx.arc(randomX, randomY, randomR, 0, 2 * Math.PI, false);
      this.ctx.fill();
    }
  }

  drawEllipse = (x, y, radiusX, radiusY, rotation, style) => {
    this.ctx.fillStyle = style;
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, radiusX, radiusY, rotation, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  drawLake = () => {
    this.drawEllipse(550, 550, 110, 175, Math.PI / 2, '#1560BD');
    this.drawEllipse(380, 580, 50, 90, 20, '#1560BD');
  }

  init = () => {
    this.drawRect(0, 0,600, 600, '#5cb55d');
    this.drawRandomCircles(250);
    this.drawLake();
  }
}

export default Background;
