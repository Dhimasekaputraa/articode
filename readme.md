# ArtiCode - Arithmetic Coding Encoder

ArtiCode is a web-based application designed to visualize the process of Arithmetic Coding, a lossless data compression algorithm that converts an entire message into a single decimal number within the range [0, 1].

This project aims to make it easier for students and developers to learn how the probability space is narrowed (zoomed in) at each character iteration.

## Key Features

* **Case-Insensitive Processing**: Uppercase and lowercase input are treated equally for frequency consistency.
* **Probability Table**: Automatically calculates frequencies, probabilities, and initial intervals (Low & High).
* **Step-by-Step Visualization**: Displays detailed sub-interval divisions for each character at each iteration step.

## Technologies Used

* **HTML5**: Page stucture.
* **CSS3**: Styling the page.
* **JavaScript**: The core logic of the Arithmetic Coding algorithm.

## Usage

1. Clone this repository:
    ```bash
    git clone [https://github.com/username/articode.git](https://github.com/username/articode.git)```
 or access it via the following link: https://dhimasekaputraa.github.io/articode/
2. Open the `index.html` file in your preferred browser.
3. Enter text in the input field.
4. Click the **Encode** button to see the calculation process and the final result.

## Contributions

Contributions are always open! If you have suggestions for improving the visualization or performance of the algorithm, please fork it and create a *pull request*.

---