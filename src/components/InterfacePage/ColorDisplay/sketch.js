import Scribble from 'scribble-fork'

export default function sketch (p) {
    let rotation = 0;
    let scribble = new Scribble();
    p.setup = function () {
      p.createCanvas(800, 200);
    };
  
    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
      if (props.rotation){
        rotation = props.rotation * Math.PI / 180;
      }
    };
  
    p.draw = function () {
      p.background(100);
      p.noStroke();
      p.push();
      p.rotateY(rotation);
      p.box(100);
      p.pop();
    };
  };