#ifdef GL_ES
precision highp float;
#endif
uniform float thickness;
attribute float lineMiter;
attribute vec2 lineNormal;
uniform vec2 mouse;

void main() {
  vec2 pointPos = position.xy + vec2(lineNormal * thickness / 2.0 * lineMiter);

  gl_PointSize = 2.0;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pointPos, 0.0, 1.0);
}
