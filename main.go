package main

import (
	"fmt"
)

// in the lexer.
type Tok struct {
	kind Kind
	// str and num are both present to implement Tok
	// as a monomorphic type for all tokens; will be zero
	// values often.
	str string
	num float64
}


func main() {
	fmt.Println("testing")

}
