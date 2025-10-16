#include <stdio.h>
#include <stdint.h>

#define min(a, b) ((a) < (b) ? (a) : (b))
#define print_color(back, fore) printf(     \
    "\x1b[48;5;%d;38;5;%dm%3d\x1b[0m ",     \
    (back), (fore), (back)                  \
)

int main() {
    for (uint8_t color = 0; color < 16; color++) {
        print_color(color, (color < 7 || color == 8) ? 15 : 0);
    }
    
    printf("\n\n\n");
    
    for (uint8_t row = 0; row < 2; row++) {
        uint8_t z_min = row * 3;
        uint8_t z_max = z_min + 3;
        
        for (uint8_t y = 0; y < 6; y++) {
            for (uint8_t z = z_min; z < z_max; z++) {
                for (uint8_t x = 0; x < 6; x++) {
                    print_color(
                        x + 6*y + 36*z + 16,
                        y > 2 ? 0 : 15
                    );
                }
                
                printf(" ");
            }
            
            printf("\n");
        }
        
        printf("\n");
    }
    
    printf("\n");
    
    for (int i = 232; i < 244; i++) {
        print_color(i, 15);
    }
    
    printf("\n");
    
    for (int i = 244; i < 256; i++) {
        print_color(i, 0);
    }
    
    return 0;
}
