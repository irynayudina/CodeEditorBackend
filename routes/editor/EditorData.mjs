const sampleCodes = {
    'c':`#include <stdio.h>
    int main() {
        printf("Hello, World!");
        return 0;
    }`,
    'cpp': `#include <iostream>
    using namespace std;
    int main(){
        cout<<"Hello World2"; 
        return 0;
    }`,
    'java':`public class Simple{
        public static void main(String args[]){  
            System.out.println("Hello Java");  
        }  
    } `,
    'cpp14': `#include <iostream>\n\nint main() {\n    std::cout << "Hello, world!";\n    return 0;\n}`,
    'cpp17': `#include <iostream>\n\nint main() {\n    std::cout << "Hello, world!";\n    return 0;\n}`,
    'php': `<?php\n\necho "Hello, world!";\n`,
    'perl': `print "Hello, world!\\n";`,
    'python2': `print "Hello, world!"`,
    'python3': `print("Hello, world!")`,
    'ruby': `puts "Hello, world!"`,
    'go': `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, world!")\n}`,
    'scala': `object HelloWorld {\n    def main(args: Array[String]) {\n        println("Hello, world!")\n    }\n}`,
    'bash': `echo "Hello, world!"`,
    'sql': `SELECT "Hello, world!";`,
    'pascal': `program HelloWorld;\n\nbegin\n    writeln(\'Hello, world!\');\nend.`,
    'csharp': 'using System;\n\nclass HelloWorld {\n    static void Main() {\n        Console.WriteLine("Hello, world!");\n    }\n}',
    'vbn': 'Module HelloWorld\n    Sub Main()\n        Console.WriteLine("Hello, world!")\n    End Sub\nEnd Module',
    'haskell': 'main = putStrLn "Hello, world!"',
    'objc': '#import <Foundation/Foundation.h>\n\nint main(int argc, const char * argv[]) {\n    @autoreleasepool {\n        NSLog(@"Hello, world!");\n    }\n    return 0;\n}',
    'swift': 'print("Hello, world!")',
    'groovy': 'println "Hello, world!"',
    'fortran': 'program hello\n\nprint *, "Hello, world!"\nend program hello',
    'lua': 'print("Hello, world!")',
    'tcl': 'puts "Hello, world!"',
    'rust': 'fn main() {\n    println!("Hello, world!");\n}',
    'd': 'import std.stdio;\n\nvoid main() {\n    writeln("Hello, world!");\n}',
    'ada': 'with Ada.Text_IO;\n\nprocedure Hello is\nbegin\n    Ada.Text_IO.Put_Line("Hello, world!");\nend;',
    'r': 'cat("Hello, world!\n")',
    'freebasic': 'print "Hello, world!"',
    'verilog': 'module hello_world;\n\ninitial\n    $display("Hello, world!");\nendmodule',
    'cobol': 'IDENTIFICATION DIVISION.\nPROGRAM-ID. HELLO-WORLD.\nPROCEDURE DIVISION.\n    DISPLAY "Hello, world!".\n    STOP RUN.',    
    'dart': "void main() { print('Hello, World!'); }",
    'clojure': "(println \"Hello, World!\")",
    'nodejs': "console.log('Hello, World!')",
    'scheme': "(display \"Hello, World!\")(newline)",
    'prolog': "write('Hello, World!')",
    'octave': "printf('Hello, World!\\n');",
    'cofeescript': "console.log 'Hello, World!'",
    'icon': "procedure main();\n  write(\"Hello, World!\");\nend",
    'fsharp': "printfn \"Hello, World!\"",
    'nasm': "section .data\ngreeting db 'Hello, World!',0\nsection .text\nglobal _start\n_start:\n  mov eax, 4\n  mov ebx, 1\n  mov ecx, greeting\n  mov edx, 13\n  int 0x80\n  mov eax, 1\n  xor ebx, ebx\n  int 0x80",
    'gccasm': ".section .data\n  greeting: .ascii \"Hello, World!\\n\"\n.section .text\n  .global main\n  main:\n    movl $4, %eax\n    movl $1, %ebx\n    movl $greeting, %ecx\n    movl $13, %edx\n    int $0x80\n    movl $1, %eax\n    xorl %ebx, %ebx\n    int $0x80",
    'intercal': "PLEASE SAY \"Hello, World!\"",
    'nemerle': "System.Console.WriteLine(\"Hello, World!\");",
    'ocaml': "print_endline \"Hello, World!\";",
    'unlambda': "`r```````````.H.e.l.l.o. .w.o.r.l.di",
    'picolisp': "(prinl \"Hello, World!\")",
    'spidermonkey': "print('Hello, World!');",
    'rhino': "print('Hello, World!');",
    'bc': "print \"Hello, World!\\n\"",
    'clisp': "(write-line \"Hello, World!\")",
    'elixir': "IO.puts(\"Hello, World!\")",
    'factor': "\"Hello, World!\" print",
    'falcon': "> \"Hello, World!\" .",
    'fantom': "class HelloWorld { static Void main() { echo(\"Hello, World!\"); } }",
    'nim': "echo \"Hello, World!\"",
    'pike': "int main() { write(\"Hello, World!\\n\"); return 0; }",
    'smalltalk': "Transcript show: 'Hello, World!'",
    'mozart': "functor\nimport\n  Application\n  define\n  {\n    define\n    {Browse(\"\")}\n    Application.start\n    {\n      System.showConsole\n      {System.println(\"Hello, World!\")}\n    }\n  }",
    'racket': "#lang racket\n(displayln \"Hello, World!\")",
    'kotlin': "fun main() {\n    println(\"Hello, World!\")\n}",
    'whitespace': "   \n  \n   \n    \n     \n      \n       \n        \n         \n          \n           \n            \n             \n              \n               \n                \n                 \n                  \n                   \n                    \n                     \n                      \n                       \n                        \n                         \n                          \n                           \n                            \n                             \n                              \n                               \n                                \n                                 \n                                  \n                                   \n                                    \n                                     \n                                      \n                                       \n                                        \n                                         \n                                          \n                                           \n                                            \n                                             \n                                              \n                                               \n                                                \n                                                 \n                                                  \n                                                   \n                                                    \n                                                     \n                                                      \n                                                       \n                                                        \n                                                         \n                                                          \n                                                           \n                                                            \n                                                             \n                                                              \n                                                               \n                                                                \n                                                                 \n                                                                  \n                                                                   \n                                                                    \n                                                                     \n                                                                      \n                                                                       \n                                                                        \n                                                                         \n                                                                          \n                                                                           \n                                                                            \n                                                                             \n                                                                              \n                                                                               \n                                                                                \n                                                                                 \n                                                                                  \n                                                                                   \n                                                                                    \n                                                                                     \n                                                                                      \n                                                                                       \n                                                                                        \n                                                                                         \n                                                                                          \n                                                                                           \n                                                                                            \n                                                                                             \n                                                                                              \n                                                                                               \n                                                                                                \n                                                                                                 \n                                                                                                  \n                                                                                                   \n                                                                                                    \n                                                                                                     \n                                                                                                      \n                                                                                                       \n                                                                                                        \n                                                                                                         \n                                                                                                          \n                                                                                                           \n                                                                                                            \n                                                                                                             \n                                                                                                              \n                                                                                                               \n                                                                                                                \n                                                                                                                 \n                                                                                                                  \n                                                                                                                   \n                                                                                                                    \n                                                                                                                     \n                                                                                                                      \n                                                                                                                       \n                                                                                                                        \n                                                                                                                         \n                                                                                                                          \n                                                                                                                           \n                                                                                                                            \n                                                                                                                             \n                                                                                                                              \n                                                                                                                               \n                                                                                                                                \n                                                                                                                                 \n",
    'erlang': "-module(hello_world).\n-export([hello_world/0]).\nhello_world() -> io:format(\"Hello, World!\\n\").",
    'jlang': "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
    'haxe': "class HelloWorld {\n    static function main() {\n        trace('Hello, World!');\n    }\n}",
    'fasm': "org 100h\n\nstart:\n    mov ah, 9\n    mov dx, hello\n    int 21h\n    ret\n\nhello db 'Hello, World!', 0dh, 0ah, '$'",
    'awk': "BEGIN {\n    print \"Hello, World!\"\n}",
    'algol': "BEGIN\n    writeln(\"Hello, World!\");\nEND.",
    'befunge': ">25*\"!dlroW ,olleH\":v\n                v:,_@\n                >  ^",
    'blockly': "console.log('Hello, World!');",
    'lolcode': "HAI\nCAN HAS STDIO?\nVISIBLE \"Hello, World!\"\nKTHXBYE",
    'forth': ": hello .( Hello, World!) cr ;\nhello",
    'yabasic': "PRINT \"Hello, World!\"",
    'hack': "<?hh\n    echo 'Hello, World!';",
    'brainfuck':`>++++++++[<+++++++++>-]<.>++++[<+++++++>-]<+.+++++++..+++.>>++++++[<+++++++>-]<+
    +.------------.>++++++[<+++++++++>-]<+.<.+++.------.--------.>>>++++[<++++++++>-
    ]<+.`,
    'c99':`#include <stdio.h>
    int main() {
       printf("Hello, World!");
       return 0;
    }`,
};
const languageVersions = {
    'cpp':[
        'GCC 5.3.0',
        'Zapcc 5.0.0',
        'GCC 7.2.0',
        'GCC 8.1.0',
        'GCC 9.1.0',
        'GCC 11.1.0'
    ],
    'cpp14': [
        'g++ 14 GCC 5.3.0',
        'g++ 14 GCC 7.2.0',
        'g++ 14 GCC 8.1.0',
        'g++ 14 GCC 9.1.0',
        'GCC 11.1.0',
    ],
    'cpp17': [
        'g++ 17 GCC 9.1.0',
        'GCC 11.1.0'
    ],
    'c': [
        'GCC 5.3.0',
        'Zapcc 5.0.0',
        'GCC 7.2.0',
        'GCC 8.1.0',
        'GCC 9.1.0',
        'GCC 11.1.0',
    ],
    'java': [
        'JDK 1.8.0_66',
        'JDK 9.0.1',
        'JDK 10.0.1',
        'JDK 11.0.4',
        'JDK 17.0.1'
    ],
    'php': [
        '5.6.16',
        '7.1.11',
        '7.2.5',
        '7.3.10',
        '8.0.13',
    ],
    'perl': [
        '5.22.0',
        '5.26.1',
        '5.26.2',
        '5.30.0',
        '5.34.0',
    ],
    'python2': [
        '2.7.11',
        '2.7.15',
        '2.7.16',
        '2.7.18',
    ],
    'python3': [
        '3.5.1',
        '3.6.3',
        '3.6.5',
        '3.7.4',
        '3.9.9',
    ],
    'ruby': [
        '2.2.4',
        '2.4.2p198',
        '2.5.1p57',
        '2.6.5',
        '3.0.2',
    ],
    'go': [
        '1.5.2',
        '1.9.2',
        '1.10.2',
        '1.13.1',
        '1.17.3',
    ],
    'scala': [
        '2.12.0',
        '2.12.4',
        '2.12.5',
        '2.13.0',
        '2.13.6',
    ],
    'bash': [
        '4.3.42',
        '4.4.12',
        '4.4.19',
        '5.0.011',
        '5.1.12',
    ],
    'sql': [
        'SQLite 3.9.2',
        'SQLite 3.21.0',
        'SQLite 3.23.1',
        'SQLite 3.29.0',
        '3.37.0',
    ],
    'pascal': [
        'fpc 3.0.0',
        'fpc-3.0.2',
        'fpc-3.0.4',
        'fpc-3.2.2',
    ],
    'csharp': [
        'mono 4.2.2',
        'mono 5.0.0',
        'mono 5.10.1',
        'mono 6.0.0',
        'mono-6.12.0',
    ],
    'vbn': [
        'mono 4.0.1',
        'mono 4.6',
        'mono 5.10.1',
        'mono 6.0.0',
        'mono 6.12.0',
    ],
    'haskell': [
        'ghc 7.10.3',
        'ghc 8.2.1',
        'ghc 8.2.2',
        'ghc 8.6.5',
        '9.0.1',
    ],
    'objc': [
        'GCC 5.3.0',
        'GCC 7.2.0',
        'GCC 8.1.0',
        'GCC 9.1.0',
        'GCC 11.1.0',
    ],
    'swift': [
        '2.2',
        '3.1.1',
        '4.1',
        '5.1',
        '5.5',
    ],
    'groovy': [
        '2.4.6 JVM: 1.7.0_99',
        '2.4.12 JVM: 9.0.1',
        '2.4.15 JVM: 10.0.1',
        '2.5.8 JVM: 11.0.4',
        '3.0.9 JVM: 17.0.1',
    ],
    'fortran': [
        'GNU 5.3.0',
        'GNU 7.2.0',
        'GNU 8.1.0',
        'GNU 9.1.0',
        'GNU 11.1.0',
    ],
    'lua': [
        '5.3.2',
        '5.3.4',
        '5.3.5',
        '5.4.3',
    ],
    'tcl': [
        '8.6',
        '8.6.7',
        '8.6.8',
        '8.6.9',
        '8.6.12',
    ],
    'rust': [
        '1.10.0',
        '1.21.0',
        '1.25.0',
        '1.38.0',
        '1.56.1',
    ],
    'd': [
        'DMD64 D Compiler v2.071.1',
        'DMD64 D Compiler v2.088',
        'DMD64 D Compiler v2.098',
    ],
    'ada': [
        'GNATMAKE 6.1.1',
        'GNATMAKE 7.2.0',
        'GNATMAKE 8.1.0',
        'GNATMAKE 9.1.0',
        'GNATMAKE 11.1.0',
    ],
    'r': [
        '3.3.1',
        '3.4.2',
        '3.5.0',
        '3.6.1',
        '4.1.2',
    ],
    'freebasic': [
        '1.05.0',
        '1.07.1',
        '1.08.1',
    ],
    'verilog': [
        '10.1',
        '10.2',
        '10.3',
        '11',
    ],
    'cobol': [
        'GNU COBOL 2.0.0',
        'GNU COBOL 2.2.0',
        'GNU COBOL 3.0',
        'GNU COBOL 3.1.2',
    ],
    'dart': [
        '1.18.0',
        '1.24.2',
        '1.24.3',
        '2.5.1',
        '2.14.4',
    ],
    'clojure': [
        '1.8.0',
        '1.9.0',
        '1.10.1',
        '1.10.3',
    ],
    'nodejs': [
        '6.3.1',
        '9.2.0',
        '10.1.0',
        '12.11.1',
        '17.1.0',
    ],
    'scheme': [
        'Gauche 0.9.4',
        'Gauche 0.9.5',
        'Gauche 0.9.8',
        'Gauche 0.9.10',
    ],
    'prolog': [
        'GNU Prolog 1.4.4',
        'GNU Prolog 1.4.5',
        'GNU Prolog 1.5.0',
    ],
    'octave': [
        'GNU 4.0.0',
        'GNU 4.2.1',
        'GNU 4.4.0',
        'GNU 5.1.0',
        'GNU 6.4.0',
    ],
    'cofeescript': [
        '1.11.1',
        '2.0.0',
        '2.3.0',
        '2.4.1',
        '2.6.1',
    ],
    'icon': [
        '9.4.3',
        '9.5.1',
    ],
    'fsharp': [
        '4.1',
        '4.5.0',
    ],
    'nasm': [
        '2.11.08',
        '2.13.01',
        '2.13.03',
        '2.14.02',
        '2.15.05',
    ],
    'gccasm': [
        'GCC 6.2.1',
        'GCC 8.1.0',
        'GCC 9.1.0',
        'GCC 11.1.0',
    ],
    'intercal': [
        '0.30',
    ],
    'nemerle': [
        '1.2.0.507',
    ],
    'ocaml': [
        '4.03.0',
        '4.08.1',
        '4.12.0',
    ],
    'unlambda': [
        '0.1.3',
        '0.1.4.2',
    ],
    'picolisp': [
        '3.1.11.1',
        '17.11.14',
        '18.5.11',
        '18.9.5',
        '21.6.30',
    ],
    'spidermonkey': [
        '38',
        '45.0.2',
    ],
    'rhino': [
        '1.7.7.1',
        '1.7.7.2',
        '1.7.13',
    ],
    'bc': [
        '1.06.95',
        '1.07.1',
    ],
    'clisp': [
        'GNU CLISP 2.49 - GNU C 5.2.0',
        'GNU CLISP 2.49 - GNU C 6.2.1',
        'GNU CLISP 2.49.93 - GNU 8.1.0',
        'GNU CLISP 2.49.93 - GNU 9.1.0',
        'ecl 21.2.1',
        'sbcl 2.1.9',
        'ccl 1.12.1',
        'abcl 1.8.0',
    ],
    'elixir': [
        '1.3.4',
        '1.5.2',
        '1.6.4',
        '1.9.1',
        '1.12.2',
    ],
    'factor': [
        '8.25',
        '8.28',
        '8.29',
        '8.31',
    ],
    'falcon': [
        '0.9.6.8 (Chimera)',
    ],
    'fantom': [
        '1.0.69',
    ],
    'nim': [
        '0.15.0',
        '0.17.2',
        '0.18.0',
        '1.4.8',
    ],
    'pike': [
        'v8.0',
        'v8.0.702',
    ],
    'smalltalk': [
        'GNU SmallTalk 3.2.92',
    ],
    'mozart': [
        '2.0.0 (OZ 3)',
    ],
    'racket': [
        '6.11',
        '6.12',
        '7.4',
        '8.3',
    ],
    'kotlin': [
        '1.1.51 (JRE 9.0.1+11)',
        '1.2.40 (JRE 10.0.1)',
        '1.3.50 (JRE 11.0.4)',
        '1.6.0 (JRE 17.0.1+12)',
    ],
    'whitespace': [
        '0.3'
    ],
    'erlang': [
        '22.1',
        '24'
    ],
    'jlang': [
        '9.01.10'
    ],
    'haxe': [
        '4.2.4'
    ],
    'fasm': [
        '1.73.27'
    ],
    'awk': [
        'NU Awk 5.1.1, API: 3.1'
    ],
    'algol': [
        'Genie 2.8.5'
    ],
    'befunge': [
        'cfunge 0.9.0'
    ],
    'blockly': [
        'Dart',
        'Lua',
        'PHP',
        'Python 3',
    ],
    'lolcode': [
        '0.10.5'
    ],
    'forth': [
        'gforth 0.7.3'
    ],
    'yabasic': [
        '2.769',
        '2.84.1'
    ],
    'hack': [
        'HipHop VM 3.13.0'
    ],
    'brainfuck': [
        'bfc-0.1'
    ],
    'c99': [
        'GCC 5.3.0',
        'GCC 7.2.0',
        'GCC 8.1.0',
        'GCC 9.1.0',
        'GCC 11.1.0',
    ],
}
const languages = {
    'cpp': "C++",
    'cpp14': "C++ 14",
    'cpp17': "C++ 17",
    'c': "C",
    'java': "Java",
    'php': "PHP",
    'perl': "Perl",
    'python2': "Python 2",
    'python3': "Python 3",
    'ruby': "Ruby",
    'go': "Go Lang",
    'scala': "Scala",
    'bash': "Bash Shell",
    'sql': "SQL",
    'pascal': "Pascal",
    'csharp': "C#",
    'vbn': "VB.Net",
    'haskell': "Haskell",
    'objc': "Objective C",
    'swift': "Swift",
    'groovy': "Groovy",
    'fortran': "Fortran",
    'lua': "Lua",
    'tcl': "TCL",
    'rust': "Rust",
    'd': "D",
    'ada': "Ada",
    'r': "R Language",
    'freebasic': "Free Basic",
    'verilog': "VERILOG",
    'cobol': "COBOL",


    'dart': "Dart",
    'clojure': "Clojure",
    'nodejs': "Node JS",
    'scheme': "Scheme",
    'prolog': "Prolog",
    'octave': "Octave",
    'cofeescript': "Cofee Script",
    'icon': "Icon",
    'fsharp': "F#",
    'nasm': "Assembler - NASM",
    'gccasm': "Assembler - GCC",
    'intercal': "Intercal",
    'nemerle': "Nemerle",
    'ocaml': "Ocaml",
    'unlambda': "Unlambda",
    'picolisp': "Picolisp",
    'spidermonkey': "SpiderMonkey",
    'rhino': "Rhino JS",
    'bc': "BC",
    'clisp': "CLISP",
    'elixir': "Elixir",
    'factor': "Factor",
    'falcon': "Falcon",
    'fantom': "Fantom",
    'nim': "Nim",
    'pike': "Pike",
    'smalltalk': "SmallTalk",
    'mozart': "OZ Mozart",
    'racket': "Racket",
    'kotlin': "Kotlin",

    'whitespace':'Whitespace',
    'erlang':'Erlang',
    'jlang':'J Language',
    'haxe':'Haxe',
    'fasm':'FASM',
    'awk':'AWK',
    'algol':'Algol 68',
    'befunge':'Befunge',
    'blockly':'Blockly',
    'lolcode':'LOLCODE',
    'forth':'Forth',
    'yabasic':'YaBasic',
    'hack': 'Hack',
    'brainfuck':'Brainf**k',
    'c99':'C-99',
}
// module.exports = { languages, sampleCodes, languageVersions }
// export default { languages, sampleCodes, languageVersions };
export { languages, sampleCodes, languageVersions };