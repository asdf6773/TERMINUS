#ifdef GL_ES
precision highp float;
#endif
uniform vec3 diffuse;
varying vec3 vNormal;
uniform float opacity;
vec4 color;
void main() { gl_FragColor = vec4(1.0, 1.0, 1.0, 0.4); }
