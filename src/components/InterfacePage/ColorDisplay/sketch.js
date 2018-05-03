// import Scribble from 'scribble-fork'

export default function sketch(p) {
    // let rotation = 0;
    // let scribble = new Scribble();
    p.setup = function () {
        p.createCanvas(640, 480);
    };


    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        if (props.rotation) {
            // rotation = props.rotation * Math.PI / 180;
        }
    };

    p.draw = function () {
        p.background(220, 200, 200);
        if (p.mouseIsPressed) {
            p.fill(0);
          } else {
            p.fill(255);
          }
          p.ellipse(p.mouseX, p.mouseY, 80, 80);
    };
};