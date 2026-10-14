// Innovathon 2026 Icebreaker Quiz Bank (35 Questions)

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: "Tech Trivia",
    question: "Who is widely considered to be the first computer programmer?",
    options: ["Alan Turing", "Ada Lovelace", "Charles Babbage", "Grace Hopper"],
    answer: 1,
    explanation: "Ada Lovelace wrote the first algorithm intended for Charles Babbage's Analytical Engine."
  },
  {
    id: 2,
    category: "Coding",
    question: "In Python, what is the output of the expression `2 ** 3`?",
    options: ["6", "8", "9", "16"],
    answer: 1,
    explanation: "** is the exponentiation operator in Python. 2^3 = 8."
  },
  {
    id: 3,
    category: "Logic",
    question: "What is the next number in this sequence: 2, 6, 12, 20, 30, ___?",
    options: ["38", "40", "42", "44"],
    answer: 2,
    explanation: "The difference increases by 2 each time: +4, +6, +8, +10, +12 = 42."
  },
  {
    id: 4,
    category: "Algorithms",
    question: "What is the worst-case time complexity of finding a specific element in an unsorted array?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    answer: 2,
    explanation: "In an unsorted array, linear search takes O(n) worst-case."
  },
  {
    id: 5,
    category: "Coding",
    question: "Which Git command is used to check the state of the working directory and the staging area?",
    options: ["git commit", "git log", "git status", "git init"],
    answer: 2,
    explanation: "`git status` inspects changes and staged files."
  },
  {
    id: 6,
    category: "Tech Trivia",
    question: "What does \"API\" stand for in software development?",
    options: [
      "Application Programming Interface",
      "Advanced Process Integration",
      "Applied Programming Interface",
      "Automated Protocol Instruction"
    ],
    answer: 0,
    explanation: "API stands for Application Programming Interface."
  },
  {
    id: 7,
    category: "Logic",
    question: "A bat and a ball together cost ₹110. The bat costs ₹100 more than the ball. How much does the ball cost?",
    options: ["₹10", "₹5", "₹15", "₹1"],
    answer: 1,
    explanation: "Bat = ₹105, Ball = ₹5. 105 + 5 = 110."
  },
  {
    id: 8,
    category: "Algorithms",
    question: "Which data structure operates on a Last-In, First-Out (LIFO) principle?",
    options: ["Queue", "Linked List", "Tree", "Stack"],
    answer: 3,
    explanation: "Stack operates on Last-In, First-Out (LIFO)."
  },
  {
    id: 9,
    category: "Coding",
    question: "Which keyword is used in Java to prevent a class from being subclassed or inherited?",
    options: ["static", "private", "final", "protected"],
    answer: 2,
    explanation: "Declaring a class `final` in Java prevents inheritance."
  },
  {
    id: 10,
    category: "Tech Trivia",
    question: "What does \"CMF\" stand for in modern hardware design and smartphone sub-brands (like the Nothing CMF Phone)?",
    options: [
      "Code, Model, Framework",
      "Color, Material, Finish",
      "Central Mobile Frequency",
      "Core Module Fabrication"
    ],
    answer: 1,
    explanation: "CMF stands for Color, Material, Finish."
  },
  {
    id: 11,
    category: "Logic",
    question: "If all Bugs are Errors, and some Errors are Fatal, which of the following must be true?",
    options: [
      "All Bugs are Fatal",
      "Some Bugs are Fatal",
      "All Fatal things are Errors",
      "None of the above conclusions are strictly guaranteed"
    ],
    answer: 3,
    explanation: "None are guaranteed because the fatal errors might not overlap with bugs."
  },
  {
    id: 12,
    category: "Coding",
    question: "In C++, which operator is used for dynamic memory allocation?",
    options: ["malloc", "alloc", "new", "create"],
    answer: 2,
    explanation: "`new` operator dynamically allocates memory on the heap in C++."
  },
  {
    id: 13,
    category: "Algorithms",
    question: "Which of the following is a classic \"Divide and Conquer\" sorting algorithm?",
    options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"],
    answer: 2,
    explanation: "Merge Sort repeatedly divides the array into halves, sorts them, and merges them."
  },
  {
    id: 14,
    category: "Tech Trivia",
    question: "What is the primary purpose of a Docker container?",
    options: [
      "To compile code into machine language",
      "To package an application and its dependencies into a standardized unit",
      "To host hardware-level virtual machines",
      "To manage Git repositories"
    ],
    answer: 1,
    explanation: "Docker containers package an application and all its dependencies together."
  },
  {
    id: 15,
    category: "Logic",
    question: "Which of these terms does not belong with the others?",
    options: ["Byte", "Nibble", "Bit", "Pixel"],
    answer: 3,
    explanation: "Pixel is a picture element; Byte, Nibble, and Bit are units of data storage size."
  },
  {
    id: 16,
    category: "Coding",
    question: "Which programming language is primarily used for writing scripts in the Unity game engine?",
    options: ["C++", "Python", "C#", "JavaScript"],
    answer: 2,
    explanation: "C# is the official scripting language for Unity."
  },
  {
    id: 17,
    category: "Tech Trivia",
    question: "In blockchain architecture, what is the very first block in a network commonly called?",
    options: ["Alpha Block", "Genesis Block", "Root Node", "Base Ledger"],
    answer: 1,
    explanation: "Block 0 in a blockchain is known as the Genesis Block."
  },
  {
    id: 18,
    category: "Algorithms",
    question: "Dijkstra's Algorithm is primarily used to find what?",
    options: [
      "The shortest path in a weighted graph",
      "The maximum flow in a network",
      "The lowest common ancestor in a tree",
      "The optimal sorting sequence for a list"
    ],
    answer: 0,
    explanation: "Dijkstra's finds single-source shortest paths in weighted graphs with non-negative edge weights."
  },
  {
    id: 19,
    category: "Coding",
    question: "Which SQL command is used to remove a table entirely from a database?",
    options: ["DELETE TABLE", "REMOVE TABLE", "DROP TABLE", "TRUNCATE TABLE"],
    answer: 2,
    explanation: "DROP TABLE deletes the table definition and all its data."
  },
  {
    id: 20,
    category: "Logic",
    question: "In a marathon, if you overtake the person running in second place, what position are you now in?",
    options: ["First", "Second", "Third", "You cannot determine the position"],
    answer: 1,
    explanation: "You take their place, so you are in Second position."
  },
  {
    id: 21,
    category: "Tech Trivia",
    question: "The process of replacing the solder balls on the bottom of a microchip (like a memory IC) is known as what?",
    options: ["Reflowing", "Micro-welding", "Reballing", "Circuit tracing"],
    answer: 2,
    explanation: "Reballing is the process of stripping and replacing solder balls on BGA chip packages."
  },
  {
    id: 22,
    category: "Algorithms",
    question: "Which traversal method of a Binary Search Tree (BST) will process the nodes in ascending sorted order?",
    options: ["Pre-order traversal", "In-order traversal", "Post-order traversal", "Level-order traversal"],
    answer: 1,
    explanation: "In-order traversal (Left, Root, Right) of a BST outputs elements in ascending order."
  },
  {
    id: 23,
    category: "Coding",
    question: "What data type does the following Python syntax represent: `user_data = {\"name\": \"Alice\", \"score\": 95}`?",
    options: ["List", "Tuple", "Set", "Dictionary"],
    answer: 3,
    explanation: "Key-value pairs enclosed in curly braces define a Python dictionary."
  },
  {
    id: 24,
    category: "Tech Trivia",
    question: "What does \"URL\" stand for?",
    options: [
      "Universal Routing Link",
      "Uniform Resource Locator",
      "Unified Resource Link",
      "Universal Registry Locator"
    ],
    answer: 1,
    explanation: "URL stands for Uniform Resource Locator."
  },
  {
    id: 25,
    category: "Logic",
    question: "If you reverse the string \"HACKATHON\", what is the 4th letter from the left?",
    options: ["T", "H", "O", "A"],
    answer: 0,
    explanation: "HACKATHON reversed is N-O-H-T-A-K-C-A-H. The 4th character is 'T'."
  },
  {
    id: 26,
    category: "Coding",
    question: "In a Spring Boot backend application, which annotation is typically used to mark a class as an endpoint handler for web requests?",
    options: ["@WebController", "@RestController", "@ApiEndpoint", "@HttpHandler"],
    answer: 1,
    explanation: "`@RestController` combines `@Controller` and `@ResponseBody` in Spring Boot."
  },
  {
    id: 27,
    category: "Algorithms",
    question: "Which data structure is most optimal for implementing a Priority Queue?",
    options: ["Array", "Linked List", "Hash Table", "Heap"],
    answer: 3,
    explanation: "A Binary Heap allows O(log n) insertion and extraction of min/max."
  },
  {
    id: 28,
    category: "Tech Trivia",
    question: "What is the standard network port used for secure web traffic (HTTPS)?",
    options: ["80", "21", "443", "8080"],
    answer: 2,
    explanation: "Port 443 is default for HTTPS (HTTP is 80)."
  },
  {
    id: 29,
    category: "Logic",
    question: "8 Bytes is equal to how many Bits?",
    options: ["16", "32", "64", "128"],
    answer: 2,
    explanation: "1 Byte = 8 Bits. 8 * 8 = 64 Bits."
  },
  {
    id: 30,
    category: "Coding",
    question: "In a Master-Worker distributed system architecture, what is the primary role of the worker node?",
    options: [
      "To assign tasks and handle client requests",
      "To store the central database",
      "To execute the parallel tasks distributed to it",
      "To balance the load of incoming web traffic"
    ],
    answer: 2,
    explanation: "Worker nodes receive distributed computational tasks and execute them."
  },
  {
    id: 31,
    category: "Tech Trivia",
    question: "Apple transitioned away from Intel processors for their Mac lineup in 2020. What was the name of their first custom silicon chip?",
    options: ["M1", "A14", "X1", "Pro 1"],
    answer: 0,
    explanation: "The Apple M1 chip was announced in November 2020."
  },
  {
    id: 32,
    category: "Algorithms",
    question: "What is the best-case time complexity of the Bubble Sort algorithm?",
    options: ["O(1)", "O(n)", "O(n log n)", "O(n^2)"],
    answer: 1,
    explanation: "With a swapped flag, Bubble sort completes in O(n) when the array is already sorted."
  },
  {
    id: 33,
    category: "Coding",
    question: "What is the size of a standard `int` primitive variable in Java?",
    options: ["8 bits", "16 bits", "32 bits", "64 bits"],
    answer: 2,
    explanation: "In Java, an `int` is always a 32-bit signed two's complement integer."
  },
  {
    id: 34,
    category: "Logic",
    question: "You have a 3-gallon jug and a 5-gallon jug. What is the minimum number of steps required to measure exactly 4 gallons of water using only these two jugs?",
    options: ["4 steps", "6 steps", "8 steps", "It is impossible"],
    answer: 1,
    explanation: "6 steps: Fill 5 -> Pour to 3 (leaves 2 in 5-gal) -> Empty 3 -> Pour 2 into 3 -> Fill 5 -> Pour 1 into 3 (leaves 4 in 5-gal)."
  },
  {
    id: 35,
    category: "Tech Trivia",
    question: "What does \"GUI\" stand for in software environments?",
    options: [
      "General User Integration",
      "Graphical User Interface",
      "Guided User Interaction",
      "Graphical Utility Interface"
    ],
    answer: 1,
    explanation: "GUI stands for Graphical User Interface."
  }
];
