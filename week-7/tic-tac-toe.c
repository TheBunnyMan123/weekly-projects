#include <stdio.h>
#include <stdbool.h>

typedef enum {
    CELL_NONE = 0,
    CELL_X = 1,
    CELL_O = 2
} Cell;

char char_from_cell(Cell cell, int position) {
    switch (cell) {
        case CELL_X:
            return 'X';
        case CELL_O:
            return 'O';
        case CELL_NONE:
        default:
            return '0' + position;
    }
}

void print_grid(Cell grid[3][3]) {
    printf(
        "\x1b[2J\x1b[H %c | %c | %c\n---+---+---\n %c | %c | %c\n---+---+---\n %c | %c | %c\n",
        char_from_cell(grid[0][0], 1),
        char_from_cell(grid[0][1], 2),
        char_from_cell(grid[0][2], 3),
        char_from_cell(grid[1][0], 4),
        char_from_cell(grid[1][1], 5),
        char_from_cell(grid[1][2], 6),
        char_from_cell(grid[2][0], 7),
        char_from_cell(grid[2][1], 8),
        char_from_cell(grid[2][2], 9)
    );
}

int main() {
    Cell grid[3][3];
    Cell winner;
    int turn = 0;
    
    bool running = true;
    while (running) {
        int choice;
        while (true) {
            print_grid(grid);
            printf("\nchoice (%c's turn): ", (turn == 0) ? 'X' : 'O');
            
            choice = getchar() - 49;
            if (choice >= 0
                && choice <= 8
                && grid[choice / 3][choice % 3] == CELL_NONE) {
                
                break;
            }
        }
        
        grid[choice / 3][choice % 3] = (Cell) ++turn;
        turn %= 2;
        
        for (int x = 0; x < 3; x++) {
            if (grid[x][0] == grid[x][1]
                && grid[x][1] == grid[x][2]
                && grid[x][1] != CELL_NONE) {
            
                winner = grid[x][0];
                running = false;
            }
        }
        
        
        for (int y = 0; y < 3; y++) {
            if (grid[0][y] == grid[1][y]
                && grid[1][y] == grid[2][y]
                && grid[1][y] != CELL_NONE) {
            
                winner = grid[0][y];
                running = false;
            }
        }
        
        if (grid[0][0] == grid[1][1]
            && grid[1][1] == grid[2][2]
            && grid[1][1] != CELL_NONE) {
            
            winner = grid[1][1];
            running = false;
        }
        
        if (grid[0][2] == grid[1][1]
            && grid[1][1] == grid[2][0]
            && grid[1][1] != CELL_NONE) {
            
            winner = grid[1][1];
            running = false;
        }
        
        bool won = true;
        for (int x = 0; x < 3; x++) {
            for (int y = 0; y < 3; y++) {
                if (grid[x][y] == CELL_NONE) {
                    won = false;
                }
            }
        }
        
        if (won) {
            break;
        }
    }
    
    print_grid(grid);
    printf("\n");
    switch (winner) {
        case CELL_X:
            printf("X");
            break;
        case CELL_O:
            printf("O");
            break;
        case CELL_NONE:
        default:
            printf("Tie! Nobody");
            break;
    }
    printf(" wins!\n");
    
    return 0;
}
