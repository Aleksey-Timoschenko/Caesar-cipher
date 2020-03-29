First of all to start this app you nned to install Node js to ypur computer 
After first step you need to open caesar-cipher-cli in your terminal and write:
 node index.js -a encode -s {shift number} -i {input file path} -o {output file path}
 
 there 4 options:
 1.  **-s, --shift**: a shift
 2.  **-i, --input**: an input file
 3.  **-o, --output**: an output file
 4.  **-a, --action**: an action encode/decode
 
 shift and action are required options
 
 application will use stdin and/or stdout streams if there is no input or output option in your command 
 
To exit from app use Ctrl + C