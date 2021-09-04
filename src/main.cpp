#include <iostream>

using namespace std;

enum TokenKind {
    LPAREN ,
    RPAREN ,
    KEYWORD ,
    EQ ,
    LT ,
    GT ,
    ASSIGNMENT ,
    PLUS ,
    MINUS ,
    IDENTIFIER ,
    INTEGER ,

};

typedef struct {
    TokenKind kind;
    string value;
} Token;

class Lexer {
    private:
        string source;
        int curPos;
        char curChar;
        Token tokens;
    public:
        Lexer(string source) {
            this.source = source;
            this.curPos = -1;
            this.curChar = "";
            this.tokens = {};
            this.nextChar();
        }

        void nextChar() {
        }

        void getToken() {
        }

};


int main(int argc, char *argv[]) {


    return 0;
}
