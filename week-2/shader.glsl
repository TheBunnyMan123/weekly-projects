// Name: Poor Man's (gamma-corrected kinda) Blur
// Author: TheKillerBunny
// License: APACHE-2.0

#define PI 3.14159265359
#define TAU (PI*2.)

const int DIRECTIONS = 24;
const int STEPS = 6;

vec2 polarToCartesian(float theta, float radius) {
    return vec2(radius * cos(theta), radius * sin(theta));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 res = iResolution.xy;
    vec2 uv = fragCoord / res;
    
    vec3 tex = texture(iChannel0, uv).rgb;
    fragColor.r = pow(tex.r, 2.);
    fragColor.g = pow(tex.g, 2.);
    fragColor.b = pow(tex.b, 2.);
    fragColor.a = 1.;
    
    int total = 1;
    for (float theta = 0.; theta < TAU; theta += (TAU / float(DIRECTIONS))) {
        for (int stp = 1; stp <= STEPS; stp++) {
            vec2 _uv = (fragCoord + polarToCartesian(theta, float(stp))) / res;
            vec3 _tex = texture(iChannel0, _uv).rgb;
            
            fragColor.r += pow(_tex.r, 2.);
            fragColor.g += pow(_tex.g, 2.);
            fragColor.b += pow(_tex.b, 2.);
            
            total++;
        }
    }
    
    fragColor /= float(total);
    fragColor.x = pow(fragColor.x, 1./2.);
    fragColor.y = pow(fragColor.y, 1./2.);
    fragColor.z = pow(fragColor.z, 1./2.);
    fragColor.w = 1.;
}
