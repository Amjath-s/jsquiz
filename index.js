
fetchquestion();
let questions=[]
let score = 0;
let correct = 0;
let wrong = 0;
async function fetchquestion()
{
    try {
        const response = await fetch('question.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        questions = await response.json();
        console.log(questions);
        let currentIndex = 0;
        // let score = 0;
        quizquestionandanswer(currentIndex);
    } catch (error) {
        console.error("Could not load quiz data:", error);
    } 
}


function quizquestionandanswer(currentIndex)

{   if (currentIndex >= questions.length) {
    alert("Quiz completed! Your score is: " + score);
    document.getElementById("questions").innerText = "Quiz Finished!";// Display a message indicating the quiz is finished

    document.getElementById("optionsquestion").innerHTML = "";

    return;
}
    const questionsDisplay=document.getElementById('questions');
    questionsDisplay.innerText = questions[currentIndex].question;
    const optionBox = document.getElementById('optionsquestion');
    optionBox.innerHTML = " "; // Clear previous options

    questions[currentIndex].options.forEach((optionText, index) => {
        const optionLabel= document.createElement('label');
        optionLabel.className = 'option';
        optionLabel.innerText = optionText;
        optionBox.appendChild(optionLabel);
        const scoreDisplay = document.getElementById("quizScore");
        optionLabel.addEventListener('click', () => {
            const selectedOption = optionLabel.innerText;
            if (selectedOption === questions[currentIndex].answer) {
                console.log("Correct Answer!");
                score++;
                correct++;
                optionLabel.style.backgroundColor = "green"; 
                // Highlight correct answer
                correctScore = document.getElementById("correctScore");
                correctScore.innerText = "correct :"+correct;
                correctScore.style.color = "green";
            } else {
                alert("Wrong Answer! The correct answer is: " + questions[currentIndex].answer);
                optionLabel.style.backgroundColor = "red"; // Highlight wrong answer
                //Highlight correct answer
                const correctOption=optionBox.querySelectorAll('.option')
                correctOption.forEach((option) => {
                    if (option.innerText === questions[currentIndex].answer) {  
                        option.style.backgroundColor = "green"; // Highlight the correct answer
                    }
                }
                );
                score--;
                wrong++;
                const wrongScore = document.getElementById("wrongScore");
                wrongScore.innerText = "wrong :"+wrong; 
                wrongScore.style.color = "red";
            }
            scoreDisplay.innerText = score;
           
            setTimeout(() => {
                currentIndex++;
                quizquestionandanswer(currentIndex); 
            }, 1500); 
            // Move to the next question
        });
        
      
      
        
        
    });

}   

